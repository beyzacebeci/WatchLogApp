using WatchLogApp.Models;

namespace WatchLogApp.Repositories.Abstract
{
    public interface IMovieRepository
    {
        Task<IEnumerable<Movie>> GetAllAsync();
        Task<Movie> GetByIdAsync(int id);
        Task AddAsync(Movie moviie);
        Task UpdateAsync(Movie movie);
        Task UpdateWatchStatusAsync(int id, bool newWatchStatus);  // Sadece WatchStatus alanını güncelleyecek metot
        Task DeleteAsync(Movie movie);
    }
}
