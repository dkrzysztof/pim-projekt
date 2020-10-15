using System;

namespace server.Database.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? NotificationDate { get; set; }
        public DateTime? EventDate { get; set; }
        public virtual ApplicationUser Owner { get; set; }
        public virtual Priority Priority { get; set; }
    }
}
