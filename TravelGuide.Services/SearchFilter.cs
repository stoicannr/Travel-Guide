using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelGuide.Data.Models;

namespace TravelGuide.Services
{
    public class SearchFilter
    {

        public string Name { get; set; }

        public Tags Tags { get; set; }

        public Coordinates Coordinates { get; set; }
    }
}
