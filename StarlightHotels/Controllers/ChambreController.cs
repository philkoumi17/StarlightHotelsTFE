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
    public class ChambreController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChambreController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Chambre
        [HttpGet]
        [Route("GetChambres")]
        public async Task<ActionResult<IEnumerable<ChambreModel>>> GetChambres()
        {
            return await _context.Chambres.ToListAsync();
        }

        // GET: api/Chambre/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChambreModel>> GetChambre(int id)
        {
            var chambre = await _context.Chambres.FindAsync(id);

            if(chambre == null)
            {
                return NotFound();
            }

            return chambre;
        }

        // PUT: api/Chambre/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChambre(int id, ChambreModel ch)
        {
            if(id != ch.ChNum)
            {
                return BadRequest();
            }

            _context.Entry(ch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!ChambreExists(id))
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

        // POST: api/Chambre
        [HttpPost]
        public async Task<ActionResult<ChambreModel>> PostChambre(ChambreModel ch)
        {
            _context.Chambres.Add(ch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChambres", new { id = ch.ChNum }, ch);
        }

        private bool ChambreExists(int id)
        {
            return _context.Chambres.Any(e => e.ChNum == id);
        }
    }
}