const registerSchema = require('../models/register');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const login = require('../controllers/login');



const createUser = async (req, res) => {

    const password = await bcrypt.hash(req.body.password, 10);


    const user = new registerSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password
    })

    user.save().then(() => {
        console.log('User Created');
        res.status(200).json({message: 'User Created'});
    }).catch((err) => {
        res.status(500).json({message: err})
    })

}

const getUserProfile = (req, res) => {
    jwt.verify(req.token, login.JWT_SECRET, function(err, data){
        if(err){
            res.status(403)
        } else{
        registerSchema.find({_id: req.params.id}, (err, results) => {
            if(err){
                console.log(err);
                res.status(500).json({message: err});
            }else {
                res.status(200).json(results)
            }
        });
    }
    })
    
}

const updateUserProfile = async (req, res) => {
    const userUpdate = await registerSchema.findOneAndUpdate({_id: req.params.id},{
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }
    }, {new: true})

    if(userUpdate) {
        res.status(200).json({message: 'Successfully Updated'});
    } else {
        res.status(500).json({message: 'Could not update'});
    }
};

module.exports = {createUser, getUserProfile, updateUserProfile}