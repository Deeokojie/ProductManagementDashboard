using Xunit;
using Microsoft.EntityFrameworkCore;
using ProductManagementDashboard.Models;

namespace ProductManagementDashboard.Tests
{
    public class UnitTest1
    {
        [Fact]
        public void TestGetProducts()
        {
            // Set up in-memory database
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                // Seed data
                context.Products.Add(new Product { Name = "TestProduct", Category = "TestCategory", Price = 10.0m, StockQuantity = 5 });
                context.SaveChanges();

                // Verify
                Assert.Single(context.Products);
                var product = context.Products.First();
                Assert.Equal("TestProduct", product.Name);
            }
            
            
        }
    }
}
