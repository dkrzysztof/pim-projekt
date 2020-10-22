using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Database.Models;

namespace server.Database
{
    public class DatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

    }
}
