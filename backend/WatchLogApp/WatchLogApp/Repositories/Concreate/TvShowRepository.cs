using Microsoft.EntityFrameworkCore;
using WatchLogApp.Data;
using WatchLogApp.Models;
using WatchLogApp.Repositories.Abstract;

namespace WatchLogApp.Repositories.Concreate
{
    public class TvShowRepository : ITvShowRepository
    {
        private readonly ApplicationDbContext _context;
        public TvShowRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TVShow>> GetAllAsync()
        {
            return await _context.TVShows
                 .Where(m => !m.IsDeleted)
                .ToListAsync();
        }

        public async Task<TVShow> GetByIdAsync(int id)
        {
            return await _context.TVShows
                .Where(m => !m.IsDeleted && m.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task AddAsync(TVShow tvShow)
        {
            await _context.TVShows.AddAsync(tvShow);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TVShow tvShow)
        {
            _context.TVShows.Update(tvShow);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(TVShow tvShow)
        {
            _context.TVShows.Remove(tvShow);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateWatchStatusAsync(int id, bool newWatchStatus)
        {
            var tvshow = await _context.TVShows
                .Where(m => !m.IsDeleted && m.Id == id)
                .FirstOrDefaultAsync();

            if (tvshow != null)
            {
                tvshow.WatchStatus = newWatchStatus;
                _context.Entry(tvshow).Property(m => m.WatchStatus).IsModified = true;
                await _context.SaveChangesAsync();
            }
        }

    }
}
