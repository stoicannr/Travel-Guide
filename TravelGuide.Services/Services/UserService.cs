using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using TravelGuide.Data;
using TravelGuide.Data.Models;
using TravelGuide.Services.DTOs;
using TravelGuide.Services.Interface;

namespace TravelGuide.Services.Services
{

    public class UserService : IUserService
    {
        private TravelGuideContext _context;

        public UserService(TravelGuideContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<UserDTO>> GetAll()
        {
            var users = await _context.Users.ToListAsync();

            var usersDTO = users.Select(x => new UserDTO(x));

            return usersDTO;
        }
        public async Task<UserDTO> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            var userDTO = new UserDTO(user);
            return userDTO;
        }
            public User GetUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            return user;
        }
        public async Task<UserDTO> UpdateUser(UserDTO userDTO)
        {
            if (userDTO.Id != 0)
            {
                var user = GetUserById(userDTO.Id);
                userDTO.AssignFields(user);
                _context.Update(user);
                await _context.SaveChangesAsync();

            }
            return userDTO;
        }
      
        public async Task<bool> Delete(int id)
        {
            var userToDelete = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (userToDelete != null)
            {
                _context.Remove(userToDelete);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<UserDTO> AddUser(UserDTO userDTO)
        {

            var user = new User();
            userDTO.AssignFields(user);
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
            return new UserDTO(user);

        }
        public async Task<RegisterDTO> RegisterUser(RegisterDTO registerDTO)
        {
            var user = new User();
            registerDTO.AssignFields(user);
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
            return new RegisterDTO(user);
        }

        public User CreateUser(User user)
        {


            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }
        public UserDTO Login(LoginDto loginDto)
        {

            var user = _context.Users.FirstOrDefault(x => x.Email == loginDto.Email);

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                return null;
            }

            var userDTO = new UserDTO(user);

            return userDTO;


            
        }
        
        public UserDTO GetByEmail(string email)
        {
            var user =  _context.Users.FirstOrDefault(x => x.Email == email);
            var userToReturn = new UserDTO(user);
            return userToReturn;
            
        }


        public UserDTO GetById(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            var userToReturn = new UserDTO(user);
            return userToReturn;
        }

        
    }
}
