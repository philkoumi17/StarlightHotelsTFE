using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StarlightHotels.API.Models;
using StarlightHotels.API.ViewModels;

namespace StarlightHotels.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;

        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // GET: /api/UserProfile
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<ApplicationUserModel>> GetUserProfile()
        {
            Claim tokenClaim = User.Claims.First(c => c.Type == "UserID");
            if(tokenClaim == null)
            {
                return Unauthorized();
            }

            string userId = tokenClaim.Value;
            var user = await _userManager.FindByIdAsync(userId);
            var userM = new ApplicationUserModel()
            {
                FullName = user.FullName,
                Email = user.Email,
                UserName = user.UserName
            };

            return Ok(userM);
        }
    }
}