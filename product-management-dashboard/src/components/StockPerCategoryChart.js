import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const StockPerCategoryChart = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5244/api/Products");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const products = await response.json();

                // Calculate total stock per category
                const categoryTotals = products.reduce((acc, product) => {
                    acc[product.category] = (acc[product.category] || 0) + product.stockQuantity;
                    return acc;
                }, {});

                // Transform data into an array for the chart
                const chartData = Object.entries(categoryTotals).map(([category, totalStock]) => ({
                    category,
                    totalStock,
                }));

                setData(chartData);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError("Failed to load data.");
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div style={{ width: "100%", height: 400 }}>
            <h2>Total Stock Quantity Per Category</h2>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalStock" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockPerCategoryChart;
