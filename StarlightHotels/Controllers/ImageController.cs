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
    public class ImageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ImageController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Image
        [HttpGet]
        [Route("GetImages")]
        public async Task<ActionResult<IEnumerable<ImageModel>>> GetImages()
        {
            return await _context.Images.ToListAsync();
        }

        // GET: api/Image/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ImageModel>> GetImage(int id)
        {
            var image = await _context.Images.FindAsync(id);

            if(image == null)
            {
                return NotFound();
            }

            return image;
        }

        // PUT: api/Image/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(int id, ImageModel image)
        {
            if(id != image.Id)
            {
                return BadRequest();
            }

            _context.Entry(image).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!ImageExists(id))
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

        // POST: api/Image
        [HttpPost]
        public async Task<ActionResult<ImageModel>> PostImage(ImageModel image)
        {
            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImages", new { id = image.Id }, image);
        }

        private bool ImageExists(int id)
        {
            return _context.Images.Any(e => e.Id == id);
        }
    }
}