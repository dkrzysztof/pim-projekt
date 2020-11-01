using server.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace server.Security.Interfaces
{
    public interface IJwtGenerator
    {
        Task<JwtToken> CreateTokenAsync(ApplicationUser user);

        ClaimsPrincipal GetPrincipalFromToken(string token);

        string GetUserIdFromToken(ClaimsPrincipal validatedToken);

        public List<string> ValidateRefreshToken(RefreshToken refreshToken, ClaimsPrincipal validatedToken);
    }
}
