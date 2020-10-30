using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Note.Requests
{
    public class UpdateNoteRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int PriorityId { get; set; }
        public DateTime? EventDate { get; set; }
        public DateTime? NotificationDate { get; set; }
    }
}
