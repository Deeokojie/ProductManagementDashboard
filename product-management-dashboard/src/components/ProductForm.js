import React, { useState } from "react";

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: "",
        category: "",
        productCode: "",
        price: "",
        stockQuantity: "",
        dateAdded: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5244/api/Products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error(`Failed to add product. Status: ${response.status}`);
            }

            setSuccessMessage("Product added successfully!");
            setErrorMessage("");
            setProduct({
                name: "",
                category: "",
                productCode: "",
                price: "",
                stockQuantity: "",
                dateAdded: "",
            });
        } catch (error) {
            console.error("Error adding product:", error);
            setErrorMessage("An error occurred while adding the product. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Category:
                <select name="category" value={product.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothes">Clothes</option>
                </select>
            </label>
            <label>
                Product Code:
                <input
                    type="text"
                    name="productCode"
                    value={product.productCode}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Stock Quantity:
                <input
                    type="number"
                    name="stockQuantity"
                    value={product.stockQuantity}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Date Added:
                <input
                    type="date"
                    name="dateAdded"
                    value={product.dateAdded}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;

