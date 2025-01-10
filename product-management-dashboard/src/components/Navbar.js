import React from 'react';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navlinks}>
                <li><a href="/" style={styles.link}>Home</a></li>
                <li><a href="/products" style={styles.link}>Products</a></li>
                <li><a href="/add-product" style={styles.link}>Add Product</a></li>
            </ul>    
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
    },
    navLinks: {
        listStyleType: "none",
        display: "flex",
        gap: "15px",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "1rem",
    },
};

export default Navbar;