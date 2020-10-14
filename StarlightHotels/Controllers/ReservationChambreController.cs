using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class ReservationChambreController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public ReservationChambreController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ChambreReservee
        [HttpGet]
        [Route("GetChambreReservees")]
        public async Task<ActionResult<IEnumerable<ChambreReserveeModel>>> GetChambreReservees()
        {
            return await _context.ChambreReservees.ToListAsync();
        }

        // GET: api/ChambreReservee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChambreReserveeModel>> GetChambreReservee(int id)
        {
            var chRes = await _context.ChambreReservees.FindAsync(id);

            if(chRes == null)
            {
                return NotFound();
            }

            return chRes;
        }

        // PUT: api/ChambreReservee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChambreReservee(int id, ChambreReserveeModel chRes)
        {
            if(id != chRes.IdResCh)
            {
                return BadRequest();
            }

            _context.Entry(chRes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!ChambreReserveeExists(id))
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
        public async Task<ActionResult<ChambreReserveeModel>> PostChambreReservee(ChambreReserveeModel chRes)
        {
            _context.ChambreReservees.Add(chRes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChambreReservees", new { id = chRes.IdResCh }, chRes);
        }

        private bool ChambreReserveeExists(int id)
        {
            return _context.ChambreReservees.Any(e => e.IdResCh == id);
        }
    }
}