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
    public class PromotionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PromotionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Promotion
        [HttpGet]
        [Route("GetPromotions")]
        public async Task<ActionResult<IEnumerable<PromotionModel>>> GetPromotions()
        {
            return await _context.Promotions.ToListAsync();
        }

        // GET: api/Promotion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PromotionModel>> GetPromotion(int id)
        {
            var promotion = await _context.Promotions.FindAsync(id);

            if(promotion == null)
            {
                return NotFound();
            }

            return promotion;
        }

        // PUT: api/Promotion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromotion(int id, PromotionModel promo)
        {
            if(id != promo.Id)
            {
                return BadRequest();
            }

            _context.Entry(promo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!PromotionExists(id))
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

        // POST: api/Promotion
        [HttpPost]
        public async Task<ActionResult<PromotionModel>> PostPromotion(PromotionModel promo)
        {
            _context.Promotions.Add(promo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPromotions", new { id = promo.Id }, promo);
        }

        private bool PromotionExists(int id)
        {
            return _context.Promotions.Any(e => e.Id == id);
        }
    }
}