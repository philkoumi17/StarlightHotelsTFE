using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using StarlightHotels.Core.Entities;
using StarlightHotels.Core.ViewModels;
using StarlightHotels.DAL.Data;
using StarlightHotels.Utilities;

namespace StarlightHotels.API.Controllers
{
    public class UserController : BaseApiController
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly ApplicationDbContext _context;

        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context = context;
        }

        // GET: api/User/GetUsers
        [HttpGet]
        [Route("GetUsers")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            return await _context.ApplicationUsers.ToListAsync();
        }

        // Return the list of user's bookings
        // Get: api/User/GetReservations/id
        [HttpGet]
        [Route("GetReservations/{resId}")]
        public async Task<ActionResult<IEnumerable<ReservationModel>>> GetReservations(int resId)
        {
            return await _context.Reservations.Where(res => res.IdRes == resId).ToListAsync();
        }
    }
}