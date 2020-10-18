using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StarlightHotels.Core.Entities;
using StarlightHotels.Core.ViewModels;

namespace StarlightHotels.API.Controllers
{
    public class UserProfileController : BaseApiController
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
            var role = await _userManager.GetRolesAsync(user);

            var userM = new AccountViewModel()
            {
                Id = user.Id,
                Nom = user.Nom,
                Prenom = user.Prenom,
                DateNaissance = user.DateNaissance,
                Sexe = user.Sexe,
                NumeroRue = user.NumeroRue ?? string.Empty,
                Rue = user.Rue ?? string.Empty,
                CodePostal = user.CodePostal ?? string.Empty,
                Ville = user.Ville ?? string.Empty,
                PaysId = user.PaysId,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber ?? string.Empty,
                FullName = user.FullName,
                Role = role?.FirstOrDefault()
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