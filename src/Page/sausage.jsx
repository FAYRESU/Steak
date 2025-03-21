import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Ensure you have imported Link from react-router-dom
import Cart from './Cart';  // Import Cart component
import "bootstrap/dist/css/bootstrap.min.css";
import '../nb_shop.css'; // Make sure your CSS file is available

import porkrom from "../product_img/porkrom.png";
import urmansaikrok from "../product_img/urmansaikrok.png";
import ไส้กรอกชีส from "../product_img/ไส้กรอกชีส.jpg";
import Cartpng from "../product_img/Cartpng.png";

const Sausage = () => {
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

  return (
    <div>
      <header>
      </header>
      <header className="bg-dark text-white">
        <nav className="container navbar navbar-expand-lg navbar-dark py-3" >
          <a className="navbar-brand" href="#">สเต็กลุงหนวด</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
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
              {/* Product 1 */}
              <div className="col-md-3 product">
                <img src={porkrom} alt="Product 1 Image" width="150px" height="150px" />
                <h5>ไส้กรอกหมูรมควัน<br />$35</h5>

                {/* Toppings (Sauce Options) */}
                <div className="toppings">
                  <label>
                    <input type="checkbox" className="topping" value="tomato" data-price="5" onChange={(e) => handleToppingChange(e, 'Smoked Pork Sausage', 35)} /> ซอสมะเขือเทศ (+$5)
                  </label><br />
                  <label>
                    <input type="checkbox" className="topping" value="Mala" data-price="10" onChange={(e) => handleToppingChange(e, 'Smoked Pork Sausage', 35)} /> ซอสหม่าล่า (+$10)
                  </label><br />
                  <label>
                    <input type="checkbox" className="topping" value="Mayongnes" data-price="5" onChange={(e) => handleToppingChange(e, 'Smoked Pork Sausage', 35)} /> ซอสมายองเนส (+$5)
                  </label><br />
                </div>

                <button className="btn btn-primary" onClick={() => addToCart('Smoked Pork Sausage', 35, [])}>
                  Add to Cart
                </button>
              </div>

              {/* Product 2 */}
              <div className="col-md-3 product">
                <img src={urmansaikrok} alt="Product 2 Image" width="150px" height="150px" />
                <h5>ไส้กรอกเยอรมัน<br />$40</h5>

                {/* Toppings (Sauce Options) */}
                <div className="toppings">
                  <label>
                    <input type="checkbox" className="topping" value="tomato" data-price="5" onChange={(e) => handleToppingChange(e, 'German Bratwurst', 40)} /> ซอสมะเขือเทศ (+$5)
                  </label><br />
                  <label>
                    <input type="checkbox" className="topping" value="Mala" data-price="10" onChange={(e) => handleToppingChange(e, 'German Bratwurst', 40)} /> ซอสหม่าล่า (+$10)
                  </label><br />
                  <label>
                    <input type="checkbox" className="topping" value="Mayongnes" data-price="5" onChange={(e) => handleToppingChange(e, 'German Bratwurst', 40)} /> ซอสมายองเนส (+$5)
                  </label><br />
                </div>

                <button className="btn btn-primary" onClick={() => addToCart('German Bratwurst', 40, [])}>
                  Add to Cart
                </button>
              </div>

              {/* Product 3 */}
              <div className="col-md-3 product">
                <img src={ไส้กรอกชีส} alt="Product 1 Image" width="150px" height="150px" />
                <h5>ไส้กรอกชีส<br />$35</h5>

                {/* Toppings (Sauce Options) */}
                <div className="toppings">
                  <label>
                    <input type="checkbox" className="topping" value="tomato" data-price="5" onChange={(e) => handleToppingChange(e, 'Cheese Sausage', 35)} /> ซอสมะเขือเทศ (+$5)
                  </label><br />
                  <label>
                    <input type="checkbox" className="topping" value="Mala" data-price="10" onChange={(e) => handleToppingChange(e, 'Cheese Sausage', 35)} /> ซอสหม่าล่า (+$10)
                  </label><br />
                  <label>
                    <input type="checkbox" className="topping" value="Mayongnes" data-price="5" onChange={(e) => handleToppingChange(e, 'Cheese Sausage', 35)} /> ซอสมายองเนส (+$5)
                  </label><br />
                </div>

                <button className="btn btn-primary" onClick={() => addToCart('Cheese Sausage', 35, [])}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <h2 style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '1.75rem', color: '#9c4dcc' }}>
              Cart
              <img src={Cartpng} alt="Cartpng" className="img-fluid" width="34" height="34" style={{ marginTop: '-11px' }} />
            </h2>

            {/* Cart component */}
            <Cart cartItems={cart} />
          </div>
        </div>
      </div>

      <footer style={{ width: "1817px" }}>
        <p>&copy; 2025 Sausage Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Sausage;
