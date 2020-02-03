const router = require('express').Router();
const Users = require('../../data/models/userModel');

router.post('/register', async ( req, res ) => {
    let user = req.body;

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
                   res.status( 200 ).json( user );
               })
               .catch(err => {
                   res.status( 500 ).json({ err: "Invalid Login" }); 
               })
});

module.exports = router;