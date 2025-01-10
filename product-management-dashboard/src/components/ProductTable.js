import React, { useEffect, useState } from 'react';

const ProductTable = () => {
    const [products, setProducts] = useState([]); 
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filter, setFilter] = useState({ name: '', productCode: '' }); 
    const [error, setError] = useState(''); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5244/api/Products');
                if (!response.ok) {
                    throw new Error(`Failed to fetch products. Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data); // Initially, all products are shown
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products.");
            }
        };

        fetchProducts();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));

        // Apply filters immediately when the user types
        const newFilteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(name === 'name' ? value.toLowerCase() : filter.name.toLowerCase()) &&
            product.productCode.toLowerCase().includes(name === 'productCode' ? value.toLowerCase() : filter.productCode.toLowerCase())
        );
        setFilteredProducts(newFilteredProducts);
    };

    return (
        <div>
            <h1>Product List</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label>
                    Filter by Name:
                    <input
                        type="text"
                        name="name"
                        value={filter.name}
                        onChange={handleFilterChange}
                        placeholder="Search by name"
                    />
                </label>
                <label>
                    Filter by Product Code:
                    <input
                        type="text"
                        name="productCode"
                        value={filter.productCode}
                        onChange={handleFilterChange}
                        placeholder="Search by product code"
                    />
                </label>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Product Code</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Date Added</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.productCode}</td>
                            <td>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(product.price)}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{new Date(product.dateAdded).toLocaleDateString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>
                            No products found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;


