const express = require("express");
const app = express();
const PORT=3000;

const mongoose = require("mongoose");
const url ='mongodb://localhost:27017/tohdb';

const heroRouter = require('./routes/heros');
const villainRouter = require('./routes/villains');

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
.then((db) => {
    console.log("connection successfull !!");
}, (err) => console.log(err));

app.use(express.json());

app.use('/heros', heroRouter);
app.use('/villains', villainRouter);

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.statusCode = 500;
    //res.send("Something is wrong");
    res.json({message: err.message});
});
//Creating Schema
// const heroSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     desc : {
//         type:String,
//         require:true
//     }
// }, {timestamps:true});

// //Creating Model for Heros
// const Hero = mongoose.model('Hero', heroSchema);

//Creating HEROS Routes
//getting all heros
// app.get("/heros", (req,res) => {
//     Hero.find({})
//     .then((heros) => {
//         res.json(heros);
//     });
// });

// //creating new hero
// app.post("/heros", (req,res) => {
//     Hero.create(req.body)
//     .then((hero) => {
//         res.statusCode = 201;
//         res.json(hero);
//     })
// })

// //Updating hero

// app.put("/heros", (req,res) => {
//     res.statusCode = 405;
//     res.send("This method is not allowed.");
// });

// //delete all heros
// app.delete("/heros", (req,res) => {
//     Hero.deleteMany({})
//     .then((result) => {
//         res.json(result);
//     });
// });

// // for route /heros/:id

// app.get('/heros/:id', (req,res) => {
//     Hero.findById(req.params.id)
//     .then((hero) => {
//         res.json(hero);
//     });
// });

// app.post('/heros/:id', (req,res) => {
//     res.statusCode= 405;
//     res.send("This method is not allowed.");
// })

// app.put("/heros/:id", (req,res) => {
//     Hero.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true})
//     .then((reply) => {
//         res.json(reply);
//     });
// });

// app.delete("/heros/:id", (req,res) => {
//     Hero.findByIdAndDelete(req.params.id)
//     .then((response) => {
//         res.json(response);
//     })
//     .catch((err)=>{
//         res.json(err)
//     });
// });

app.listen(PORT, () => {
    console.log(`Application is running at localhost:${PORT}`)
});


