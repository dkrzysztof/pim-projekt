using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Account.Responses
{
    public class LoginUserResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
