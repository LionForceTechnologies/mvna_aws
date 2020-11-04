module.exports = {
    cors: {
        origin: ['*'], // an array of origins or 'ignore'
        headers: ['Authorization', 'Content-Type'], // an array of strings - 'Access-Control-Allow-Headers' 
        exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
        additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
        maxAge: 60
    }
}