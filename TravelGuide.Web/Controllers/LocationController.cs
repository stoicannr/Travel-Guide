using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TravelGuide.Data.Models;
using TravelGuide.Services;
using TravelGuide.Services.DTOs;
using TravelGuide.Services.Interfaces;

namespace TravelGuide.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {

        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<LocationDTO>> GetAll()
        {
            return await _locationService.GetAll();
        }

        [HttpGet("Get/{id:int}")]
        public async Task<LocationDTO> Get(int id)
        {
            return await _locationService.GetDTOLocation(id);
        }

        [HttpPost("GetBoundedLocation")]
        public async Task<IEnumerable<LocationDTO>> GetBoundedLocation([FromBody] Coordinates bounds)
        {
            SearchFilter searchFilter = new SearchFilter();
            searchFilter.Coordinates = bounds;
            return await _locationService.SearchUsingFilter(searchFilter);
        }

        [HttpDelete("Delete/{id:int}")]
        public async Task<bool> Delete(int id)
        {
            return await _locationService.DeleteLocation(id);
        }

        [HttpPost("CreateLocation")]
        public async Task<LocationDTO> CreateLocation(LocationDTO locationDTO)
        {
            return await _locationService.CreateLocation(locationDTO);
        }

        [HttpPost("UploadImage")]
        public async Task<PictureDTO> UploadImage([FromForm] PictureDTO pictureDTO)
        {
            return await _locationService.UploadImage(pictureDTO);
        }

        [HttpPost("Update")]
        public async Task<bool> Update(LocationDTO locationDTO)
        {
            if (locationDTO.Id != 0)
            {
                try
                {
                    await _locationService.UpdateLocation(locationDTO);
                    return true;
                }
                catch (ArgumentNullException e)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }


    }
}
