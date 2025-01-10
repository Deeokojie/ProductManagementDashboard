# API Endpoints Documentation

## Base URL
`http://localhost:5244`

---

### 1. GET /api/Products
**Description:** Retrieve all products.

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "Banana",
    "category": "Fruits",
    "productCode": "F001",
    "price": 1.5,
    "stockQuantity": 50,
    "dateAdded": "2025-01-09T00:00:00"
  }
]

2. POST /api/Products
Description: Add a new product.

Request Example:

{
  "name": "Apple",
  "category": "Fruits",
  "productCode": "F002",
  "price": 2.1,
  "stockQuantity": 25,
  "dateAdded": "2025-01-09T00:00:00"
}

{
  "id": 2,
  "name": "Apple",
  "category": "Fruits",
  "productCode": "F002",
  "price": 2.1,
  "stockQuantity": 25,
  "dateAdded": "2025-01-09T00:00:00"
}

3. PUT /api/Products/{id}
Description: Update an existing product.

Request Example:

{
  "name": "Updated Apple",
  "category": "Fruits",
  "productCode": "F002",
  "price": 2.5,
  "stockQuantity": 30,
  "dateAdded": "2025-01-09T00:00:00"
}

Response Example:

{
  "id": 2,
  "name": "Updated Apple",
  "category": "Fruits",
  "productCode": "F002",
  "price": 2.5,
  "stockQuantity": 30,
  "dateAdded": "2025-01-09T00:00:00"
}

4. DELETE /api/Products/{id}
Description: Delete a product by ID.

Request:

DELETE /api/Products/1

Response: Returns a 204 No Content status on success.

Body: (Empty)






