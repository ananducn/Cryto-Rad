import { createContext, useEffect, useState } from "react";

// Context to manage global coin and currency data
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  
  // State for selected currency, defaulting to USD
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  // Fetches all coin data based on selected currency
  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-eqhGQ3wMpYQweGBwfUwbaEoW", // Demo API key; replace if using a different one
      },
    };

    // API call to fetch coins data; sets state with the response
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoin(res)) 
      .catch((err) => console.error(err)); // Logs any errors from the API
  };

  // Triggers data fetch whenever `currency` changes
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
