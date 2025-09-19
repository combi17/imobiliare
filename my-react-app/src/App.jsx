import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Properties from './pages/Properties.jsx'
import Details from "./pages/Details.jsx";

export default function App() {
  return (
    <>  
      <Header />

      <Routes>
        <Route path="/" element = {<Homepage />} />
        <Route path="proprietati" element = {<Properties />} /> 
        <Route path="details" element = {<Details />} />
      </Routes>

      <Footer />
    </>
  );
}