import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Ensure you have imported Link from react-router-dom
import Cart from './Cart';  // Import Cart component
import "bootstrap/dist/css/bootstrap.min.css";
import "../nb_shop.css";

// FoodMain component refactored like ViralFood.jsx
const FoodMain = () => {
  const [cart, setCart] = useState([]);
  const [toppings, setToppings] = useState({});  // Manage selected toppings separately

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Update localStorage and state when cart is updated
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Handle adding a product to the cart
  const addToCart = (product, price, selectedToppings) => {
    const toppingsPrice = selectedToppings.reduce((acc, topping) => acc + parseFloat(topping.price), 0);
    const totalPrice = price + toppingsPrice;
    const cartKey = `${product}-${selectedToppings.map(t => t.name).join(",")}`;

    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.key === cartKey);

    if (existingItemIndex === -1) {
      updatedCart.push({ key: cartKey, product, price: totalPrice, toppings: selectedToppings.map(t => t.name), quantity: 1 });
    } else {
      updatedCart[existingItemIndex].quantity++;
    }

    updateCart(updatedCart);
  };

  // Handle topping change
  const handleToppingChange = (event, product, price) => {
    const toppingName = event.target.value;
    const toppingPrice = parseFloat(event.target.dataset.price);

    setToppings((prevToppings) => {
      const newToppings = event.target.checked
        ? [...(prevToppings[product] || []), { name: toppingName, price: toppingPrice }]
        : prevToppings[product].filter(topping => topping.name !== toppingName);

      addToCart(product, price, newToppings);  // Update the cart with new toppings
      return { ...prevToppings, [product]: newToppings };
    });
  };

  const products = [
    {
      name: "พอร์คชอพ",
      price: 80,
      img: "./src/product_img/Porkshop.png",
      toppings: [
        { name: "ผักต้ม", price: 10 },
        { name: "น่องไก่", price: 20 },
        { name: "ไส้กรอกรมควัน", price: 15 },
        { name: "ไส้กรอกเยอรมันนี", price: 25 },
        { name: "ไข่ดาว", price: 5 },
      ],
    },
    {
      name: "สเต็กเนื้อ",
      price: 85,
      img: "./src/product_img/stackmeat.png",
      toppings: [
        { name: "ผักต้ม", price: 10 },
        { name: "น่องไก่", price: 20 },
        { name: "ไส้กรอกรมควัน", price: 15 },
        { name: "ไส้กรอกเยอรมันนี", price: 25 },
        { name: "ไข่ดาว", price: 5 },
      ],
    },
    {
      name: "ข้าวผัดอเมริกัน",
      price: 65,
      img: "./src/product_img/firdrideUk.png",
      toppings: [
        { name: "ผักต้ม", price: 10 },
        { name: "น่องไก่", price: 20 },
        { name: "ไส้กรอกรมควัน", price: 15 },
        { name: "ไส้กรอกเยอรมันนี", price: 25 },
        { name: "ไข่ดาว", price: 5 },
      ],
    },
    {
      name: "ทีโบนสเต็ก",
      price: 180,
      img: "./src/product_img/Tbstack.png",
      toppings: [
        { name: "ผักต้ม", price: 10 },
        { name: "น่องไก่", price: 20 },
        { name: "ไส้กรอกรมควัน", price: 15 },
        { name: "ไส้กรอกเยอรมันนี", price: 25 },
        { name: "ไข่ดาว", price: 5 },
      ],
    },
    {
      name: "ฟิชแอนด์ชิพ",
      price: 70,
      img: "./src/product_img/fishsipe.png",
      toppings: [
        { name: "ผักต้ม", price: 10 },
        { name: "น่องไก่", price: 20 },
        { name: "ไส้กรอกรมควัน", price: 15 },
        { name: "ไส้กรอกเยอรมันนี", price: 25 },
        { name: "ไข่ดาว", price: 5 },
      ],
    },
    {
      name: "สปาเก็ตตี้หมูสับ",
      price: 45,
      img: "./src/product_img/SpaghettiPork.png",
      toppings: [
        { name: "ผักต้ม", price: 10 },
        { name: "น่องไก่", price: 20 },
        { name: "ไส้กรอกรมควัน", price: 15 },
        { name: "ไส้กรอกเยอรมันนี", price: 25 },
        { name: "ไข่ดาว", price: 5 },
      ],
    },
  ];

  return (
    <div>
      <header className="bg-dark text-white">
        <nav className="container navbar navbar-expand-lg navbar-dark py-3">
          <a className="navbar-brand" href="#">สเต็กลุงหนวด</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/viralfood">เมนูยอดนิยม</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/foodmain">อาหารจานหลัก</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/salad">สลัด</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/snack">อาหารทานเล่น</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sausage">ไส้กรอก</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/drink">เครื่องดื่ม</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-9">

            <div id="products" className="row">
              {products.map((product, index) => (
                <div key={index} className="col-md-3 product">
                  <img src={product.img} alt={product.name} width="150px" height="150px" />
                  <h5>{product.name}<br />${product.price}</h5>

                  <div>
                    {product.toppings.map((topping, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          className="topping"
                          value={topping.name}
                          data-price={topping.price}
                          onChange={(e) => handleToppingChange(e, product.name, product.price)}
                        />
                        {topping.name} (+${topping.price})
                      </label>
                    ))}
                  </div>

                  <button className="btn btn-primary" onClick={() => addToCart(product.name, product.price, [])}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-3">
            <h2 style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '1.75rem', color: '#9c4dcc' }}>
              Cart
              <img src="./src/product_img/Cartpng.png" alt="Cartpng" width="34px" height="34px" style={{ marginTop: '-11px' }} />
            </h2>
            <div id="cart" className="mt-3">
              <Cart cartItems={cart} />
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white py-4 text-center">
        <p>© 2025 สเต็กลุงหนวด. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default FoodMain;
