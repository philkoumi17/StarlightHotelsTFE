using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class TarifController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public TarifController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tarif
        [HttpGet]
        [Route("GetTarifs")]
        public async Task<ActionResult<IEnumerable<TarifModel>>> GetTarifs()
        {
            return await _context.Tarifs.ToListAsync();
        }

        // GET: api/Tarif/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TarifModel>> GetTarif(int id)
        {
            var tarif = await _context.Tarifs.FindAsync(id);

            if(tarif == null)
            {
                return NotFound();
            }

            return tarif;
        }

        // PUT: api/Tarif/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarif(int id, TarifModel tarif)
        {
            if(id != tarif.Id)
            {
                return BadRequest();
            }

            _context.Entry(tarif).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!TarifExists(id))
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

        // POST: api/Tarif
        [HttpPost]
        public async Task<ActionResult<TarifModel>> PostTarif(TarifModel tarif)
        {
            _context.Tarifs.Add(tarif);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTarifs", new { id = tarif.Id }, tarif);
        }

        private bool TarifExists(int id)
        {
            return _context.Tarifs.Any(e => e.Id == id);
        }

        // GET: api/Tarif/Saison
        [HttpGet]
        [Route("GetSaisons")]
        public async Task<ActionResult<IEnumerable<SaisonModel>>> GetSaisons()
        {
            return await _context.Saisons.ToListAsync();
        }

        // GET: api/Tarif/Categorie
        [HttpGet]
        [Route("GetCategories")]
        public async Task<ActionResult<IEnumerable<CategorieModel>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}