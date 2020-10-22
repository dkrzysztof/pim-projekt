using server.Database.Models;
using server.Dtos.Account.Requests;
using server.Dtos.Account.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Interfaces
{
    public interface IAccountService : IBaseService<ApplicationUser>
    {
        Task<LoginUserResponse> LoginAsync(LoginUserRequest request);

        Task<RegisterUserResponse> RegisterUserAsync(RegisterUserRequest request);

        Task<RefreshTokenResponse> RefreshTokenAsync(string accessToken, string refreshToken);

        Task<bool> Logout();

        Task<bool> UpdateUser();

        Task<bool> DeleteUser( );
    }
}
