using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementDashboard.Controllers;
using ProductManagementDashboard.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductManagementDashboard.Tests
{
    public class ProductsControllerTests
    {
        private readonly ApplicationDbContext _context;
        private readonly ProductsController _controller;

        public ProductsControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new ApplicationDbContext(options);

            // Clear existing data
            _context.Products.RemoveRange(_context.Products);
            _context.SaveChanges();

            // Seed fresh data
            _context.Products.AddRange(new List<Product>
            {
                new Product { Name = "Banana", Category = "Fruits", ProductCode = "F001", Price = 1.5m, StockQuantity = 50, DateAdded = System.DateTime.Now },
                new Product { Name = "Laptop", Category = "Electronics", ProductCode = "E001", Price = 999m, StockQuantity = 100, DateAdded = System.DateTime.Now }
            });
            _context.SaveChanges();

            _controller = new ProductsController(_context);
        }

        [Fact]
        public async Task GetProducts_ReturnsAllProducts()
        {
            var result = await _controller.GetProducts();
            
            var products = Assert.IsType<List<Product>>(result.Value);
            Assert.Equal(2, products.Count);
        }

        [Fact]
        public async Task GetProduct_ValidId_ReturnsProduct()
        {
            var productInDb = await _context.Products.FirstAsync();
            var result = await _controller.GetProduct(productInDb.Id);
            
            var product = Assert.IsType<Product>(result.Value);
            Assert.Equal(productInDb.Name, product.Name);
        }

        [Fact]
        public async Task GetProduct_InvalidId_ReturnsNotFound()
        {
            var result = await _controller.GetProduct(99);
            
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PostProduct_ValidProduct_AddsProduct()
        {
            var newProduct = new Product { Name = "Apple", Category = "Fruits", ProductCode = "F002", Price = 2.1m, StockQuantity = 25, DateAdded = System.DateTime.Now };
            
            var result = await _controller.PostProduct(newProduct);
            
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var product = Assert.IsType<Product>(createdAtActionResult.Value);
            Assert.Equal("Apple", product.Name);
        }

        [Fact]
        public async Task PostProduct_InvalidProduct_ReturnsBadRequest()
        {
            var invalidProduct = new Product { Category = "Fruits" }; // Missing required fields
            
            var result = await _controller.PostProduct(invalidProduct);
            
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task DeleteProduct_ValidId_RemovesProduct()
        {
            var productInDb = await _context.Products.FirstAsync();
            
            var result = await _controller.DeleteProduct(productInDb.Id);
            
            Assert.IsType<NoContentResult>(result);
            Assert.Null(await _context.Products.FindAsync(productInDb.Id));
        }

        [Fact]
        public async Task DeleteProduct_InvalidId_ReturnsNotFound()
        {
            
            var result = await _controller.DeleteProduct(99);
            
            Assert.IsType<NotFoundResult>(result);
        }
    }
}



