import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import StockPerCategoryChart from "./components/StockPerCategoryChart";

const App = () => {
    const [showGraph, setShowGraph] = useState(false);

    const toggleGraph = () => {
        setShowGraph((prev) => !prev);
    };

    return (
        <Router>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <button onClick={toggleGraph} style={{ marginBottom: "20px" }}>
                    {showGraph ? "Hide Graph" : "Show Graph"}
                </button>
                {showGraph && <StockPerCategoryChart />}
                <Routes>
                    <Route path="/" element={<h1>Welcome to Product Management</h1>} />
                    <Route path="/products" element={<ProductTable />} />
                    <Route path="/add-product" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;


