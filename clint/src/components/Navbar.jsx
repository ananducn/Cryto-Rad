import { useContext } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  return (
    <div className="p-5 sm:p-8 lg:px-20 flex justify-between items-center ">
      {/* logo */}
      <Link to={"/"}>
        <span className="text-white text-2xl sm:text-3xl">Crypto-Rad</span>
      </Link>

      {/* navbar */}
      <ul className="hidden sm:flex sm:gap-x-6 md:gap-x-10 lg:gap-x-20 ">
        <Link to={"/"}>
          <li className="text-white text-xl sm:text-2xl hover:scale-105 hover:text-gray-400">
            Home
          </li>
        </Link>
        <a href="">
          <li className="text-white text-xl sm:text-2xl hover:scale-105 hover:text-gray-400">
            Coins
          </li>
        </a>
        <a href="">
          <li className="text-white text-xl sm:text-2xl hover:scale-105 hover:text-gray-400">
            Price
          </li>
        </a>
      </ul>

      <div>
        {/* Option dropdown to select currency */}
        <div className="flex gap-x-1 sm:gap-x-3 border p-1 rounded-xl">
          <select
            onChange={currencyHandler}
            name="currency"
            className="text-xs sm:text-xl rounded-xl bg-transparent text-white px-1 hover:scale-105 hover:text-gray-400"
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
          </select>
          <button className="text-xs sm:text-xl rounded-xl bg-transparent text-white px-1 hover:scale-105 hover:text-gray-400">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
