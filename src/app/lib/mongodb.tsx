import mongoose from 'mongoose';

   const MONGODB_URI = process.env.MONGODB_URI || 'your_mongodb_connection_string';

   if (!MONGODB_URI) {
     throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
   }

   async function dbConnect() {
     if (mongoose.connection.readyState === 0) {
       await mongoose.connect(MONGODB_URI);
     }
     console.log('successfully connected to mongo db');
     return mongoose.connection;
   }

   export default dbConnect;