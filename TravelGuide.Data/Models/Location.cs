using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelGuide.Data.Models
{
    [Flags]
    public enum Tags
    {
        None =0,
        Hike =1,
        Historical = 2,
        View = 4,
        Experience = 8,
        Food = 16,
    }
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Tags Tags { get; set; }
        public string Description { get; set; }
        public virtual IEnumerable<Picture> Pictures { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
