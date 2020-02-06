const router = require('express').Router();
const Users = require('../../data/models/userModel');

const { generateHash, generateToken } = require( '../../middleware/auth' );

router.post('/register', async ( req, res ) => {
    const user = req.body;

    user.password = generateHash( user.password );

    await Users.add(user)
                 .then(user => {
                     res.status( 201 ).json( user );
                 })
                 .catch(err => {
                    if( err.errno === 19 ) res.status( 400 ).json({ err: "Email Already Exists" });
                    else 
                    res.status( 400 ).json( err );
                 });
});

router.post('/login', async ( req, res ) => {
    let { email, password } = req.body;

    await Users.getBy({ email })
               .then(user => {

                    if(user && user.password === generateHash(password)) {
                        const token = generateToken({ email, id: user.id })

                        res.status( 200 ).json({ id: user.id, token, message: `Welcome ${user.email}` });
                    }
                    else {
                        res.status(401).json({ message: 'Invalid Credentials' });
                    }
                    
               })
               .catch(err => {
                   res.status( 500 ).json({ err: "Invalid Login" }); 
               })
});

module.exports = router;