using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Database.Models;
using server.Dtos.Note.Requests;
using server.Dtos.Note.Response;
using server.Security.Interfaces;
using server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class NoteService : BaseService<Note>, INoteService
    {
        public NoteService(IMapper mapper, DatabaseContext context, IUserAccessor userAccessor) : base(mapper, context, userAccessor)
        {

        }

        public Task<bool> AddNewNote(AddNewNoteRequest newNote)
        {
            var userId = CurrentlyLoggedUser.Id;

            Note note = _mapper.Map<AddNewNoteRequest, Note>(newNote);
            ApplicationUser owner = _context.Set<ApplicationUser>().Where(u => u.Id == userId).FirstOrDefault();
            note.User = owner;

            _context.Set<Note>().Add(note);
            _context.SaveChanges();

            return Task.FromResult(true);
        }

        public async Task<bool> DeleteNote(int noteId)
        {
            var userId = CurrentlyLoggedUser.Id;

            try
            {
                var note = await _context.Set<Note>().Where(n => n.Id == noteId && n.UserId == userId).SingleOrDefaultAsync();

                _context.Set<Note>().Remove(note);
                await _context.SaveChangesAsync();

                return true;
            }
            catch(Exception)
            {
                return false;
            }

        }

        public async Task<NoteResponse> GetNote(int noteId)
        {
            var userId = CurrentlyLoggedUser.Id;

            Note note = _context.Set<Note>().Where(n => n.Id == noteId && n.User.Id == userId).FirstOrDefault();
            NoteResponse response = _mapper.Map<Note, NoteResponse>(note);

            return response;
        }

        private string ToWeekString(DateTime dateTime, DayOfWeek startOfWeek)
        {
            int diff = dateTime.DayOfWeek - startOfWeek;
            if (diff < 0) diff += 7;

            DateTime weekBegin = dateTime.AddDays(-1 * diff).Date;
            DateTime weekEnd = weekBegin.AddDays(6).Date;

            string weekString = $"{weekBegin.Day}.{weekBegin.Month} - {weekEnd.Day}.{weekEnd.Month}";
            return weekString;
        }

        private DateTime GetWeekEnd(DateTime dateTime, DayOfWeek startOfWeek)
        {
            int diff = dateTime.DayOfWeek - startOfWeek;
            if (diff < 0) diff += 7;

            DateTime weekBegin = dateTime.AddDays(-1 * diff).Date;
            return weekBegin.AddDays(6).Date;
        }

        public async Task<GetAllSortedNotesResponse> GetSortedNotes(int spanId)
        {
            var userId = CurrentlyLoggedUser.Id;

            GetAllSortedNotesResponse response = new GetAllSortedNotesResponse();
            response.SortedNotesResponses = new List<GetSortedNotesResponse>();

            GetAllNotesResponse notes = await GetUserNotes();
            notes.NotesResponses = notes.NotesResponses.OrderBy(n => n.EventDate).ToList();
            List<NoteResponse> noDue = notes.NotesResponses.Where(n => n.EventDate == null).ToList();
            List<IGrouping<string, NoteResponse>> myNotes = new List<IGrouping<string, NoteResponse>>();

            switch (spanId)
            {
                case 0:
                    myNotes = notes.NotesResponses.Where(n => n.EventDate != null)
                                                  .GroupBy(n => n.EventDate.Value.ToShortDateString())
                                                  .ToList();
                    break;
                case 1:
                    myNotes = notes.NotesResponses.Where(n => n.EventDate != null)
                                                  .GroupBy(n => ToWeekString(n.EventDate.Value, DayOfWeek.Monday))
                                                  .ToList();
                    break;
            }

            response.SortedNotesResponses.Add(new GetSortedNotesResponse()
            {
                Notes = _mapper.Map<List<NoteResponse>, List<PreviewNoteResponse>>(noDue),
                PeriodValue = "No Due",
                PeriodEnd = null
            });

            foreach(var noteSpan in myNotes)
            {
                GetSortedNotesResponse newNote = new GetSortedNotesResponse();
                newNote.PeriodValue = noteSpan.Key;
                newNote.Notes = new List<PreviewNoteResponse>();

                foreach(var singleNote in noteSpan)
                    newNote.Notes.Add(_mapper.Map<NoteResponse, PreviewNoteResponse>(singleNote));

                newNote.PeriodEnd = spanId == 0 ?
                                    noteSpan.ElementAt(0).EventDate :
                                    GetWeekEnd(noteSpan.ElementAt(0).EventDate.Value, DayOfWeek.Monday);
                response.SortedNotesResponses.Add(newNote);
            }

            return response;
        }

        public async Task<GetAllNotesResponse> GetUserNotes()
        {
            var userId = CurrentlyLoggedUser.Id;

            GetAllNotesResponse response = new GetAllNotesResponse();
            response.NotesResponses = new List<NoteResponse>();

            List<Note> myNotes = await _context.Set<Note>().Where(n => n.User.Id == userId).ToListAsync();
            response.NotesResponses = _mapper.Map<List<Note>, List<NoteResponse>>(myNotes);

            foreach(var note in response.NotesResponses)
            {
                int priorityId = myNotes.First(n => n.Id == note.Id).PriorityId;
                note.PriorityName = (await _context.Set<Priority>().FirstAsync(p => p.Id == priorityId)).Name;
            }

            return response;
        }

        public async Task<bool> UpdateNote(UpdateNoteRequest request)
        {
            var userId = CurrentlyLoggedUser.Id;

            try
            {
                var note = await _context.Set<Note>().Where(n => n.Id == request.NoteId && n.UserId == userId).SingleOrDefaultAsync();

                note.Title = request.Title;
                note.Content = request.Content;
                note.PriorityId = request.PriorityId;
                note.EventDate = request.EventDate;
                note.NotificationDate = request.NotificationDate;

                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }

        }
    }
}
