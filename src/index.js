const express = require('express');
const connectDB = require('./db/dbConnection');
const userRoutes = require('./routes/user.routes');
var request = require('request');

connectDB();
const app = express();

const PORT = 3000 || process.env.PORT;
app.use(express.json());
app.use(userRoutes);

app.listen(PORT, ()=>{
    console.log('Server is listning on http://127.0.0.1:'+PORT);
});

// var options = {
//   'method': 'GET',
//   'url': 'https://maps.googleapis.com/maps/api/directions/json?origin=31.3767437,74.184877&destination=31.3830851,74.1972888&key=AIzaSyCGsknFpbKkEneyVmQ0luBZwaHlv4V0KUE',
//   'headers': {
//   }
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });