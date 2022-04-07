using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelGuide.Data.Models;

namespace TravelGuide.Services.DTOs
{
    public class RegisterDTO
    {
        public void AssignFields(User user)
        {
            user.FirstName = FirstName;
            user.LastName = LastName;
            user.Email = Email;
            user.UserType = (UserType)2;
            user.Password = BCrypt.Net.BCrypt.HashPassword(Password);
        }
        public RegisterDTO()
        {

        }
        public RegisterDTO(User user)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Password = user.Password;
            UserType = (UserType)2;

        }

        [Required]
        [MinLength(5)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(5)]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [MinLength(5)]
        public string Password { get; set; }
        [Required]
        public UserType UserType { get; set; }
    }
}
