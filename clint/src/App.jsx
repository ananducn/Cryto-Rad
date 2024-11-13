import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Coins } from "./pages/coins";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-700 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coins />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
