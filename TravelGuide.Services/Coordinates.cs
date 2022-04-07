using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelGuide.Services
{
    public class Coordinates
    {
        public Coordinates(double south, double west, double east, double north)
        {
            South = south;
            West = west;
            East = east;
            North = north;
        }

        public double South { get; set; }

        public double West { get; set; }

        public double East { get; set; }

        public double North { get; set; }
    }
}
