const express = require('express');
const Hero = require('../models/heros');

const router = express.Router();


router.route('/')
.get((req, res, next) => {
    Hero.find({})
    .then((heros) => {
        res.json(heros);
    }).catch((err) => next(err));
})

.post((req,res, next) => {
    Hero.create(req.body)
    .then((hero) => {
        res.stausCode = 201;
        res.json(hero);
    }).catch(next);
})

.put ((req,res) => {
    res.stausCode=405;
    res.json({message: `Method not supported.`});
})
.delete((req,res, next) => {
    Hero.deleteMany({})
    .then((response) => {
        res.json(response);
    }).catch(next);
});

router.route('/:id')
.get((req,res, next)=> {
    Hero.findById(req.params.id)
    .then((hero) => {
        if(hero == null) throw new Error ("Sorry! hero not found.")
        res.json(hero);
    }).catch(next);
})

.post((req,res) => {
    res.statusCode= 405;
    res.json({message: "This method is not allowes."});
})

.put((req,res, next) => {
    Hero.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true})
    .then((reply) => {
        if(reply == null) throw new Error ("Sorry! Hero not found for update.")
        res.json(reply);
    }).catch(next);
})

.delete((req,res, next)=> {
    Hero.findOneAndDelete(req.params.id)
    .then((result) => {
        if(result == null) throw new Error ("Sorry! Hero not found.")
        res.json(result);
    }).catch(next);
});

//PERTICULAR TASK KO ASSOCIATED NOTES

router.route('/:id/comments')
    .get((req,res,next) => {
        Hero.findById(req.params.id)
            .then((hero) => {
                if(hero == null) throw new Error ("Sorry! Hero not found.")
                res.json(hero.comments);
            })
            .catch(next);
    })

    .post((req,res,next) => {
        Hero.findById(req.params.id)
            .then((hero) => {
                hero.comments.push(req.body);
                hero.save()
                    .then((hero) => {
                        res.json(hero.comments);
                    })
                    .catch(next);
            })
            .catch(next);

    })

    .put((req,res) => {
        res.stausCode=405;
        res.json({message: `Method not supported.`});        
    })

    .delete((req,res,next) => {
        Hero.findById(req.params.id)
        .then((hero) => {
            hero.comments = [];
            hero.save()
                .then((hero) => {
                    res.json(hero.comments);
                })
                .catch(next);
        })
        .catch(next);
    });
    
//specific task ko specific notes

    router.route('/:id/comments/:cid')

    .get((req, res, next) => {
        Hero.findById(req.params.id)
        .then((hero)=>{
            let comment=hero.comments.id(req.params.cid);
            res.json(comment);
        })
        .catch(next);
    })
    .post((req,res) => {
        res.stausCode=405;
        res.json({message: `Method not supported.`});   
    })
    .put((req,res,next) => {
        Hero.findById(req.params.id)
        .then((hero) => {
            let comment = hero.comments.id(req.params.cid);
            comment.comment = req.body.comment;
            hero.save()
            .then(() => {
                res.json(comment);
            })
            .catch(next);
        })
        .catch(next);
    })
    .delete((req,res,next) => {
        Hero.findById(req.params.id)
        .then((hero) => {
            hero.comments.pull(req.params.cid);
            hero.save()
                .then((hero) => {
                    res.json(hero.comments);
                })
                .catch(next);
        })
        .catch();
    });
module.exports = router;