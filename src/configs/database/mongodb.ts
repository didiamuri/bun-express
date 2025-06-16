import mongoose from "mongoose";
import {logger} from "../logger";

const initMongo = async (): Promise<void> => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        logger.error("❌ MONGODB_URI is not defined in environment variables.");
    }

    try {
        await mongoose.connect(mongoUri as string);
        logger.info("✅ Connected to MongoDB", {label: "MongoDB"});
    } catch (error) {
        logger.error(`❌ MongoDB connection error: ${error}`, {label: "MongoDB"});
    }
};

export default initMongo;