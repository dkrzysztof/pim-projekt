using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Account.Requests
{
    public class RegisterUserRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required]
        [MaxLength(255)]
        [EmailAddress]
        public string Email { get; set; }

        [MaxLength(255)]
        public string Password { get; set; }

        [Required]
        [MaxLength(255)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }
    }
}
