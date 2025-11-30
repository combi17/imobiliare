import React from 'react';
import { Routes, Route } from "react-router-dom";

import Homepage from './pages/Homepage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Properties from './pages/Properties.jsx'
import Details from "./pages/Details.jsx";
import Contact from "./pages/Contact.jsx";
import Despre from "./pages/Despre.jsx";

import "./App.css";

export default function App() {
  return (
    <>
      <div className="app-layout">
        <Header/>
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<Details />} />
            <Route path="contact" element={<Contact />} />
            <Route path="despre" element={<Despre />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}