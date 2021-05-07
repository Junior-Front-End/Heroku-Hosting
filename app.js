// ---------------------------------------------
//                   IMPORTS
// ---------------------------------------------
const app = require('express')();  

// ---------------------------------------------
//          app.get
// ---------------------------------------------
app.get('/', function (req, res) {

  // send
  res.send(`
    <div>
      <h1 style="color: lightgray">Hello Heroku! ;)</h1>
      <h3 style="color:red">Yoohoo!!!</h3>
      <p style="color: darkblue">This is my first app in Heroku!</p>
    </div>
  `)

});

// ---------------------------------------------
//                server 
// ---------------------------------------------
app.listen(process.env.PORT || 5000);