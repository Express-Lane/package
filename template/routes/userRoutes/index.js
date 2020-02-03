const router = require( 'express' ).Router();
const Users = require( '../../data/models/userModel' );

router.get( '/', async ( req, res ) => {
    await Users.getAll()
               .then(users => {
                   res.status( 200 ).json( users );
               })
               .catch(err => {
                   res.status( 500 ).json({ err });
               });
});

router.get( '/:id', async ( req, res ) => {
    if( !req.params.id ) res.status(400).json({ err: "Missing ID" });

    const { id } = req.params;

    await Users.getBy({ id })
               .then(user => {
                   res.status( 200 ).json( user );
               })
               .catch(err => {
                    res.status( 500 ).json({ err });
                });
});

router.put( '/:id', async ( req, res ) => {
    if( !req.params.id || !Object.keys(req.body).length ) res.status(400).json({ err: "Missing ID or Update Value" });

    const update = req.body;
    const { id } = req.params;

    await Users.edit( id, update )
               .then( updatedUser => {
                   res.status( 200 ).json( updatedUser );
               })
               .catch(err => {
                    res.status( 500 ).json({ err });
                });
});

router.delete( '/:id', async ( req, res ) => {
    if( !req.params.id ) res.status(400).json({ err: "Missing ID" });

    const { id } = req.params;

    await Users.remove( id )
               .then( success => {
                   if( success ) res.status( 200 ).json({ "success": `User with ID:${id} removed` });
                   else res.status( 404 ).json({ "fail": `User with ID:${id} not found` })
               })
               .catch(err => {
                    res.status( 500 ).json({ err });
                });
});

module.exports = router;