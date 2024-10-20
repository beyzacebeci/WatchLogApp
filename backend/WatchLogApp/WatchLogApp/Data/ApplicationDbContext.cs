using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using WatchLogApp.Models;

namespace WatchLogApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
           
         public DbSet<Movie> Movies { get; set; }
         public DbSet<TVShow> TVShows { get; set; }

    }

}

