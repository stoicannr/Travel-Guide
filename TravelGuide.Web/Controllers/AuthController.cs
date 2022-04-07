using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelGuide.Data.Models;
using TravelGuide.Services.DTOs;
using TravelGuide.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace TravelGuide.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserService _userService;


        public AuthController(IUserService userService)
        {
            this._userService = userService;
        }
        [HttpPost("register")]
        public async Task<RegisterDTO> Register(RegisterDTO registerDTO)
        {
            if (ModelState.IsValid)
            {
                return await _userService.RegisterUser(registerDTO);

            }
            else return null;



        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginDto dto)
        {
            var user = _userService.Login(dto);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }
           

            var claims = new List<Claim>
            {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim("FullName", $"{user.FirstName} {user.LastName}"),
                    new Claim("userType", user.UserType.ToString()),
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);
            if(ModelState.IsValid)
            {
                await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                     new ClaimsPrincipal(claimsIdentity));

                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
            
            
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            var claim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
            if (claim?.Value == null)
            {
                return Unauthorized();
            }
            UserDTO userToReturn = _userService.GetByEmail(claim.Value);

            return Ok(userToReturn);

        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

    }
}
