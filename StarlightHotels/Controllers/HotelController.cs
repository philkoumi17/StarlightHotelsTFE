using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.DAL.Data;
using StarlightHotels.Models;

namespace StarlightHotels.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HotelController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Hotel
        [HttpGet]
        [Route("GetHotels")]
        public async Task<ActionResult<IEnumerable<HotelModel>>> GetHotels()
        {
            return await _context.Hotels.ToListAsync();
        }

        // GET: api/Hotel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HotelModel>> GetHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);

            if(hotel == null)
            {
                return NotFound();
            }

            return hotel;
        }

        // PUT: api/Hotel/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotel(int id, HotelModel hotel)
        {
            if(id != hotel.Id)
            {
                return BadRequest();
            }

            _context.Entry(hotel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!HotelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Hotel
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<HotelModel>> PostHotel(HotelModel hotel)
        {
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHotel", new { id = hotel.Id }, hotel);
        }

        private bool HotelExists(int id)
        {
            return _context.Hotels.Any(e => e.Id == id);
        }

        // Return the list of countries
        // Get: api/Hotel/GetCountries
        [HttpGet]
        [Route("GetCountries")]
        public async Task<ActionResult<IEnumerable<PaysModel>>> GetCountries()
        {
            return await _context.Pays.ToListAsync();
        }

        // Return the list of cities by the country's choice
        // Get: api/Hotel/GetCitiesByCountry
        [HttpGet]
        [Route("GetCitiesByCountry/{paysId}")]
        public async Task<ActionResult<List<string>>> GetCitiesByCountry(int paysId)
        {
            var hotels = await _context.Hotels.Where(h => h.PaysId == paysId).ToListAsync();
            var villes = hotels.Select(s => s.Ville).ToList();
            return villes.Distinct().ToList();
        }

        // Get: api/Hotel/SearchHotels
        [HttpGet]
        [Route("SearchHotels")]
        public async Task<ActionResult<List<HotelModel>>> SearchHotels(int paysId, string city, string arrDate, string depDate)
        {
            var hotels = await _context.Hotels.Where(h => h.PaysId == paysId && h.Ville == city && h.Actif == true).ToListAsync();
            
            return Ok(hotels);
        }

        // Get: api/Hotel/SearchHotelsByTheme
        [HttpGet]
        [Route("SearchHotelsByTheme")]
        public async Task<ActionResult<List<HotelModel>>> SearchHotelsByTheme(int themeId)
        {
            var hotelThemes = await _context.HotelThemes.Where(h => h.ThemeId == themeId).ToListAsync();
            var hotels = await _context.Hotels.Where(h => h.HotelThemes == hotelThemes && h.Actif == true).ToListAsync();

            return Ok(hotels);
        }

        // Get: api/Hotel/SearchHotelsByTop
        [HttpGet]
        [Route("SearchHotelsByTop")]
        public async Task<ActionResult<List<HotelModel>>> SearchHotelsByTop()
        {
            var hotels = await _context.Hotels.Where(h => h.TopDestination == true && h.Actif == true).ToListAsync();

            return Ok(hotels);
        }
    }
}