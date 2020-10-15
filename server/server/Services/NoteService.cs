using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Database.Models;
using server.Dtos.Note.Response;
using server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class NoteService : BaseService<Note>, INoteService
    {
        public NoteService(IMapper mapper, DatabaseContext context) : base(mapper, context)
        {

        }

        public async Task<GetAllNotesResponse> GetUserNotes(int userId)
        {
            GetAllNotesResponse response = new GetAllNotesResponse();
            response.NotesResponses = new List<NoteForGetAllNotesResponse>();

            List<Note> myNotes = await _context.Set<Note>().Where(n => n.Owner.Id == userId).ToListAsync();
            response.NotesResponses = _mapper.Map<List<Note>, List<NoteForGetAllNotesResponse>>(myNotes);

            foreach(var note in response.NotesResponses)
            {
                int priorityId = myNotes.First(n => n.Id == note.Id).PriorityId;
                note.PriorityName = (await _context.Set<Priority>().FirstAsync(p => p.Id == priorityId)).Name;
            }

            return response;
        }
    }
}
