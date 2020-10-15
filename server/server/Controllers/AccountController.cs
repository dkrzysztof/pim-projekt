using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpPost("login")]
        public Task<IActionResult> Login()
        {
            throw new NotImplementedException();
        }

        [HttpPost("register")]
        public Task<IActionResult> Register()
        {
            throw new NotImplementedException();
        }

        [HttpGet("logout")]
        public Task<IActionResult> Logout()
        {
            throw new NotImplementedException();
        }

        [HttpPut("update")]
        public Task<IActionResult> UpdateUser()
        {
            throw new NotImplementedException();
        }

        [HttpDelete("delete-account")]
        public Task<IActionResult> DeleteAccount()
        {
            throw new NotImplementedException();
        }

    }
}
