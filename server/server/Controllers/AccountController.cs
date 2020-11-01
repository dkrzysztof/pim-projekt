using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using server.Database.Models;
using server.Dtos.Account.Requests;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IConfiguration _configuration;

        public AccountController(IAccountService accountService, IConfiguration configuration)
        {
            _accountService = accountService;
            _configuration = configuration;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest dto)
        {
            var response = await _accountService.LoginAsync(dto);

            if (response != null)
                AssignTokenCookiesToResponse(response.Token, response.RefreshToken);

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequest dto)
        {
            var response = await _accountService.RegisterUserAsync(dto);
            return Ok(response);
        }

        [HttpGet("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            HttpContext.Request.Cookies.TryGetValue("refresh-token", out var refreshToken);
            HttpContext.Request.Cookies.TryGetValue("access-token", out var accessToken);

            var response = await _accountService.RefreshTokenAsync(accessToken, refreshToken);

            if (response != null)
                AssignTokenCookiesToResponse(response.Token, response.RefreshToken);

            return Ok(response);
        }

        //[HttpGet("logout")]
        //public Task<IActionResult> Logout()
        //{
        //    throw new NotImplementedException();
        //}
        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest dto) 
        {
            var response = await _accountService.UpdateUser(dto);
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount()
        {
            var response = await _accountService.DeleteUser();
            return Ok(response);
        }

        private void AssignTokenCookiesToResponse(string accessToken, string refreshToken)
        {
            var expiryOffset = DateTimeOffset.UtcNow.AddMinutes(_configuration.GetValue<int>("Jwt:RefreshTokenExpiry"));

            HttpContext.Response.Cookies.Append("access-token", accessToken, new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                Expires = expiryOffset
            });

            HttpContext.Response.Cookies.Append("refresh-token", refreshToken, new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                Expires = expiryOffset
            });
        }

    }
}
