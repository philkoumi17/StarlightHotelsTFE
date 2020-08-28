﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<IEnumerable<CategorieModel>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categorie/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategorieModel>> GetCategorie(int id)
        {
            var categorie = await _context.Categories.FindAsync(id);

            if(categorie == null)
            {
                return NotFound();
            }

            return categorie;
        }

        // PUT: api/Categorie/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategorie(int id, CategorieModel categorie)
        {
            if (id != categorie.Id)
            {
                return BadRequest();
            }

            _context.Entry(categorie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategorieExists(id))
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
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CategorieModel>> PostCategorie(CategorieModel categorie)
        {
            _context.Categories.Add(categorie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategorie", new { id = categorie.Id }, categorie);
        }

        // DELETE: api/Chambre/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CategorieModel>> DeleteCategorie(int id)
        {
            var categorie = await _context.Categories.FindAsync(id);
            if(categorie == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(categorie);
            await _context.SaveChangesAsync();

            return categorie;
        }

        private bool CategorieExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}