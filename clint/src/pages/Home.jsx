import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div>
      <div className="text-white flex flex-col items-center gap-y-4 sm:gap-y-6 md:gap-y-8 mt-5 sm:mt-7">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-y-2 sm:gap-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
            Crypto Marketplace
          </h1>
          <p className="text-sm sm:text-base md:text-lg">
            Welcome! Sign up to explore more.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={searchHandler} className="w-full sm:w-auto">
          <div className="flex items-center bg-white rounded-lg p-1 sm:p-2 md:p-3 gap-2">
            <input
              onChange={inputHandler}
              list="coinlist"
              value={input}
              type="text"
              placeholder="Search Crypto..."
              className="w-40 sm:w-60 md:w-72 lg:w-80 h-8 sm:h-10 px-3 text-sm sm:text-base text-gray-600 focus:outline-none rounded"
              required
            />

            <datalist id="coinlist">
              {allCoin.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
            </datalist>

            <button
              type="submit"
              className="text-white bg-gradient-to-b from-slate-900 to-slate-700 h-8 sm:h-10 px-4 rounded-md hover:scale-105 text-xs sm:text-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Coin List */}
      <div className="flex items-center justify-center">
        <div className="w-[90%] sm:w-[80%] lg:w-[70%] bg-slate-900 text-white mt-8 sm:mt-12 lg:mt-16 rounded-xl mb-8">
          {/* Header Row */}
          <div className="flex flex-wrap sm:flex-nowrap border-b border-gray-300 p-4 text-xs sm:text-sm md:text-base">
            <div className="w-3/12 sm:w-1/12 text-center">#</div>
            <div className="w-5/12 sm:w-3/12">Coins</div>
            <div className="w-4/12 sm:w-2/12">Price</div>
            <div className="w-4/12 sm:w-2/12 text-center">24h Change</div>
            <div className="w-5/12 sm:w-4/12 text-right">Market Cap</div>
          </div>

          {/* Data Rows */}
          {displayCoin.slice(0, 10).map((item, index) => (
            <Link
              to={`/coin/${item.id}`}
              key={index}
              className="flex flex-wrap sm:flex-nowrap items-center border-gray-300 p-4 sm:p-6 text-xs sm:text-sm md:text-base"
            >
              <div className="w-3/12 sm:w-1/12 text-center">
                {item.market_cap_rank}
              </div>
              <div className="w-9/12 sm:w-3/12 flex items-center gap-x-2">
                <img className="w-6 h-6 sm:w-8 sm:h-8" src={item.image} alt={item.name} />
                <span>
                  {item.name} - {item.symbol.toUpperCase()}
                </span>
              </div>
              <div className="w-3/12 sm:w-2/12">
                {currency.symbol} {item.current_price.toLocaleString()}
              </div>
              <div
                className={`w-3/12 sm:w-2/12 text-center ${
                  item.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </div>
              <div className="w-9/12 sm:w-4/12 text-right">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
