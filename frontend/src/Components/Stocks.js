import { useEffect, useState } from "react";
import axios from "axios";
import Stock from "./Stock";

function Stocks() {
    const [stocks, setStocks] = useState([]);
    const [invalid, setInvalid] = useState("");
    const [stock, setStock] = useState({symbol:"", interval: 0});
    const [state, setState] = useState(false);
    const getStockDetails = (name, symbol, interval=5) => {
        setState(false);
        setStock({name: name, symbol:symbol, interval: interval})
        setTimeout(() => setState(true),1);
    }
    useEffect(() => {
        axios.post('http://localhost:3036/loadStocks')
        .then(res => {
            setStocks(res.data);
            setInvalid("");
        }).catch(setInvalid("cannot process your request"));
    },[])
    return(
        <div id="stockspage">
            <h3>Available Stocks</h3>
            <center><p className='invalid'>{invalid}</p></center>
            <div id='stocksdisplay'>
            <div id='stocks'>
            {stocks.map(item => (
                <div onClick = {() => getStockDetails(item.name, item.symbol)} className='stockItem'>
                    <span className="stockname">Name: {item.name}</span><span className="stocksymbol">Symbol: {item.symbol}</span>
                </div>
            ))}
            </div>
            <div>
                {state && <Stock stockDetails={stock}/>}
            </div>
            </div>
        </div>
    );
}
export default Stocks;