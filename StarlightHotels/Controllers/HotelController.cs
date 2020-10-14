using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.Core.ViewModels;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class HotelController : BaseApiController
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
        [HttpPut("{id}")]
        public async Task<ActionResult<HotelModel>> PutHotel(int id, HotelModel hotel)
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

            return Ok(hotel);
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
        [HttpPost]
        [Route("SearchHotels")]
        public async Task<ActionResult<List<HotelModel>>> SearchHotels(SearchHotelViewModel searchHotel)
        {
            List<HotelModel> hotels;

            if(searchHotel.PaysId == 0)
            {
                hotels = await _context.Hotels.Where(h => h.Actif).ToListAsync();
            }
            else if(string.IsNullOrEmpty(searchHotel.City))
            {
                hotels = await _context.Hotels.Where(h => h.PaysId == searchHotel.PaysId && h.Actif).ToListAsync();
            }
            else
            {
                hotels = await _context.Hotels.Where(h => h.PaysId == searchHotel.PaysId && h.Ville == searchHotel.City && h.Actif).ToListAsync();
            }

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

        // Get: api/Hotel/GetAllPromotedHotels
        [HttpGet]
        [Route("GetAllPromotedHotels")]
        public async Task<ActionResult<List<HotelModel>>> GetAllPromotedHotels()
        {
            var promoHotels = await _context.Hotels.Where(h => h.EnPromotion == true && h.Actif == true).ToListAsync();

            return Ok(promoHotels);
        }

        // Get: api/Hotel/GetAllTopHotels
        [HttpGet]
        [Route("GetAllTopHotels")]
        public async Task<ActionResult<List<HotelModel>>> GetAllTopHotels()
        {
            var hotelsTop = await _context.Hotels.Where(h => h.TopDestination == true && h.EnPromotion == true && h.Actif == true).ToListAsync();

            return Ok(hotelsTop);
        }

        // Get: api/Hotel/detail/id
        [HttpGet("DetailsHotel/{hotelId}")]
        public async Task<ActionResult<HotelDetailsViewModel>> DetailsHotel(int hotelId)
        {
            var hotelDetail = new HotelDetailsViewModel()
            {
                HotelInfos = await _context.Hotels.FindAsync(hotelId),
                HotelRooms = await _context.HotelCategories.Where(hC => hC.HotelId == hotelId).ToListAsync(),
                HotelThemes = await _context.HotelThemes.Where(hT => hT.HotelId == hotelId).ToListAsync(),
                HotelFormules = await _context.HotelFormules.Where(hF => hF.HotelId == hotelId).ToListAsync(),
                HotelServicesFree = await _context.HotelServices.Where(hS => hS.HotelId == hotelId && hS.Service.Payant == false).ToListAsync(),
                HotelServicesNoFree = await _context.HotelServices.Where(hS => hS.HotelId == hotelId && hS.Service.Payant == true).ToListAsync()
            };

            return Ok(hotelDetail);
        }

        // Return the list of hotel's pictures
        // Get: api/Hotel/GetPictures/id
        [HttpGet]
        [Route("GetPictures/{hotelId}")]
        public async Task<ActionResult<IEnumerable<ImageModel>>> GetPictures(int hotelId)
        {
            return await _context.Images.Where(image => image.HotelId == hotelId).ToListAsync();
        }
    }
}