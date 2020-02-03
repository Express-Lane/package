const db = require( '../dbConfig' );

const getAll = () => {
    return db( 'users' );
}

const getBy = filter => {
    return db( 'users' ).where( filter ).first();
}

const add = async user => {
    await db( 'users' ).insert( user );

    const users = await db( 'users' );
    
    return users[ users.length-1 ];
}

const edit = async ( id, update ) => {
    await db( 'users' ).where({ id }).update( update );

    return db( 'users' ).where({ id }).first();
}

const remove = id => {
    return db( 'users' ).where({ id }).del();
}

module.exports = {
    getAll,
    getBy,
    add,
    edit,
    remove
}