    using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using TravelGuide.Services.DTOs;
using TravelGuide.Services.Interface;
using Microsoft.AspNetCore.Authorization;

namespace TravelGuide.Web.Controllers
{
    [ApiController]
    [Authorize(Policy ="AdminOnly")]
    [Route("api/[controller]")]

    
    public class UserController : Controller
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetUsers")]
        public async Task<IEnumerable<UserDTO>> GetUsers()
        {
            return await _userService.GetAll();

        }

        [HttpGet("GetUser/{id:int}")]
        public async Task<UserDTO> GetUser(int id)
        {
            return await _userService.GetUser(id);
        }

        [HttpPost("AddUser")]
        public async Task<UserDTO> AddUser(UserDTO userDTO)
        {
            if(ModelState.IsValid)
            {
                return await _userService.AddUser(userDTO);

            }

            return null;

        }

        [HttpPost("UpdateUser")]
        public async Task<UserDTO> UpdateUser(UserDTO userDTO)
        {
            return await _userService.UpdateUser(userDTO);
        }

        
        [HttpDelete("Delete/{id:int}")]
        public async Task<bool> Delete(int id)
        {

            return await _userService.Delete(id);


        }
    }
}
