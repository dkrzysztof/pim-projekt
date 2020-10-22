using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Database.Models;
using server.Dtos.Note.Requests;
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

        public Task<bool> AddNewNote(AddNewNoteRequest newNote, int userId)
        {
            Note note = _mapper.Map<AddNewNoteRequest, Note>(newNote);
            ApplicationUser owner = _context.Set<ApplicationUser>().Where(u => u.Id == userId).FirstOrDefault();
            note.Owner = owner;

            _context.Set<Note>().Add(note);
            _context.SaveChanges();

            return Task.FromResult(true);
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

        public Task<bool> UpdateExistingNote(UpdateNoteRequest updatedNote)
        {
            Note noteToUpdate = _context.Set<Note>().Where(n => n.Id == updatedNote.Id).FirstOrDefault();
            if (noteToUpdate == null)
                return Task.FromResult(false);

            noteToUpdate.Title = updatedNote.Title;
            noteToUpdate.Content = updatedNote.Content;
            noteToUpdate.EventDate = updatedNote.EventDate;
            noteToUpdate.NotificationDate = updatedNote.NotificationDate;
            noteToUpdate.PriorityId = updatedNote.PriorityId;

            _context.SaveChanges();
            return Task.FromResult(true);
        }
    }
}
