using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var response = await _noteService.GetUserNotes();

            return Ok(response);
        }

        [Authorize]
        [HttpGet("sorted")]
        public async Task<IActionResult> GetSortedNotes([FromRoute]int spanId)
        {
            return Ok();
        }

        [Authorize]
        [HttpGet("{noteId}")]
        public async Task<IActionResult> GetNote([FromRoute]int noteId)
        {
            NoteResponse response = await _noteService.GetNote(noteId);
            
            if (response == null) 
                return BadRequest();
            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] AddNewNoteRequest newNote)
        {
            var result = await _noteService.AddNewNote(newNote);

            if (!result) return BadRequest();
            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateNote([FromBody] UpdateNoteRequest request)
        {
            var response = await _noteService.UpdateNote(request);
            if (!response) return BadRequest();
            return Ok();
        }

        [Authorize]
        [HttpDelete("{noteId}")]
        public async Task<IActionResult> DeleteNote([FromRoute] int noteId)
        {
            var response = await _noteService.DeleteNote(noteId);
            if (!response) return BadRequest();
            return Ok();
        }

    }
}