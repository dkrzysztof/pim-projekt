using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Database.Models;
using server.Dtos.Account.Requests;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;

        public AccountController(IMapper mapper)
        {
            _mapper = mapper;
        }


        [HttpPost("login")]
        public Task<IActionResult> Login()
        {
            ApplicationUser tmp = new ApplicationUser
            {
                Id = 1,
                FirstName = "Imie",
                LastName = "Nazwisko",
                Email = "email"
            };
            var tmpMap = _mapper.Map<ApplicationUser, RegisterUserRequest>(tmp);
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
