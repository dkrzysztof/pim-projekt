using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Database.Models;
using server.Dtos.Account.Requests;
using server.Dtos.Account.Responses;
using server.Security.Interfaces;
using server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace server.Services
{
    public class AccountService : BaseService<ApplicationUser>, IAccountService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtGenerator _jwtGenerator;

        public AccountService(IMapper mapper, DatabaseContext context, IUserAccessor userAccessor, IJwtGenerator jwtGenerator, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager) : base(mapper, context, userAccessor)
        {
            _jwtGenerator = jwtGenerator;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<bool> DeleteUser()
        {
            var userId = CurrentlyLoggedUser.Id;

            var user = await _context.ApplicationUsers.SingleOrDefaultAsync(u => u.Id == userId);

            if(user != null)
            {
                var refreshTokens = _context.RefreshTokens.Where(r => r.UserId == userId);
                _context.RefreshTokens.RemoveRange(refreshTokens);
                _context.ApplicationUsers.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<GetAccountDetailsResponse> GetAccountDetailsAsync()
        {
            var userId = CurrentlyLoggedUser.Id;

            try
            {
                var user = await _context.ApplicationUsers.SingleOrDefaultAsync(u => u.Id == userId);
                var response = _mapper.Map<ApplicationUser, GetAccountDetailsResponse>(user);
                return response;
            }
            catch(Exception)
            {
                return null;
            }
        }

        public async Task<LoginUserResponse> LoginAsync(LoginUserRequest request)
        {
            var user = await _context.ApplicationUsers.SingleOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
                return null;


            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!result.Succeeded)
                return null;

            var generatedToken = await _jwtGenerator.CreateTokenAsync(user);

            var responseDto = new LoginUserResponse()
            {
                Token = generatedToken.Token,
                RefreshToken = generatedToken.RefreshToken,
            };

            return responseDto;
        }

        //public Task<bool> Logout()
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<RefreshTokenResponse> RefreshTokenAsync(string accessToken, string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(accessToken))
            {
                return null;
            }

            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return null;
            }

            var validatedToken = _jwtGenerator.GetPrincipalFromToken(accessToken);

            if (validatedToken == null)
            {
                return null;
            }

            var storedRefreshToken =
                await _context.RefreshTokens.SingleOrDefaultAsync(x => x.Token == refreshToken);

            var validationResult = _jwtGenerator.ValidateRefreshToken(storedRefreshToken, validatedToken);

            if (validationResult.Any())
            {
                return null;
            }

            storedRefreshToken.Used = true;
            _context.RefreshTokens.Update(storedRefreshToken);

            await _context.SaveChangesAsync();

            var user = await UserManager.FindByIdAsync(_jwtGenerator.GetUserIdFromToken(validatedToken));

            if (user == null)
            {
                return null;
            }

            var tokens = await _jwtGenerator.CreateTokenAsync(user);

            return new RefreshTokenResponse { RefreshToken = tokens.RefreshToken, Token = tokens.Token };
        }

        public async Task<RegisterUserResponse> RegisterUserAsync(RegisterUserRequest request)
        {
            var userToRegister = new ApplicationUser()
            {
                LastName = request.LastName,
                FirstName = request.FirstName,
                Email = request.Email,
                UserName = request.Email
            };

            var emailTaken = await _userManager.FindByEmailAsync(request.Email) != null;

            var accountCreationResult = await _userManager.CreateAsync(userToRegister, request.Password);
            if (!accountCreationResult.Succeeded)
                return null;


            var token = await _jwtGenerator.CreateTokenAsync(userToRegister);
            var response = new RegisterUserResponse
            {
                Token = token.Token,
                RefreshToken = token.RefreshToken
            };


            return response;
        }

        public async Task<bool> UpdateUser(UpdateUserRequest request)
        {
            var userId = CurrentlyLoggedUser.Id;

            try
            {
                var user = await _context.ApplicationUsers.SingleOrDefaultAsync(u => u.Id == userId);

                user.FirstName = request.FirstName;
                user.LastName = request.LastName;

                 await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception)
            {
                return false;
            }

        }
    }
}
