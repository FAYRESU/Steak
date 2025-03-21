import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Ensure you have imported Link from react-router-dom
import Cart from './Cart';  // Import Cart component
import '../nb_shop.css'; // Ensure your CSS file is available

// Import รูปภาพให้ React รองรับ
import นักเก็ต from "../product_img/นักเก็ต.png";
import เฟรนฟราย from "../product_img/เฟรนฟราย.png";
import ปังเนยยม from "../product_img/ปังเนยยม.png";
import ปังเนยน้ำตาล from "../product_img/ปังเนยน้ำตาล.png";
import ปังเนยแยม from "../product_img/ปังเนยแยม.png";
import ปังเนยช็อค from "../product_img/ปังเนยช็อค.png";
import ปังเนยกระเทียม from "../product_img/ปังเนยกระเทียม.jpg";
import ปังเนย from "../product_img/ปังเนย.jpg";
import มันบดเกรวี่ from "../product_img/มันบดเกรวี่.png";
import Cartpng from "../product_img/Cartpng.png";

const Snack = () => {
  const [cart, setCart] = useState([]);  // Initialize cart state
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
      id: 'Nuggrst',
      name: 'นักเก็ต',
      price: 45,
      imgSrc: นักเก็ต, // Use imported image here
    },
    {
      id: 'French Fries',
      name: 'มันฝรั่งทอด',
      price: 35,
      imgSrc: เฟรนฟราย, // Use imported image here
    },
    {
      id: 'Sweet Milk Toast',
      name: 'ขนมปังเนย + นม',
      price: 12,
      imgSrc: ปังเนยยม, // Use imported image here
    },
    {
      id: 'Sugar Toast',
      name: 'ขนมปังเนย + น้ำตาล',
      price: 12,
      imgSrc: ปังเนยน้ำตาล, // Use imported image here
    },
    {
      id: 'Jam Toast',
      name: 'ขนมปังเนย + แยม',
      price: 12,
      imgSrc: ปังเนยแยม, // Use imported image here
    },
    {
      id: 'Chocolate Toast',
      name: 'ขนมปังเนย + ช็อคโกแลต',
      price: 12,
      imgSrc: ปังเนยช็อค, // Use imported image here
    },
    {
      id: 'Garlic Toast',
      name: 'ขนมปังเนยกระเทียม',
      price: 10,
      imgSrc: ปังเนยกระเทียม, // Use imported image here
    },
    {
      id: 'Butter Toast',
      name: 'ขนมปังเนย',
      price: 10,
      imgSrc: ปังเนย, // Use imported image here
    },
    {
      id: 'Mashed Potatoes With Gravy',
      name: 'มันบดเกรวี่',
      price: 25,
      imgSrc: มันบดเกรวี่, // Use imported image here
    }
  ];
  
  return (
    <div>
      <header>
      </header>
      <header className="bg-dark text-white">
        <nav className="container navbar navbar-expand-lg navbar-dark py-3">
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
              {products.map((product) => (
                <div key={product.id} className="col-md-3 product">
                  <img src={product.imgSrc} alt={product.name} width="150px" height="150px" />
                  <h5>{product.name} ${product.price}</h5>

                  {/* Toppings (if needed) */}
                  <div className="toppings">
                    {/* You can add toppings here like in Sausage.jsx if needed */}
                  </div>

                  <button
                    className="btn btn-primary add-to-cart"
                    onClick={() => addToCart(product.name, product.price, [])}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-3">
           <h2 style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '1.75rem', color: '#9c4dcc' }}>
                         Cart
                         <img src={Cartpng} alt="Cartpng" className="img-fluid" width="34" height="34" style={{ marginTop: '-11px' }} />
                       </h2>

            {/* Use the Cart component to display the cart items */}
            <Cart cartItems={cart} />
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white py-4 text-center">
        <p>© 2025 สเต็กลุงหนวด. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Snack;
