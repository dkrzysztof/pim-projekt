using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Note.Response;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {

        private readonly INoteService _noteService;

        public NoteController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            int userId = 1;
            var response = await _noteService.GetUserNotes(userId);

            return Ok(response);
        }

        [HttpPost("create")]
        public Task<IActionResult> CreateNote()
        {
            throw new NotImplementedException();
        }

        [HttpPut("update")]
        public Task<IActionResult> UpdateNote()
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{noteId}")]
        public Task<IActionResult> DeleteNote()
        {
            throw new NotImplementedException();
        }

    }
}
