using System;

namespace server.Dtos.Note.Response
{
    public class NoteResponse
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
