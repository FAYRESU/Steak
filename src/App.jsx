import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Index from "./Page/index";
import DrinkPage from "./Page/DrinkPage"; // Assuming you already have this page created
import Foodmain from "./Page/Foodmain"; // You need to create this page
import ViralFood from "./Page/viralfood"; // You need to create this page
import Salad from "./Page/salad"; // You need to create this page
import Snack from "./Page/snack"; // You need to create this page
import Sausage from "./Page/sausage"; // You need to create this page
import "./main_index.css";
import "./animate.css";

// คอมโพเนนต์หลัก App
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/drink" element={<DrinkPage />} />
      <Route path="/foodmain" element={<Foodmain />} />
      <Route path="/viralfood" element={<ViralFood />} />
      <Route path="/salad" element={<Salad />} />
      <Route path="/snack" element={<Snack />} />
      <Route path="/sausage" element={<Sausage />} />
    </Routes>
  </Router>
);

export default App;
