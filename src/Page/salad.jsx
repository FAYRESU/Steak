import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import "../nb_shop.css";

import salagfish from "../product_img/salagfish.png";
import tunasalad from "../product_img/tunasalad.png";
import salad1 from "../product_img/salad1.png";
import porksalad from "../product_img/porksalad.jpg";
import chickensalad from "../product_img/chickensalad.jpg";
import Cartpng from "../product_img/Cartpng.png";

const SaladPage = () => {
  const [cart, setCart] = useState([]);
  const [toppings, setToppings] = useState({});

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (product, price, selectedToppings) => {
    const toppingsPrice = selectedToppings.reduce((acc, topping) => acc + parseFloat(topping.price), 0);
    const totalPrice = price + toppingsPrice;
    const cartKey = `${product}-${selectedToppings.map((t) => t.name).join(",")}`;

    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((item) => item.key === cartKey);

    if (existingItemIndex === -1) {
      updatedCart.push({
        key: cartKey,
        product,
        price: totalPrice,
        toppings: selectedToppings.map((t) => t.name),
        quantity: 1,
      });
    } else {
      updatedCart[existingItemIndex].quantity++;
    }

    updateCart(updatedCart);
  };

  const handleToppingChange = (event, product, price) => {
    const toppingName = event.target.value;
    const toppingPrice = parseFloat(event.target.dataset.price);

    setToppings((prevToppings) => {
      const newToppings = event.target.checked
        ? [...(prevToppings[product] || []), { name: toppingName, price: toppingPrice }]
        : prevToppings[product].filter((topping) => topping.name !== toppingName);

      addToCart(product, price, newToppings);
      return { ...prevToppings, [product]: newToppings };
    });
  };

  return (
    <div>
      <header className="bg-dark text-white">
        <nav className="container navbar navbar-expand-lg navbar-dark py-3">
          <a className="navbar-brand" href="#">สเต็กลุงหนวด</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
              {[{
                name: "สลัดปลาทอด", price: 70, img: salagfish
              }, {
                name: "สลัดทูน่า", price: 50, img: tunasalad
              }, {
                name: "สลัดผัก", price: 40, img: salad1
              }, {
                name: "สลัดหมู", price: 55, img: porksalad
              }, {
                name: "สลัดไก่", price: 50, img: chickensalad
              }].map(({ name, price, img }) => (
                <div key={name} className="col-md-3 product">
                  <img src={img} alt={name} width="150px" height="150px" />
                  <h5>{name}<br />฿{price}</h5>
                  <div className="toppings">
                    <label>
                      <input type="checkbox" value="ชีส" data-price="10" onChange={(e) => handleToppingChange(e, name, price)} /> ชีส (+฿10)
                    </label><br />
                    <label>
                      <input type="checkbox" value="อะโวคาโด" data-price="15" onChange={(e) => handleToppingChange(e, name, price)} /> อะโวคาโด (+฿15)
                    </label>
                  </div>
                  <br />
                  <button className="btn btn-primary" onClick={() => addToCart(name, price, [])}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-3">
             <h2 style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '1.75rem', color: '#9c4dcc' }}>
                          Cart
                          <img src={Cartpng} alt="Cartpng" className="img-fluid" width="34" height="34" style={{ marginTop: '-11px' }} />
                        </h2>
            <Cart cartItems={cart} />
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white py-4 text-center" style={{ width: "1817px" }}>
        <p>© 2025 สเต็กลุงหนวด. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default SaladPage;
