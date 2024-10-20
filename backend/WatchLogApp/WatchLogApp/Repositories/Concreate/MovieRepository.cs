using Microsoft.EntityFrameworkCore;
using WatchLogApp.Data;
using WatchLogApp.Models;
using WatchLogApp.Repositories.Abstract;

namespace WatchLogApp.Repositories.Concreate
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDbContext _context;
        public MovieRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Movie>> GetAllAsync()
        {
            return await _context.Movies
                                 .Where(m => !m.IsDeleted) 
                                 .ToListAsync();
        }


        public async Task<Movie> GetByIdAsync(int id)
        {
            return await _context.Movies
                    .Where(m => !m.IsDeleted && m.Id == id)
                    .FirstOrDefaultAsync();
        }


        public async Task AddAsync(Movie movie)
        {
            await _context.Movies.AddAsync(movie);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Movie movie)
        {
            _context.Movies.Update(movie);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateWatchStatusAsync(int id, bool newWatchStatus)
        {
            var movie = await _context.Movies
                .Where(m => !m.IsDeleted && m.Id == id)
                .FirstOrDefaultAsync();

            if (movie != null)
            {
                movie.WatchStatus = newWatchStatus;
                _context.Entry(movie).Property(m => m.WatchStatus).IsModified = true;
                await _context.SaveChangesAsync();
            }
        }


        public async Task DeleteAsync(Movie movie)
        {
            movie.IsDeleted = true; 
            _context.Movies.Update(movie); 
            await _context.SaveChangesAsync(); 
        }

    }
}
