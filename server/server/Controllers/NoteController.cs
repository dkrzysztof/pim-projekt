using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Database.Models;
using server.Dtos.Note.Requests;
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
        public async Task<IActionResult> CreateNote([FromBody] AddNewNoteRequest newNote)
        {
            int userId = 1;
            var result = await _noteService.AddNewNote(newNote, userId);

            if (!result) return BadRequest();
            return Ok();
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateNote([FromBody] UpdateNoteRequest updatedNote)
        {
            var result = await _noteService.UpdateExistingNote(updatedNote);

            if (!result) return NotFound();
            return Ok();
        }

        [HttpDelete("{noteId}")]
        public async Task<IActionResult> DeleteNote(int noteId)
        {
            var result = await _noteService.DeleteById(noteId);

            if (!result) return NotFound();
            return Ok();
        }
    }
}
