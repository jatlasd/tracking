import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    // Check the current state of the connection
    const currentState = mongoose.connection.readyState;

    if(currentState === 1) { // 1 means connected
        if (!isConnected) {
            console.log('MongoDB is already connected');
            isConnected = true; // Ensure isConnected reflects the current state accurately
        }
        return;
    } else if (currentState === 2) { // 2 means connecting
        console.log('MongoDB is connecting...');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'tracking',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true; // Update isConnected after successful connection
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
    }
}