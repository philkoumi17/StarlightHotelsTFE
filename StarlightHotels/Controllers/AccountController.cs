using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StarlightHotels.DAL.Data;
using StarlightHotels.Models;
using StarlightHotels.Models.ViewModels;
using StarlightHotels.Utilities;

namespace StarlightHotels.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly ApplicationDbContext _context;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context = context;
        }

        // POST: /api/Account/Register
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<IdentityResult>> Register(AccountViewModel model)
        {
            if (string.IsNullOrEmpty(model?.Email))
            {
                return BadRequest();
            }

            var applicationUser = new ApplicationUser()
            {
                Nom = model.Nom,
                Prenom = model.Prenom,
                DateNaissance = model.DateNaissance,
                Sexe = model.Sexe,
                NumeroRue = model.NumeroRue,
                Rue = model.Rue,
                CodePostal = model.CodePostal,
                Ville = model.Ville,
                PaysId = model.PaysId,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                UserName = model.Email,
                FullName = $"{model.Prenom} {model.Nom}"
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                return Ok(result);
            }
            catch (DbUpdateConcurrencyException)
            {
                return ValidationProblem();
            }
        }

       // POST: /api/Account/Login
       [HttpPost]
       [Route("Login")]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                // Get role assigned to the user
                //var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        //new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault()),
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)),
                        SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect !" });
            }
        }

        // GET: /api/Account/GetAllCountries
        [HttpGet]
        [Route("GetAllCountries")]
        public async Task<ActionResult<IEnumerable<PaysModel>>> GetAllCountries()
        {
            return await _context.Pays.ToListAsync();
        }
    }
}