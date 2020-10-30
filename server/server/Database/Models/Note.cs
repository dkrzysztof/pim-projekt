using System;
using System.ComponentModel.DataAnnotations;

namespace server.Database.Models
{
    public class Note
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Content { get; set; }
        public DateTime? NotificationDate { get; set; }
        public DateTime? EventDate { get; set; }

        [Required]
        public virtual ApplicationUser Owner { get; set; }

        [Required]
        public int PriorityId { get; set; }

        public virtual Priority Priority { get; set; }
    }
}
