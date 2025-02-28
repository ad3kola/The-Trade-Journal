"use server";

import { Coin } from "@/lib/typings";

export const fetchAllCoins = async () => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
    );

    const allCoins: Coin[] = await res.json();

    const formattedData = allCoins.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
    }));

    const filteredData = formattedData.filter(
        coin => coin.symbol !== 'usdt' && coin.symbol !== 'usdc'
      );
    return filteredData;

  } catch (error) {
    console.error("Error fetchin coins: ", error);
    return []
  }
};

export default fetchAllCoins;
