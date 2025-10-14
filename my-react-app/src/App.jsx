import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Properties from './pages/Properties.jsx'
import Details from "./pages/Details.jsx";
import "./App.css";

export default function App() {
  return (
    <> 
      <div className="app-layout">
        <Header />

        <main>
          <Routes>
            <Route path="/" element = {<Homepage />} />
            <Route path="properties" element = {<Properties />} /> 
            <Route path="properties/:id" element = {<Details />} />
          </Routes>          
        </main>      
        
        <Footer />
      </div>

    </>
  );
}