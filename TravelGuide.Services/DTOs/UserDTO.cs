using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelGuide.Data.Models;

namespace TravelGuide.Services.DTOs
{
    public class UserDTO
    {
        public UserDTO()
        {

        }

        public UserDTO(User user)
        {
            Id = user.Id;
            Email = user.Email;
            FirstName = user.FirstName;
            LastName = user.LastName;
            UserType = user.UserType;
            

        }
        

        public void AssignFields(User user)
        {
            user.Id = Id;
            user.Email = Email;
            user.FirstName = FirstName;
            user.LastName = LastName;
            user.UserType = UserType;
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public UserType UserType { get; set; }
    }
    
}
