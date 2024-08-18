import React,{useEffect, useState} from "react";
import Chart from "./Chart";
import axios from 'axios';

function Stock(stockDetails){
  const [items, setItems] = useState({});
  var stock = {name:stockDetails.stockDetails.name};
  useEffect( () => {
    stock = stockDetails.stockDetails;
    let symbol = stock.symbol;
    let interval = stock.interval;
    axios.post("http://localhost:3036/loadstock", {symbol, interval}).then(res => {
     setItems(res.data);
    }).catch(err => {
      console.log(err)
    });
  }, [])
  const addWatchlist = (name, symbol) => {

  }
  return(
    <div>
      <h3>{stock.name}</h3>
      <div id="chart">
        <span>current value: {items['2024-08-32']}</span>
        <button id='watchlistb' onClick={() => addWatchlist(stock.name, stock.symbol)}>Add to Watchlist</button>
        <Chart items={items}/>
      </div>
    </div>
  )
}
export default Stock;