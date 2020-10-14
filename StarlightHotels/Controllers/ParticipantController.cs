using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;
using StarlightHotels.DAL.Data;

namespace StarlightHotels.API.Controllers
{
    public class ParticipantController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public ParticipantController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Participant
        [HttpGet]
        [Route("GetParticipants")]
        public async Task<ActionResult<IEnumerable<ParticipantModel>>> GetParticipants()
        {
            return await _context.Participants.ToListAsync();
        }

        // GET: api/Participant/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ParticipantModel>> GetParticipant(int id)
        {
            var part = await _context.Participants.FindAsync(id);

            if(part == null)
            {
                return NotFound();
            }

            return part;
        }

        // PUT: api/Participant/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipant(int id, ParticipantModel part)
        {
            if(id != part.Id)
            {
                return BadRequest();
            }

            _context.Entry(part).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!ParticipantExists(id))
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

        // POST: api/Participant
        [HttpPost]
        public async Task<ActionResult<ParticipantModel>> PostParticipant(ParticipantModel part)
        {
            _context.Participants.Add(part);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParticipants", new { id = part.Id }, part);
        }

        private bool ParticipantExists(int id)
        {
            return _context.Participants.Any(e => e.Id == id);
        }
    }
}