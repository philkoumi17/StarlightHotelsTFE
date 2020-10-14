using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class ServiceController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public ServiceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Service
        [HttpGet]
        [Route("GetServices")]
        public async Task<ActionResult<IEnumerable<ServiceModel>>> GetServices()
        {
            return await _context.Services.ToListAsync();
        }

        // GET: api/Service/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceModel>> GetService(int id)
        {
            var service = await _context.Services.FindAsync(id);

            if(service == null)
            {
                return NotFound();
            }

            return service;
        }

        // PUT: api/Service/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutService(int id, ServiceModel service)
        {
            if(id != service.Id)
            {
                return BadRequest();
            }

            _context.Entry(service).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!ServiceExists(id))
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

        // POST: api/Service
        [HttpPost]
        public async Task<ActionResult<ServiceModel>> PostService(ServiceModel service)
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServices", new { id = service.Id }, service);
        }

        private bool ServiceExists(int id)
        {
            return _context.Services.Any(e => e.Id == id);
        }
    }
}