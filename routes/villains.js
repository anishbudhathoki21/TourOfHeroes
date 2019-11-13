const express = require('express');
const Villain = require('../models/villains');

const router = express.Router();

router.route('/')
.get((req,res,next) => {
    Villain.find({})
    .then((villains) => {
        res.json(villains);
    })
    .catch(next);
})
.post((req,res,next) => {
    Villain.create(req.body)
    .then((villain) => {
        res.json(villain);
    })
    .catch(next);
})
.put((req,res) => {
    res.statusCode=405;
    res.send("THIS METHOD IS NOT ALLOWED HERE !!");
})
.delete((req,res,next) => {
    Villain.deleteMany({})
    .then((response) => {
        res.json(response);
    })
    .catch(next);
});

router.route('/:id')
.get((req,res,next) => {
    Villain.findById(req.params.id)
    .populate({
        path:'fights',
        select:'name'
    })
    .then((villain) => {
        res.json(villain);
    })
    .catch(next);
})
.post((req, res) => {
    res.statusCode = 405;
    res.send('THIS METHOD IS NOT ALLOWED HERE !!');
})
.put((req,res,next) => {
    Villain.findByIdAndUpdate(req.params.id, {$set: req.body }, {new:true})
    .then((reply) => {
        res.json(reply);
    })
    .catch(next);
})
.delete((req,res,next) => {
    Villain.findByIdAndDelete(req.params.id)
    .then((response) => {
        res.json(response);
    })
    .catch(next);
});


module.exports = router;
