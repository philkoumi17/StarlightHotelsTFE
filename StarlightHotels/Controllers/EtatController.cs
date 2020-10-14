using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class EtatController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public EtatController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Etat
        [HttpGet]
        [Route("GetEtats")]
        public async Task<ActionResult<IEnumerable<EtatModel>>> GetEtats()
        {
            return await _context.Etats.ToListAsync();
        }

        // GET: api/Etat/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EtatModel>> GetEtat(int id)
        {
            var etat = await _context.Etats.FindAsync(id);

            if(etat == null)
            {
                return NotFound();
            }

            return etat;
        }

        // PUT: api/Etat/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEtat(int id, EtatModel etat)
        {
            if(id != etat.Id)
            {
                return BadRequest();
            }

            _context.Entry(etat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!EtatExists(id))
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

        // POST: api/Etat
        [HttpPost]
        public async Task<ActionResult<EtatModel>> PostEtat(EtatModel etat)
        {
            _context.Etats.Add(etat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEtats", new { id = etat.Id }, etat);
        }

        private bool EtatExists(int id)
        {
            return _context.Etats.Any(e => e.Id == id);
        }
    }
}