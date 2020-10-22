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
        private readonly IJwtGenerator _jwtGenerator;

        public AccountService(IMapper mapper, DatabaseContext context, IJwtGenerator jwtGenerator, SignInManager<ApplicationUser> signInManager) : base(mapper, context)
        {
            _jwtGenerator = jwtGenerator;
            _signInManager = signInManager;
        }

        public Task<bool> DeleteUser()
        {
            throw new NotImplementedException();
        }

        public async Task<LoginUserResponse> LoginAsync(LoginUserRequest request)
        {
            var user = await UserManager.FindByEmailAsync(request.Email);

            if (user == null)
                //throw new RestException(HttpStatusCode.Unauthorized);

            //if (user.IsDeleted)
            //{
            //    //ErrorResultToReturn = new ErrorResult(Errors.AuthErrors.YourAccountWasDeleted);
            //    //throw new RestException(HttpStatusCode.BadRequest, ErrorResultToReturn);
            //}

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!result.Succeeded)
                //throw new RestException(HttpStatusCode.Unauthorized);

            var generatedToken = await _jwtGenerator.CreateTokenAsync(user);

            var responseDto = new LoginUserResponse()
            {
                Token = generatedToken.Token,
                RefreshToken = generatedToken.RefreshToken,
            };

            return null;
        }

        public Task<bool> Logout()
        {
            throw new NotImplementedException();
        }

        public async Task<RefreshTokenResponse> RefreshTokenAsync(string accessToken, string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(accessToken))
            {
                //ErrorResultToReturn = new ErrorResult("Pusty access token");
                //throw new RestException(HttpStatusCode.BadRequest, ErrorResultToReturn);
            }

            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                //ErrorResultToReturn = new ErrorResult("Pusty refresh token");
                //throw new RestException(HttpStatusCode.BadRequest, ErrorResultToReturn);
            }

            var validatedToken = _jwtGenerator.GetPrincipalFromToken(accessToken);

            if (validatedToken == null)
            {
                //ErrorResultToReturn = new ErrorResult("Nieprawidłowy token");
                //throw new RestException(HttpStatusCode.BadRequest, ErrorResultToReturn);
            }

            var storedRefreshToken =
                await _context.RefreshTokens.SingleOrDefaultAsync(x => x.Token == refreshToken);

            var validationResult = _jwtGenerator.ValidateRefreshToken(storedRefreshToken, validatedToken);

            if (validationResult.Any())
            {
                //ErrorResultToReturn = new ErrorResult(Errors.AuthErrors.AnErrorOccuredWhileAuthenticating, validationResult.ToArray());
                //throw new RestException(HttpStatusCode.BadRequest, ErrorResultToReturn);
            }

            storedRefreshToken.Used = true;
            _context.RefreshTokens.Update(storedRefreshToken);

            await _context.SaveChangesAsync();
            //await SaveChangesAsync(new[] { "Wystąpił bład podczas aktualizowania tokena" });

            var user = await UserManager.FindByIdAsync(_jwtGenerator.GetUserIdFromToken(validatedToken));

            if (user == null)
            {
                //ErrorResultToReturn = new ErrorResult(Errors.AccountErrors.UserNotFound);
                //throw new RestException(HttpStatusCode.BadRequest, ErrorResultToReturn);
            }

            var tokens = await _jwtGenerator.CreateTokenAsync(user);

            return null;
            //return new ServiceResponse<RefreshTokenResponse>(HttpStatusCode.OK, new RefreshTokenResponse { RefreshToken = tokens.RefreshToken, Token = tokens.Token });
        }

        public async Task<RegisterUserResponse> RegisterUserAsync(RegisterUserRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateUser()
        {
            throw new NotImplementedException();
        }
    }
}
