using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class FactureController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public FactureController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Facture
        [HttpGet]
        [Route("GetFactures")]
        public async Task<ActionResult<IEnumerable<FactureModel>>> GetFactures()
        {
            return await _context.Factures.ToListAsync();
        }

        // GET: api/Facture/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FactureModel>> GetFacture(int id)
        {
            var facture = await _context.Factures.FindAsync(id);

            if(facture == null)
            {
                return NotFound();
            }

            return facture;
        }

        // PUT: api/Facture/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFacture(int id, FactureModel facture)
        {
            if(id != facture.Id)
            {
                return BadRequest();
            }

            _context.Entry(facture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!FactureExists(id))
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

        // POST: api/Facture
        [HttpPost]
        public async Task<ActionResult<FactureModel>> PostFacture(FactureModel facture)
        {
            _context.Factures.Add(facture);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFactufacture", new { id = facture.Id }, facture);
        }

        private bool FactureExists(int id)
        {
            return _context.Factures.Any(e => e.Id == id);
        }
    }
}