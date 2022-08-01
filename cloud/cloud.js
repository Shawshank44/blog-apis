const cloudinary = require('cloudinary')


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDAPI, 
    api_secret: process.env.CLOUDSECRET,
    secure: true
});

module.exports = cloudinary