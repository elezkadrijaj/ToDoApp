using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Data;
using ToDoApp.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ToDoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public ToDoItemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ToDoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetToDoItems()
        {
            return await _context.ToDoItems.ToListAsync();
        }

        // GET: api/ToDoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetToDoItem(int id)
        {
            var toDoItem = await _context.ToDoItems.FindAsync(id);

            if (toDoItem == null)
            {
                return NotFound();
            }

            return toDoItem;
        }

        // PUT: api/ToDoItems/5
        [HttpPatch("{id}")]
        
        public async Task<ToDoItem> UpdateToDoItem( ToDoItem toDoItem)
        {
            _context.Entry(toDoItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return toDoItem;
        }

        // POST: api/ToDoItems
        [HttpPost]
        public async Task<ActionResult<ToDoItem>> PostToDoItem(ToDoItem toDoItem)
        {
            _context.ToDoItems.Add(toDoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetToDoItem), new { id = toDoItem.Id }, toDoItem);
        }

        // DELETE: api/ToDoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoItem(int id)
        {
            var toDoItem = await _context.ToDoItems.FindAsync(id);
            if (toDoItem == null)
            {
                return NotFound();
            }

            _context.ToDoItems.Remove(toDoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToDoItemExists(int id)
        {
            return _context.ToDoItems.Any(e => e.Id == id);
        }
    }
}

