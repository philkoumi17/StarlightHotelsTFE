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
    public class SaisonController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SaisonController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Saison
        [HttpGet]
        [Route("GetSaisons")]
        public async Task<ActionResult<IEnumerable<SaisonModel>>> GetSaisons()
        {
            return await _context.Saisons.ToListAsync();
        }

        // GET: api/Saison/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaisonModel>> GetSaison(int id)
        {
            var saison = await _context.Saisons.FindAsync(id);

            if(saison == null)
            {
                return NotFound();
            }

            return saison;
        }

        // PUT: api/Saison/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaison(int id, SaisonModel saison)
        {
            if(id != saison.Id)
            {
                return BadRequest();
            }

            _context.Entry(saison).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!SaisonExists(id))
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

        // POST: api/Saison
        [HttpPost]
        public async Task<ActionResult<SaisonModel>> PostSaison(SaisonModel saison)
        {
            _context.Saisons.Add(saison);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSaisons", new { id = saison.Id }, saison);
        }

        private bool SaisonExists(int id)
        {
            return _context.Saisons.Any(e => e.Id == id);
        }
    }
}