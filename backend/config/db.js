/*

Database Connection

*/

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/mj_widgets");

const conn = mongoose.connection;

conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', function(){
    console.error.bind(console, 'connection error:');
});

module.exports = conn;