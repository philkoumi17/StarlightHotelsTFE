using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class ReservationController : BaseApiController
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

        // GET: api/Reservation/GetFormules
        [HttpGet]
        [Route("GetFormules")]
        public async Task<ActionResult<IEnumerable<FormuleModel>>> GetFormules()
        {
            return await _context.Formules.ToListAsync();
        }

        // GET: api/Reservation/GetServices
        [HttpGet]
        [Route("GetServices")]
        public async Task<ActionResult<IEnumerable<ServiceModel>>> GetServices()
        {
            return await _context.Services.ToListAsync();
        }

        // GET: api/Reservation/GetEtats
        [HttpGet]
        [Route("GetEtats")]
        public async Task<ActionResult<IEnumerable<EtatModel>>> GetEtats()
        {
            return await _context.Etats.ToListAsync();
        }
    }
}