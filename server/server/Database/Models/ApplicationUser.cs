using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace server.Database.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public virtual ICollection<Note> Notes { get; set; }
    }
}
