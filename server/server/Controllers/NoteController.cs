using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public Task<IActionResult> GetNotes()
        {
            throw new NotImplementedException();
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
