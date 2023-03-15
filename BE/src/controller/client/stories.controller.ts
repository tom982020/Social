/** @format */

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';


const createStories = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
}