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
    public class CategorieController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategorieController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Categorie
        [HttpGet]
        [Route("GetCategories")]
        public async Task<ActionResult<IEnumerable<CategorieModel>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categorie/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategorieModel>> GetCategorie(int id)
        {
            var cat = await _context.Categories.FindAsync(id);

            if(cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // PUT: api/Categorie/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategorie(int id, CategorieModel cat)
        {
            if(id != cat.Id)
            {
                return BadRequest();
            }

            _context.Entry(cat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!CategorieExists(id))
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

        // POST: api/Categorie
        [HttpPost]
        public async Task<ActionResult<CategorieModel>> PostCategorie(CategorieModel cat)
        {
            _context.Categories.Add(cat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategories", new { id = cat.Id }, cat);
        }

        private bool CategorieExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}