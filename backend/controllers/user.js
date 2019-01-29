const User = require('../models/user')
const { normalizeErrors } = require('../helpers/mongoose')
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

exports.auth = (req,res)=>{
    const {email,password} = req.body;

    if(!password || !email){
     return res.status(422).send({errors:[{title:'Data missing',detail:'Provide email and password'}]});
    }
    User.findOne({email},(err,user)=>{
        if(err){
            return res.status(422).send({errors:normalizeErrors(err.errors)});
        }
        if(!user){
            return res.status(422).send({errors:[{title:'Invalid User',detail:'User does not exist'}]});
        }
        if(user.hasSamePassword(password)){
          const token =   jwt.sign({
                userId:user.id,
                email:user.email
              }, config.secret, { expiresIn: '1h'});
              return res.json(token);
        }else{
            return res.status(422).send({errors:[{title:'Wrong data',detail:'Wrong email or password'}]});
        }
    });
}

exports.register = (req,res)=>{
const {FirstName,LastName,email,password} = req.body;

if(!password || !email){
 return res.status(422).send({errors:[{title:'Data missing',detail:'Provide email and password'}]});
}


User.findOne({email},(err,existingUser)=>{
    if(err){
        return res.status(422).send({errors:normalizeErrors(err.errors)});
    }
    if(existingUser){
        return res.status(422).send({errors:[{title:'Invalid email',detail:'User with this email is already exist'}]});
    }
    const user = new User({
        FirstName,LastName,email,password
    });
user.save((err)=>{
    if(err){
        return res.status(422).send({errors:normalizeErrors(err.errors)});
    }
    return res.json({'registered':true})
})
})
}

exports.authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const user = parseToken(token);

        User.findById(user.userId,function(err,user){
            if(err){
                return res.status(422).send({errors:normalizeErrors(err.errors)});
            }
            if(user){
                res.locals.user = user;
                next();
            }else{
                return res.status(422).send({errors:[{title:"Not authorized!",detail:'You need to login to access'}]});
            }
        })
    }else{
        return res.status(422).send({errors:[{title:"Not authorized!",detail:'You need to login to access'}]});
    }
}

function parseToken(token){
    return jwt.verify(token.split(' ')[1],config.secret);
}