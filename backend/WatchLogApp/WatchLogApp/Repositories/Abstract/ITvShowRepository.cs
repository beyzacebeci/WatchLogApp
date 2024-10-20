using WatchLogApp.Models;

namespace WatchLogApp.Repositories.Abstract
{
    public interface ITvShowRepository
    {
        Task<IEnumerable<TVShow>> GetAllAsync();
        Task<TVShow> GetByIdAsync(int id);
        Task AddAsync(TVShow tvShow);
        Task UpdateAsync(TVShow movie);
        Task UpdateWatchStatusAsync(int id, bool newWatchStatus);  // Sadece WatchStatus alanını güncelleyecek metot
        Task DeleteAsync(TVShow movie);
    }
}
