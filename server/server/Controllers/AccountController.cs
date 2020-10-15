﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }


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