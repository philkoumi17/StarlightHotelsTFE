using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class PaysController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public PaysController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Pays
        [HttpGet]
        [Route("GetPays")]
        public async Task<ActionResult<IEnumerable<PaysModel>>> GetPays()
        {
            return await _context.Pays.ToListAsync();
        }

        // GET: api/Pays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaysModel>> GetPays(int id)
        {
            var pays = await _context.Pays.FindAsync(id);

            if(pays == null)
            {
                return NotFound();
            }

            return pays;
        }

        // PUT: api/Pays/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPays(int id, PaysModel pays)
        {
            if(id != pays.Id)
            {
                return BadRequest();
            }

            _context.Entry(pays).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!PaysExists(id))
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

        // POST: api/Pays
        [HttpPost]
        public async Task<ActionResult<PaysModel>> PostPays(PaysModel pays)
        {
            _context.Pays.Add(pays);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayss", new { id = pays.Id }, pays);
        }

        private bool PaysExists(int id)
        {
            return _context.Pays.Any(e => e.Id == id);
        }
    }
}