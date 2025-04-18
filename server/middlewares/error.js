// Error handling middleware
import {ErrorResponse} from "../middlewares/errorReponse.js";
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    // Log error for debugging
    //console.error('Error:', err);
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = `Resource not found with id ${err.value}`;
      error = new ErrorResponse(message, 404);
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `Duplicate value entered for ${field} field`;
      error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message).join(', ');
      error = new ErrorResponse(message, 400);
    }

    // Send error response
    return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error'
    });
};
export {errorHandler};