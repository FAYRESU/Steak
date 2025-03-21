import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the custom CSS file for styles

// Import รูปภาพให้ React รองรับ
import se3 from "../product_img/se3.png";
import jan from "../product_img/jan.png";
import salad1 from "../product_img/salad1.png";
import tanlan from "../product_img/tanlan.png";
import saikrok from "../product_img/saikrok.png";
import drink from "../product_img/drink.png";

// เก็บข้อมูลเมนูไว้ในอาร์เรย์
const menuItems = [
  { img: se3, title: "เมนูยอดนิยม", link: "/popular" },
  { img: jan, title: "อาหารจานหลัก", link: "/Foodmain" },
  { img: salad1, title: "สลัด", link: "/salad" },
  { img: tanlan, title: "อาหารทานเล่น", link: "/snack" },
  { img: saikrok, title: "ไส้กรอก", link: "/sausage" },
  { img: drink, title: "เครื่องดื่ม", link: "/drink" }
];

const Index = () => {
  return (
    <div>
      {/* Navigation */}
      <header className="bg-dark text-white">
        <nav className="navbar navbar-expand-lg navbar-dark py-3 container">
          <a className="navbar-brand" href="#">สเต็กลุงหนวด</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row">
          {/* Cards for categories */}
          {menuItems.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card shadow-sm border-0">
                <img src={item.img} className="card-img-top img-fluid" alt={item.title} />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.title}</h5>
                  <Link to={item.link} className="btn btn-primary w-100">Read More <i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container py-5 bg-dark text-white text-center">
        <h3>ติดต่อเรา</h3>
        <form className="w-75 mx-auto">
          <input type="text" placeholder="ชื่อของคุณ" className="form-control my-2" required />
          <input type="email" placeholder="อีเมล์ของคุณ" className="form-control my-2" required />
          <textarea placeholder="ข้อความของคุณ" className="form-control my-2" required></textarea>
          <button type="submit" className="btn btn-primary w-100">ส่งข้อความ</button>
        </form>
      </div>

      {/* Testimonials Section */}
      <div className="container py-5">
        <h3 className="text-center text-dark mb-5">ความคิดเห็นจากลูกค้า</h3>
        <div className="row">
          {[
            { name: "คุณสมบัติ", comment: "อาหารอร่อย บริการดีมาก แนะนำเลย!" },
            { name: "คุณปุ๊ก", comment: "บรรยากาศดีมาก อาหารอร่อย ราคาไม่แพง" },
            { name: "คุณน้อย", comment: "ทุกเมนูอร่อยมาก ประทับใจมากๆ" }
          ].map((review, index) => (
            <div key={index} className="col-md-4 col-sm-12 mb-4">
              <div className="card p-3 shadow-sm text-center">
                <h5>{review.name}</h5>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>© 2025 สเต็กลุงหนวด. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
