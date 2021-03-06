﻿using server.Database.Models;
using server.Dtos.Note.Requests;
using server.Dtos.Note.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Interfaces
{
    public interface INoteService : IBaseService<Note>
    {
        Task<GetAllNotesResponse> GetUserNotes();
        Task<NoteResponse> GetNote(int noteId);
        Task<bool> AddNewNote(AddNewNoteRequest newNote);
        Task<bool> UpdateNote(UpdateNoteRequest request);
        Task<bool> DeleteNote(int noteId);
    }
}
