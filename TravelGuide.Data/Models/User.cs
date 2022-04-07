using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TravelGuide.Data.Models
{
    
    public enum UserType
    {
        
        Admin = 1,
        User = 2,
    }
    
    
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MinLength(6)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(6)]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public UserType UserType
        {get;set;
            //get
            //{
            //    return UserType;
            //}
            //set
            //{
            //    if(!Enum.IsDefined(typeof(UserType),value))
            //    {
            //        throw new System.ArgumentException(
            //            string.Format("Invalid user type {0}.", value));
            //        UserType = value;
            //    }
            //}
        }
        [JsonIgnore]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        


    }
}
