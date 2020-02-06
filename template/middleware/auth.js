const Crypto = require( 'crypto-js' );
const jwt = require( 'jsonwebtoken' );

const generateHash = password => {
    return Crypto.SHA256(password).toString();
}

const generateToken = data => {
    const payload = {
        ...data
    }

    const secret = process.env.SECRET || "Hide This String";

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options);
}

module.exports = {
    generateHash,
    generateToken
}