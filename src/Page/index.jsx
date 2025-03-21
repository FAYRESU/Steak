import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the custom CSS file for styles


const Index = () => {
  return (
    <div>
      {/* Navigation */}
      <header className="bg-dark text-white">
        <nav className="navbar navbar-expand-lg navbar-dark py-3">
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
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <img src="./src/product_img/se3.png" className="card-img-top" alt="เมนูยอดนิยม" />
              <div className="card-body">
                <h5 className="card-title">เมนูยอดนิยม</h5>
                <Link to="/viralfood" className="btn btn-primary w-100">Read More <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <img src="./src/product_img/jan.png" className="card-img-top" alt="อาหารจานหลัก" />
              <div className="card-body">
                <h5 className="card-title">อาหารจานหลัก</h5>
                <Link to="/Foodmain" className="btn btn-primary w-100">Read More <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <img src="./src/product_img/salad1.png" className="card-img-top" alt="สลัด" />
              <div className="card-body">
                <h5 className="card-title">สลัด</h5>
                <Link to="/salad" className="btn btn-primary w-100">Read More <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <img src="./src/product_img/tanlan.png" className="card-img-top" alt="อาหารทานเล่น" />
              <div className="card-body">
                <h5 className="card-title">อาหารทานเล่น</h5>
                <Link to="/snack" className="btn btn-primary w-100">Read More <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <img src="./src/product_img/saikrok.png" className="card-img-top" alt="ไส้กรอก" />
              <div className="card-body">
                <h5 className="card-title">ไส้กรอก</h5>
                <Link to="/sausage" className="btn btn-primary w-100">Read More <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <img src="./src/product_img/drink.png" className="card-img-top" alt="เครื่องดื่ม" />
              <div className="card-body">
                <h5 className="card-title">เครื่องดื่ม</h5>
                <Link to="/drink" className="btn btn-primary w-100">Read More <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form container">
        <h3 className="text-center text-white">ติดต่อเรา</h3>
        <form>
          <input type="text" placeholder="ชื่อของคุณ" required />
          <input type="email" placeholder="อีเมล์ของคุณ" required />
          <textarea placeholder="ข้อความของคุณ" required></textarea>
          <button type="submit">ส่งข้อความ</button>
        </form>
      </div>

      {/* Testimonials Section */}
      <div className="testimonial-section">
        <div className="container">
          <h3 className="text-center text-white mb-5">ความคิดเห็นจากลูกค้า</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-card">
                <h5>คุณสมบัติ</h5>
                <p>อาหารอร่อย บริการดีมาก แนะนำเลย!</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <h5>คุณปุ๊ก</h5>
                <p>บรรยากาศดีมาก อาหารอร่อย ราคาไม่แพง</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <h5>คุณน้อย</h5>
                <p>ทุกเมนูอร่อยมาก ประทับใจมากๆ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>© 2025 สเต็กลุงหนวด. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
