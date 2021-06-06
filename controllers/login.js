const User = require('../models/register');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj'

const loginControl = async (req, res) => {
    const {email, password} = req.body;
    console.log(email);

    const user = await User.findOne({email}).lean();

    console.log(user);

    if(user) {
        if(await bcrypt.compare(password, user.password)){

       const token = jwt.sign({
           id: user._id,
       },
       JWT_SECRET
       )
       return res.json({ status: 'ok', data: token})
   }

   res.json({status: 'error', error: 'Invalid username/password'})
}
}

module.exports={loginControl, JWT_SECRET}