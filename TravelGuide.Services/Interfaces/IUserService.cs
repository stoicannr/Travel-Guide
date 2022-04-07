using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using TravelGuide.Data.Models;
using TravelGuide.Services.DTOs;

namespace TravelGuide.Services.Interface
{
    public interface IUserService
    {
        Task<IEnumerable<UserDTO>> GetAll();
        Task<UserDTO> AddUser(UserDTO userDTO);

        Task<RegisterDTO> RegisterUser(RegisterDTO registerDTO);
        //User CreateUser(User user);
        //Task<UserDTO> GetByEmail(string email);
        UserDTO GetByEmail(string email);
        UserDTO Login(LoginDto loginDto);
        UserDTO GetById(int id);
        Task<UserDTO> GetUser(int id);
        Task<UserDTO> UpdateUser(UserDTO userDto);
        Task<bool> Delete(int id);

        

        
    }
}
