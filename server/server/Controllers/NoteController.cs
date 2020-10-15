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
    public class NoteController : ControllerBase
    {
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
