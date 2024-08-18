const express = require('express');
const mongoose = require('mongoose');
const yahoo = require('yahoo-finance2').default;
const app = express();
const csv = require('csv-parser');
const {Readable} = require('stream');
const cors = require('cors');
const fetch = require('node-fetch');
const apikey = 'N9VRK3CAM2SKIYN3';
const stockurl = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apikey}`;
const url1 = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=15min&apikey=${apikey}`;
const dburl = "mongodb+srv://yaswanthpellakurusp:Yash1711@stock-market-app.eif9z.mongodb.net/?retryWrites=true&w=majority&appName=stock-market-app";

app.use(cors())
app.use(express.json());

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String,
    email: String,
    mobile: String
});

const stockSchema = new mongoose.Schema({
    name: String,
    symbol: String,
});

const watchListSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    symbol: String
});

const transactionsSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    date_of_trans: Date,
    stock: String,
    stock_symbol: String,
    debit: Number,
    credit: Number
})

const User = mongoose.model('users', userSchema);
const Stock = mongoose.model('stocks', stockSchema);
const Watchlist = mongoose.model('watchlists', watchListSchema);
const Transactions = mongoose.model('transactions', transactionsSchema);

async function register(fullname, username, password, email, mobile) {
    const euser = await User.findOne({username});
    if(euser) return false;
    await User.create({fullname, username, password, email, mobile});
    return true
}

async function login(username, password){
    const user = await User.findOne({ username });
    if(user) {
        if(user.password !== password) return false
        return true;
    }
    return false;
}

async function postStocks(){
    let res = await fetch(stockurl);
    let data = await res.text();
    let results = [];
    const readableStream = Readable.from(data);
    readableStream.pipe(csv()).on('data',(row)=>{
        results.push(row);
    }).on('end',() => {
    })
    for(let i of results) {
        let name = i.name;
        let symbol = i.symbol;
        let temp = await Stock.find({symbol});
        console.log(temp);
        if(temp.length==0) await Stock.create({name, symbol});
    }
}

let k = setInterval(() => postStocks(), 3600000); // update the data in stocks in mongodb in every 60 minutes

async function getStocks(){
    console.log("Fetching started");
    let r = await Stock.find(); 
    if(r.length==0) {
        await postStocks();
        r = await Stock.find();
    }
    console.log("Fetching finished");
    return r;
}

app.post('/userRegister', async (req, res) => {
    const { fullname, username, password, email, mobile} = req.body;
    const state = await register(fullname, username,password, email, mobile);
    return res.json(state);
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const state =  await login(username, password);
    return res.json(state);
})

app.post('/loadStocks', async (req,res) => {
    //const result = await getStocks();
    const result = [
        {
            symbol: "IBM", 
            name: "IBM Pvt Ltd"
        },
        {
            symbol: "GOGL", 
            name: "Google"
        },
        {
            symbol: "AMZ", 
            name: "Amazon"
        },
        {
            symbol: "IBM", 
            name: "IBM Pvt Ltd"
        },
        {
            symbol: "GOGL", 
            name: "Google"
        },
        {
            symbol: "AMZ", 
            name: "Amazon"
        },
        {
            symbol: "IBM", 
            name: "IBM Pvt Ltd"
        },
        {
            symbol: "GOGL", 
            name: "Google"
        },
        {
            symbol: "AMZ", 
            name: "Amazon"
        },
        {
            symbol: "IBM", 
            name: "IBM Pvt Ltd"
        },
        {
            symbol: "GOGL", 
            name: "Google"
        },
        {
            symbol: "AMZ", 
            name: "Amazon"
        }
    ]
    return res.json(result);
})

app.post('/loadstock', async (req, res) => {
    console.log("data fetching started")
    let {symbol, interval} = req.body;
    console.log(symbol);
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&apikey=${apikey}`;
    let result = await fetch(url);
    let data = await result.json();
    if(data.length>0) 
        {
            return res.json(data)
        }
    return res.json(false);
})
app.listen(3036, () => {
    console.log("Listening at port 3036...");
})