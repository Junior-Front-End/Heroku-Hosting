// ---------------------------------------------
//                   IMPORTS
// ---------------------------------------------
const express = require('express');
const app = express();
// request
const request = require('request')
const rp = require('request-promise')
const cheerio = require('cheerio')


// ---------------------------------------------
//                   FUNCTION
// ---------------------------------------------
async function webScrap(x) {

  var options = {
    uri: x.url,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  let $ = await rp(options)

  let obj = {
    title: $(x.q1).text(),
    price: $(x.q2).text()
  }

  return obj

}


// ---------------------------------------------
//          app.get
// ---------------------------------------------
app.get('/', async function (req, res) {

  // mesghal 
  var mesghaletala = await webScrap({
    url: 'https://www.tgju.org/',
    q1: 'body.homepage #l-mesghal h3',
    q2: 'body.homepage #l-mesghal .info-price'
  }).catch(err => console.log(err))

  // gram18  
  var gram18 = await webScrap({
    url: 'https://www.tgju.org/profile/geram18',
    q1: 'h1',
    q2: '.fs-cell:nth-of-type(3) span.value > span[data-col="info.last_trade.PDrCotVal"]'
  }).catch(err => console.log(err))

  // send
  res.send(` 
    <div style="direction:rtl; margin:3em"> 
      <table style="width:400px;text-align:right">
          <tbody>
              <tr> <th>عنوان</th> <th>قیمت</th> </tr>
          </tbody>
          <tbody>
              <tr> <td>${mesghaletala.title}</td><td>${mesghaletala.price}</td></tr>
              <tr> <td>${gram18.title}</td><td>${gram18.price}</td></tr>
          </tbody>
      </table>
    </div>
    `)


});

// ---------------------------------------------
//                server 
// ---------------------------------------------
app.listen(process.env.PORT || 5000);