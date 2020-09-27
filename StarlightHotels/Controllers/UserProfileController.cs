using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StarlightHotels.Models.ViewModels;
using StarlightHotels.Models;

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
        public async Task<ActionResult<AccountViewModel>> GetUserProfile()
        {
            Claim tokenClaim = User.Claims.First(c => c.Type == "UserID");
            if(tokenClaim == null)
            {
                return Unauthorized();
            }

            string userId = tokenClaim.Value;
            var user = await _userManager.FindByIdAsync(userId);
            var userM = new AccountViewModel()
            {
                FullName = user.FullName,
                Email = user.Email,
                UserName = user.UserName
            };

            return Ok(userM);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("ForAdmin")]
        public string GetForAdmin()
        {
            return "Web method for Admin";
        }

        [HttpGet]
        [Authorize(Roles = "Client")]
        [Route("ForCustomer")]
        public string GetForCustomer()
        {
            return "Web method for Client";
        }

        [HttpGet]
        [Authorize(Roles = "Admin, Client")]
        [Route("ForAdminOrCustomer")]
        public string GetForAdminOrCustomer()
        {
            return "Web method for Admin or Client";
        }
    }
}