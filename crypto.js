const cheerio = require("cheerio");
const request = require("request");

let cmc = `https://coinmarketcap.com`;
let lcw = `https://www.livecoinwatch.com`;

let linksArr = [];
let cryptoData = [];
let idc = 0;

// request(cmc,cb1);
request(lcw, cb2);

function cb2(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        livecoinwatch(html);
    }
}


function livecoinwatch(html) {
    let extracter = cheerio.load(html);
    let rows = extracter(".lcw-table-container.main-table tbody tr a");
    for (let i = 0; i < 30; i++) {
        let links = extracter(rows[i]).attr(`href`);
        if (links != undefined) {
            linksArr.push(`https://www.livecoinwatch.com` + links);
        }
    }
    for (let i = 0; i < linksArr.length; i++) {
        request(linksArr[i], cb3);

    }
}

function cb3(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        getCoin(html);
    }
}


function getCoin(html, ind) {
    let obj = {}
    let extracter = cheerio.load(html);
    let otherData = extracter(".price.no-grow")
   
    obj.name = extracter(".coin-name").text()
    obj.price =  extracter(".cion-item.coin-price-large").text()
    obj.marketCap0 = extracter( otherData[7]).text()
    obj.volume1 = extracter( otherData[8]).text()
    obj.vol2 = extracter( otherData[2]).text()
    obj.totalCap3 = extracter( otherData[3]).text()
    obj.allTimeHigh4 = extracter( otherData[6]).text()
    obj.totalSupply7 = extracter( otherData[7]).text()
    obj.maxSupply6 = extracter( otherData[6]).text()
    obj.maxSuply9 = extracter( otherData[9]).text()
    obj.maxSupply10 = extracter( otherData[10]).text()
    obj.maxSuply8 = extracter( otherData[8]).text()


    cryptoData.push(obj)
    idc++
    if (idc == 15) {
        console.log(cryptoData)
    }

}



