import { client, clientPromise } from "../../lib/mongodb";

const mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Succesful!");

    // define schema
    var HistorySchema = mongoose.Schema({
        nama: String,
        tanggal: Date,
        namaPenyakit: String,
        status: String
    });

    var History = mongoose.model('History', HistorySchema, 'history');

    var history1 = new History({
        nama: "Fulan",
        tanggal: Date("22/04/2022"),
        namaPenyakit: "TBC",
        status: "Terjangkit"
    });

    history1.save(function (err, history) {
        if (err) return console.error(err);
        console.log(history.name + " saved to history collectino")
    });
});