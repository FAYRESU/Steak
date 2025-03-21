import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// ฟังก์ชันพิมพ์ใบเสร็จ
function printReceipt(title, content) {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>ร้าน Steaklungnuad</h2>
        <p style="text-align: center;">ถนนราชดำเนิน(ถ.ต้นสน) พระปฐมเจดีย์ เมืองนครปฐม</p>
        <table>
          <thead>
            <tr>
              <th>สินค้า</th>
              <th>ท็อปปิ้ง</th>
              <th>จำนวน</th>
              <th>ราคา</th>
              <th>รวม</th>
            </tr>
          </thead>
          <tbody>
            ${content}
          </tbody>
        </table>
        <p style="text-align: center; margin-top: 20px;">ขอบคุณที่ใช้บริการ!</p>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// ฟังก์ชันสร้างใบเสร็จ
function generateCartReceipt(cart) {
  return (
    cart
      .map(
        (item) => `
      <tr>
        <td>${item.product}</td>
        <td>${Array.isArray(item.toppings) ? item.toppings.join(", ") : "No toppings"}</td>
        <td>${item.quantity}</td>
        <td>฿${item.price}</td>
        <td>฿${item.quantity * item.price}</td>
      </tr>
    `
      )
      .join("") +
    `
    <tr>
      <td colspan="4" style="text-align: right; font-weight: bold;">รวมทั้งหมด</td>
      <td>฿${cart.reduce((acc, item) => acc + item.quantity * item.price, 0)}</td>
    </tr>
  `
  );
}

const Cart = ({ cartItems }) => {
  const [cart, setCart] = useState([]);
  const scrollRef = useRef(null);

  // โหลดข้อมูลตะกร้าจาก localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [cartItems]);

  // เพิ่มสินค้าโดยไม่ให้หน้าจอขยับ
  const addToCart = (newItem) => {
    const currentScrollY = window.scrollY; // เก็บตำแหน่งการเลื่อน
    setCart((prevCart) => {
      const updatedCart = [...prevCart, newItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    setTimeout(() => {
      window.scrollTo(0, currentScrollY); // คืนค่าตำแหน่งเดิม
    }, 0);
  };

  // ลบสินค้า
  const deleteFromCart = (cartKey) => {
    const updatedCart = cart.filter((item) => item.key !== cartKey);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // พิมพ์ใบเสร็จและเคลียร์ตะกร้า
  const handlePrintReceipt = () => {
    printReceipt("Steaklungnuad Receipt", generateCartReceipt(cart));
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="container mt-4">
      <h2>ตะกร้าสินค้า</h2>
      {cart.length === 0 ? (
        <p className="text-center">ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div>
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>สินค้า</th>
                <th>ท็อปปิ้ง</th>
                <th>จำนวน</th>
                <th>ราคา</th>
                <th>รวม</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.productId || item.key || item.product}>
                  <td>{item.product}</td>
                  <td>{Array.isArray(item.toppings) ? item.toppings.join(", ") : "No toppings"}</td>
                  <td>{item.quantity}</td>
                  <td>฿{item.price}</td>
                  <td>฿{item.quantity * item.price}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteFromCart(item.key)}>
                      <i className="fa-solid fa-trash-can"></i> ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-end fw-bold">
            รวมทั้งหมด: ฿
            {cart.reduce((acc, item) => acc + item.quantity * item.price, 0)}
          </p>
          <button className="btn btn-primary w-100" onClick={handlePrintReceipt}>
            พิมพ์ใบเสร็จ
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
