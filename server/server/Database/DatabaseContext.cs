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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .HasKey(x => x.Id);

            ConfigureCompositeKeys(builder);
            ConfigureCascadeProperties(builder);
            ConfigureEnums(builder);
        }

        private static void ConfigureEnums(ModelBuilder builder)
        {
        }

        private static void ConfigureCompositeKeys(ModelBuilder builder)
        {
        }

        private static void ConfigureCascadeProperties(ModelBuilder builder)
        {
        }

    }
}
