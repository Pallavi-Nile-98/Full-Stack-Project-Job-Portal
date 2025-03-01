import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";  // Fixed import
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {  // Fixed 'requestAnimationFrame' to 'req'
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("User is not authenticated", 400));  // Fixed 'ErrorHandle' to 'ErrorHandler'
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    next();
});

export const isAuthorized = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next
            (new ErrorHandler(
                `${req.user.role} not allowed to access this resource.`
            )
         );
        }
        next();
    };
};