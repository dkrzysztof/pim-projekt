using System;
using System.Collections.Generic;

namespace server.Dtos.Note.Response
{
    public class GetAllNotesResponse
    {
        public ICollection<NoteForGetAllNotesResponse> NotesResponses { get; set; }
    }

    public class NoteForGetAllNotesResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? NotificationDate { get; set; }
        public DateTime? EventDate { get; set; }
        public string PriorityName { get; set; }
        public int PriorityId { get; set; }
    }
}
