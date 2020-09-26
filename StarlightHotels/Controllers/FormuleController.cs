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
    public class FormuleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FormuleController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Formule
        [HttpGet]
        [Route("GetFormules")]
        public async Task<ActionResult<IEnumerable<FormuleModel>>> GetFormules()
        {
            return await _context.Formules.ToListAsync();
        }

        // GET: api/Formule/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FormuleModel>> GetFormule(int id)
        {
            var formule = await _context.Formules.FindAsync(id);

            if(formule == null)
            {
                return NotFound();
            }

            return formule;
        }

        // PUT: api/Formule/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormule(int id, FormuleModel formule)
        {
            if(id != formule.Id)
            {
                return BadRequest();
            }

            _context.Entry(formule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!FormuleExists(id))
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

        // POST: api/Formule
        [HttpPost]
        public async Task<ActionResult<FormuleModel>> PostFormule(FormuleModel formule)
        {
            _context.Formules.Add(formule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFormules", new { id = formule.Id }, formule);
        }

        private bool FormuleExists(int id)
        {
            return _context.Formules.Any(e => e.Id == id);
        }
    }
}