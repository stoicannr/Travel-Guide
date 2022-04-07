using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelGuide.Data.Models
{
    public class UserLocation
    {
        public Guid Id { get; set; }
        public virtual User User { get; set; }
        public virtual Location Location { get; set; }

    }
}
