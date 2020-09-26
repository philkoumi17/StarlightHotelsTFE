using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.DAL.Data;
using StarlightHotels.Models;

namespace StarlightHotels.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReservationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservation
        [HttpGet]
        [Route("GetReservations")]
        public async Task<ActionResult<IEnumerable<ReservationModel>>> GetReservations()
        {
            return await _context.Reservations.ToListAsync();
        }

        // GET: api/Reservation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationModel>> GetReservation(int id)
        {
            var res = await _context.Reservations.FindAsync(id);

            if(res == null)
            {
                return NotFound();
            }

            return res;
        }

        // PUT: api/Reservation/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, ReservationModel res)
        {
            if(id != res.IdRes)
            {
                return BadRequest();
            }

            _context.Entry(res).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!ReservationExists(id))
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

        // POST: api/Reservation
        [HttpPost]
        public async Task<ActionResult<ReservationModel>> PostReservation(ReservationModel res)
        {
            _context.Reservations.Add(res);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservations", new { id = res.IdRes }, res);
        }

        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.IdRes == id);
        }
    }
}