using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WatchLogApp.DTOs;
using WatchLogApp.Models;
using WatchLogApp.Repositories.Abstract;

namespace WatchLogApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        IMovieRepository _movieRepository;
        public MovieController(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var movies = await _movieRepository.GetAllAsync();
            return Ok(movies);
        }


        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromBody] MovieInsertDto movieDto)
        {
            try
            {
                if (movieDto == null)
                    return BadRequest();

                var movie = new Movie
                {
                    Title = movieDto.Title,
                    Genre = movieDto.Genre,
                    ImageBase64 = movieDto.ImageBase64,
                };

                _movieRepository.AddAsync(movie);
                return StatusCode(201, movieDto);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetMovieById([FromRoute(Name ="id")]int id)
        {
            var movie = await _movieRepository.GetByIdAsync(id);
            
            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateMovie([FromRoute(Name = "id")] int id, [FromBody] MovieInsertDto movieDto)
        {
            try
            {
                if (movieDto == null || id <= 0)
                    return BadRequest();

                var movieToUpdate = await _movieRepository.GetByIdAsync(id);

                if (movieToUpdate == null)
                {
                    return NotFound();
                }

                movieToUpdate.Title = movieDto.Title;
                movieToUpdate.Genre = movieDto.Genre;
                movieToUpdate.ImageBase64 = movieDto.ImageBase64;

                await _movieRepository.UpdateAsync(movieToUpdate);

                return Ok(movieToUpdate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMovie([FromRoute(Name = "id")] int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest();

                var movieToDelete = await _movieRepository.GetByIdAsync(id);

                if (movieToDelete == null)
                {
                    return NotFound();
                }

                await _movieRepository.DeleteAsync(movieToDelete);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id:int}/watchstatus")]
        public async Task<IActionResult> UpdateWatchStatus([FromRoute(Name = "id")] int id, [FromBody] bool newWatchStatus)
        {
            try
            {
                if (id <= 0)
                    return BadRequest();

                var movieToUpdate = await _movieRepository.GetByIdAsync(id);

                if (movieToUpdate == null)
                {
                    return NotFound();
                }

                // Sadece WatchStatus alanını güncelle
                await _movieRepository.UpdateWatchStatusAsync(id, newWatchStatus);

                return Ok(new { Id = id, WatchStatus = newWatchStatus });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}
