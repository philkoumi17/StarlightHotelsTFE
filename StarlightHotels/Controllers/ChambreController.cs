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
    public class ChambreController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChambreController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Chambre
        [HttpGet]
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
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChambre(int id, ChambreModel chambre)
        {
            if (id != chambre.ChNum)
            {
                return BadRequest();
            }

            _context.Entry(chambre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChambreExists(id))
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
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChambreModel>> PostChambre(ChambreModel chambre)
        {
            _context.Chambres.Add(chambre);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChambre", new { id = chambre.ChNum }, chambre);
        }

        // DELETE: api/Chambre/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChambreModel>> DeleteChambre(int id)
        {
            var chambre = await _context.Chambres.FindAsync(id);
            if(chambre == null)
            {
                return NotFound();
            }

            _context.Chambres.Remove(chambre);
            await _context.SaveChangesAsync();

            return chambre;
        }

        private bool ChambreExists(int id)
        {
            return _context.Chambres.Any(e => e.ChNum == id);
        }
    }
}