using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelGuide.Data.Models;

namespace TravelGuide.Services.DTOs
{
    public class LocationDTO
    {   

        public LocationDTO()
        {

        }

        public LocationDTO(Location location)
        {
            Id = location.Id;
            Name = location.Name;
            //PictureDTOs = location.Pictures.Select(x=>new PictureDTO(x));
            Description = location.Description;
            Tags = location.Tags;
            Lat = location.Lat;
            Lng = location.Lng;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public Tags Tags { get; set; }
        public string Description { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public DateTime DateCreated { get; set; }
        public IEnumerable<PictureDTO> PictureDTOs { get; set; } = new List<PictureDTO>();

        public void AssignLocationFields(Location location)
        {
            location.Name = Name;
            location.Tags = Tags;
            location.Description = Description;
            location.Lat = Lat;
            location.Lng = Lng;
            location.DateCreated = DateCreated;
            location.Id = Id;
        }

        public void AssignLocationDTOFields(Location location)
        {
            Id = location.Id;
            Name = location.Name;
            PictureDTOs = location.Pictures.Select(x => new PictureDTO(x));
            Description = location.Description;
            Tags = location.Tags;
            Lat = location.Lat;
            Lng = location.Lng;
        }


    }
}
