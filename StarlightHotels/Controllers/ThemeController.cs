using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class ThemeController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public ThemeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Theme
        [HttpGet]
        [Route("GetThemes")]
        public async Task<ActionResult<IEnumerable<ThemeModel>>> GetThemes()
        {
            return await _context.Themes.ToListAsync();
        }

        // GET: api/Theme/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ThemeModel>> GetTheme(int id)
        {
            var theme = await _context.Themes.FindAsync(id);

            if(theme == null)
            {
                return NotFound();
            }

            return theme;
        }

        // PUT: api/Theme/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTheme(int id, ThemeModel theme)
        {
            if(id != theme.Id)
            {
                return BadRequest();
            }

            _context.Entry(theme).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!ThemeExists(id))
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

        // POST: api/Theme
        [HttpPost]
        public async Task<ActionResult<ThemeModel>> PostTheme(ThemeModel theme)
        {
            _context.Themes.Add(theme);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetThemes", new { id = theme.Id }, theme);
        }

        private bool ThemeExists(int id)
        {
            return _context.Themes.Any(e => e.Id == id);
        }
    }
}