using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelGuide.Data.Models;
using TravelGuide.Services.DTOs;

namespace TravelGuide.Services.Interfaces
{
    public interface ILocationService
    {
        Task<IEnumerable<LocationDTO>> GetAll();

        Task<LocationDTO> GetDTOLocation(Location location);

        Task<LocationDTO> GetDTOLocation(int id);
        Location GetLocation(int id);

        Task<bool> DeleteLocation(int id);

        Task<LocationDTO> CreateLocation(LocationDTO locationDTO);

        Task<bool> UpdateLocation(LocationDTO locationDTO);
        Task<PictureDTO> UploadImage(PictureDTO pictureDTO);

        Task<IEnumerable<LocationDTO>> SearchUsingFilter(SearchFilter searchFilter);
    }
}
