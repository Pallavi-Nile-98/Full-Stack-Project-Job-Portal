import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";

//function for user registration

export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, phone, address, password, role, firstNiche, secondNiche, thirdNiche, coverLetter } = req.body;

        if (!name || !email || !phone || !address || !password || !role) {
            return next(new ErrorHandler("All fields are required", 400));
        }

        if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
            return next(new ErrorHandler("Please provide your preferred job niches.", 400));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("Email is already registered.", 400));
        }

        const userData = {
            name,
            email,
            phone,
            address,
            password,
            role,
            niches: {
                firstNiche,
                secondNiche,
                thirdNiche,
            },
            coverLetter,
        };

        //  Debug: Log if files exist
        console.log("Uploaded Files:", req.files);

        if (req.files && req.files.resume) {
            const resume = req.files.resume;
            console.log("Resume File Received:", resume.name);

            try {
                // Debug: Check tempFilePath
                console.log("Temp File Path:", resume.tempFilePath);

                const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, {
                    folder: "Job_Seekers_Resume",
                });

                console.log("Cloudinary Response:", cloudinaryResponse);

                if (!cloudinaryResponse || cloudinaryResponse.error) {
                    console.error("Cloudinary Upload Error:", cloudinaryResponse.error);
                    return next(new ErrorHandler("Failed to upload resume to Cloudinary.", 500));
                }

                userData.resume = {
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url,
                };
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                return next(new ErrorHandler(`Cloudinary Upload Error: ${uploadError.message}`, 500));
            }
        }

        const user = await User.create(userData);
        sendToken(user, 201, res, "User Registered Successfully.");
    } catch (error) {
        console.error("Registration Error:", error);
        return next(new ErrorHandler(error.message, 500));
    }
});

//Function for user Login

export const login=catchAsyncErrors(async(req,res,next)=>{
    const {role,email,password}= req.body;
    if(!role|| !email || !password){
        return next(
            new ErrorHandler("Email,Password and role are required.",400)

        );        
    }
    const user = await User.findOne({email}).select("+password");
 
    if(!user){
        return next(new ErrorHandler("Invalid email or password.",400))
    }
    const isPasswordMatched= await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password.",400))
    }

    if(user.role !==role){
        return next (new ErrorHandler("Invalid user role.",400));
    }
    sendToken(user,200,res,"User logged in successfully");

});


// function for user Logout

export const logout = catchAsyncErrors(async(req,res,next)=>{
   res.status(200).cookie("token","",{
    expires:new Date(Date.now()),
    httpOnly:true,
   }).json({
    success:true,
    message:"User logged out successfully."
   }) 
})

// function for get User

export const getUser = catchAsyncErrors(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    });
});

//Function for Profile update

export const updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        coverLetter:req.body.coverLetter,
        niches:{
            firstNiche:req.body.firstNiche,
            secondNiche:req.body.secondNiche,
            thirdNiche:req.body.thirdNiche,
        }

    }

    const{firstNiche,secondNiche,thirdNiche}=newUserData.niches;

    if(req.user.role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)
    ){
        return next(
            new ErrorHandler("Please provide your all preferred job niches.",400)
        );
      }
     
if(req.files){
    const resume = req.files.resume;
    if(resume){
        const currentResumeId = req.user.resume.public_id;
        if(currentResumeId){
            await cloudinary.uploader.destroy(currentResumeId);
        }
        const newResume = await cloudinary.uploader.upload(resume.tempFilePath,{
            folder:"Job_Seekers_Resume"
        });
        newUserData.resume={
            public_id:newResume.public_id,
            url:newResume.secure_url,

        };
    }
}

const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new: true,
    runValidators:true,
    userFindAndModify:false,
 });

res.status(200).json({
    success:true,
    user,
    message:"Profile Updated.",

 });
});

//Update password (forgot password)

export const updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect.",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("New password and confirm password do not match.", 400));
    }

    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res,"Password updated successfully.");
});
