/*
    File name: config.js
    Student Name: Hon Chuen Yau (Horace)
    Student ID: 301398059
    Date: Feb 17, 2024
*/

const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI ||
    "mongodb+srv://horace:pKuQeXWLFhPw5Lae@cluster0.r09qgs1.mongodb.net/Marketplace?retryWrites=true&w=majority" ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
}

export default config
   