using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementDashboard.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductManagementDashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context; 
        }

        // Handle preflight OPTIONS requests
        [HttpOptions]
        public IActionResult Options()
        {
            Response.Headers["Allow"] = "GET, POST, OPTIONS";
            return Ok();
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (string.IsNullOrWhiteSpace(product.Name) ||
                string.IsNullOrWhiteSpace(product.Category) ||
                string.IsNullOrWhiteSpace(product.ProductCode) ||
                product.Price <= 0 ||
                product.StockQuantity < 0)
            {
                return BadRequest("Invalid product data.");
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // DELETE: api/Products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
