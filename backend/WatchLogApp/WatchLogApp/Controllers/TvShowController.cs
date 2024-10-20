using Microsoft.AspNetCore.Mvc;
using WatchLogApp.DTOs;
using WatchLogApp.Models;
using WatchLogApp.Repositories.Abstract;
using WatchLogApp.Repositories.Concreate;

namespace WatchLogApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TvShowController : ControllerBase
    {
        ITvShowRepository _tvShowRepository;
        public TvShowController(ITvShowRepository tvShowRepository)
        {
            _tvShowRepository = tvShowRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tvshows = await _tvShowRepository.GetAllAsync();
            return Ok(tvshows);
        }


        [HttpPost]
        public async Task<IActionResult> CreateTvShow([FromBody] TvShowInsertDto tvshowDto)
        {
            try
            {
                if (tvshowDto == null)
                    return BadRequest();

                var tvShow = new TVShow
                {
                    Title = tvshowDto.Title,
                    Genre = tvshowDto.Genre,
                    ImageBase64 = tvshowDto.ImageBase64,
                };

                _tvShowRepository.AddAsync(tvShow);
                return StatusCode(201, tvshowDto);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetTvShowById([FromRoute(Name = "id")] int id)
        {
            var tvshow = await _tvShowRepository.GetByIdAsync(id);

            if (tvshow == null)
            {
                return NotFound();
            }

            return Ok(tvshow);
        }


        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateTvShow([FromRoute(Name = "id")] int id, [FromBody] TvShowInsertDto tvShowDto)
        {
            try
            {
                if (tvShowDto == null || id <= 0)
                    return BadRequest();

                var tvShowToUpdate = await _tvShowRepository.GetByIdAsync(id);

                if (tvShowToUpdate == null)
                {
                    return NotFound();
                }

                tvShowToUpdate.Title = tvShowDto.Title;
                tvShowToUpdate.Genre = tvShowDto.Genre;
                tvShowToUpdate.ImageBase64 = tvShowDto.ImageBase64;

                await _tvShowRepository.UpdateAsync(tvShowToUpdate);

                return Ok(tvShowToUpdate);
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

                var tvShowToUpdate = await _tvShowRepository.GetByIdAsync(id);

                if (tvShowToUpdate == null)
                {
                    return NotFound();
                }

                // Sadece WatchStatus alanını güncelle
                await _tvShowRepository.UpdateWatchStatusAsync(id, newWatchStatus);

                return Ok(new { Id = id, WatchStatus = newWatchStatus });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteTvShow([FromRoute(Name = "id")] int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest();

                var tvShowToDelete = await _tvShowRepository.GetByIdAsync(id);

                if (tvShowToDelete == null)
                {
                    return NotFound();
                }

                await _tvShowRepository.DeleteAsync(tvShowToDelete);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
