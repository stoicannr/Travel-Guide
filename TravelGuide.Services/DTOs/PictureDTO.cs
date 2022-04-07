using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelGuide.Data.Models;

namespace TravelGuide.Services.DTOs
{
    public class PictureDTO
    {
          
        public PictureDTO()
        {

        }
        public PictureDTO(Picture picture)
        {
            Id = picture.Id;
            Name = picture.Name;
            Path = this.getNewPath(picture.Path);
        }
        public int Id { get; set; }
        public IFormFile FormFile { get; set; }
        public string Name { get; set; }
        public int LocationId { get; set; }
        public string Path { get; set; }

        public void AssignPictureFields(Picture picture)
        {
            picture.Id = Id;
            picture.LocationId = LocationId;
            picture.Name = Name;
            picture.Path = Path;
        }

        public string getNewPath(string path)
        {
            string travelGuideWeb = "TravelGuide.Web";
            int travelGuideIterator = 0;
            int endIndex = 0;

            for(int i=0;i<path.Length;i++)
            {
                if(path[i]==travelGuideWeb[travelGuideIterator])
                {
                    travelGuideIterator++;
                }
                else
                {
                    travelGuideIterator = 0;
                }
                if(travelGuideIterator==travelGuideWeb.Length)
                {
                    endIndex = i+1;
                    break;
                }
            
            }

            string newPath = "";

            for(int i=endIndex+1;i<path.Length;i++)
            {
                if (Char.IsLetter(path[i])||Char.IsDigit(path[i])||path[i]=='-'||path[i]=='.')
                {
                    newPath += path[i];
                }
                else
                {
                    newPath += "/"; 
                }
            }

            
            

            return newPath;

        }


    }
}
