using System;
using System.Collections.Generic;

namespace server.Dtos.Note.Response
{
    public class GetAllNotesResponse
    {
        public ICollection<NoteResponse> NotesResponses { get; set; }
    }
}
