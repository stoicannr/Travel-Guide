using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelGuide.Data;
using TravelGuide.Data.Models;
using TravelGuide.Services.DTOs;
using TravelGuide.Services.Interfaces;

namespace TravelGuide.Services.Services
{
    public class LocationService : ILocationService
    {
        private readonly TravelGuideContext _travelGuideContext;
        public LocationService(TravelGuideContext travelGuideContext)
        {
            _travelGuideContext = travelGuideContext;
        }


        public async Task<LocationDTO> CreateLocation(LocationDTO locationDTO)
        {
            Location location = new Location();
            locationDTO.AssignLocationFields(location);
            {
                 _travelGuideContext.Add(location);
                 _travelGuideContext.SaveChanges();
            }
            LocationDTO returnedLocation = new LocationDTO(location);
            return returnedLocation;

        }


        public async Task<bool> DeleteLocation(int id)
        {
            Location location;
            try
            {
                location = await _travelGuideContext.Locations.FirstOrDefaultAsync
                             (x => x.Id == id);
            }
            catch (NullReferenceException e)
            {
                Console.WriteLine(e.Message);
                return false;
            }

            if (location != null)
            {
                _travelGuideContext.Remove(location);
                _travelGuideContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IEnumerable<LocationDTO>> GetAll()
        {
            var locations = await _travelGuideContext.Locations.ToListAsync();
            var dtoLocations = locations.Select(x => new LocationDTO(x));
            return dtoLocations;
        }

        public async Task<PictureDTO> UploadImage(PictureDTO pictureDTO)
        {
            var picture = new Picture();

            var guid = Guid.NewGuid();

            var path = Path.Combine(Directory.GetCurrentDirectory(), "Images", guid.ToString()+".jpg");
            var stream = new FileStream(path, FileMode.Create);
            pictureDTO.FormFile.CopyTo(stream);
            
            pictureDTO.AssignPictureFields(picture);
            picture.Path = path;
            picture.Id=pictureDTO.Id;
             _travelGuideContext.Pictures.Add(picture);
             _travelGuideContext.SaveChanges();


            var pictureLocationId = pictureDTO.LocationId;
            Location pictureLocation = await _travelGuideContext.Locations
                                .FirstOrDefaultAsync(x => x.Id == pictureLocationId);
            pictureLocation.Pictures.ToList().Add(picture);

            PictureDTO pictureDTOToReturn = new PictureDTO();
            pictureDTOToReturn.Name = pictureDTO.Name;
            pictureDTOToReturn.LocationId = pictureLocationId;
            pictureDTOToReturn.Path = "Images/" + guid.ToString() + ".jpg";

            return(pictureDTOToReturn);
        }


        public async Task<LocationDTO> GetDTOLocation(Location location)
        {
            var locationToFind = await _travelGuideContext.Locations
                            .FirstOrDefaultAsync(x => x.Id == location.Id);
            var dtoLocation = new LocationDTO(locationToFind);
            return dtoLocation;
        }

        public async Task<LocationDTO> GetDTOLocation(int id)
        {
            var location = await _travelGuideContext.Locations
                                .FirstOrDefaultAsync(x => x.Id == id);

            var dtoLocation = new LocationDTO(location);
            return dtoLocation;
        }

        public Location GetLocation(int id)
        {
            var locationToFind = _travelGuideContext.Locations
                                .FirstOrDefault(x => x.Id == id);

            return locationToFind;
        }

        public async Task<bool> UpdateLocation(LocationDTO locationDTO)
        {
            if (locationDTO.Id != 0)
            {
                var location = this.GetLocation(locationDTO.Id);
                locationDTO.AssignLocationFields(location);
                _travelGuideContext.Update(location);
                await _travelGuideContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<PictureDTO> GetDTOPicture(Picture picture)
        {
            var pictureToFind = await _travelGuideContext.Pictures
                                    .FirstOrDefaultAsync(x => x.Id == picture.Id);
            var pictureDto = new PictureDTO(picture);
            return pictureDto;
        }

        public async Task<IEnumerable<LocationDTO>> SearchUsingFilter(SearchFilter searchFilter)
        {
            var locations = _travelGuideContext.Locations.AsQueryable();
            List<LocationDTO> locationDTOs = new List<LocationDTO>();

            if (searchFilter.Name!=null)
            {
                locations = locations.Where(l => l.Name.Contains(searchFilter.Name));
            }

            if(searchFilter.Coordinates!=null)
            {
                double south = searchFilter.Coordinates.South;
                double north = searchFilter.Coordinates.North;
                double east = searchFilter.Coordinates.East;
                double west = searchFilter.Coordinates.West;

                locations = locations.Where(l => (l.Lat < north && l.Lat > south && l.Lng < east && l.Lng > west));
            }

            if (locations.Count() > 0)
            {
                foreach (var location in locations)
                {
                    LocationDTO locationDTO = new LocationDTO();
                    locationDTO.AssignLocationDTOFields(location);
                    locationDTOs.Add(locationDTO);
                }
            }
            return (IEnumerable<LocationDTO>)locationDTOs;
        }


    }
}
