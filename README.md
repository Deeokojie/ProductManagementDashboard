
Here's an updated version of your README.md file that includes instructions for running the unit tests. The Docker section remains as a placeholder since it is incomplete.

Product Management Dashboard
This project is a simple Product Management Dashboard built with ASP.NET Core for the backend and React for the frontend. It implements a RESTful API to manage products and a user-friendly React frontend to display and interact with the data.

Features
Backend (ASP.NET Core)
REST API:

Register a new product with details:
Category
Name
Product Code
Price
Stock Quantity
Date Added
Retrieve a list of products.
Database:

Uses SQLite for local file storage for ease of testing.
Unit Tests:

Includes unit tests for key functionalities using xUnit.
A total of 7 tests have been implemented and all pass successfully.
Frontend (React)
DataTable:

Displays a list of products with sorting for all columns.
Filtering for Product Code and Name.
Graph:

Visual representation of product data showing total stock quantity per category.
Setup Instructions
Prerequisites
.NET 8.0 SDK
Node.js and npm
SQLite
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/Deeokojie/ProductManagementDashboard.git
cd ProductManagementDashboard
Install dependencies:

bash
Copy code
dotnet restore
Run database migrations:

bash
Copy code
dotnet ef database update
Start the backend server:

bash
Copy code
dotnet run
The server will run on http://localhost:5244.

Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd product-management-dashboard
Install dependencies:

bash
Copy code
npm install
Start the React development server:

bash
Copy code
npm start
The frontend will run on http://localhost:3000.

Unit Tests
Navigate to the test project directory:

bash
Copy code
cd ProductManagementDashboard.Tests
Run the unit tests:

bash
Copy code
dotnet test
You should see the following output:

yaml
Copy code
Passed! - Failed: 0, Passed: 7, Skipped: 0, Total: 7
API Documentation
The API provides the following endpoints:

GET /api/Products - Retrieves all products.
POST /api/Products - Registers a new product.
Refer to the API_DOCUMENTATION.md file for detailed documentation.

Docker (Optional)
Note: Dockerization is not yet completed but can be added in the future to simplify deployment.

Future Improvements
Complete Dockerization for easy deployment.
Enhance unit test coverage.
Add authentication and authorization.
