import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {generateUniqueUsername} from "../utils/generateUsername.js";

const generateTokens = (user) => {
    const refreshToken = jwt.sign(
        {
            _id: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
    const accessToken = jwt.sign(
        {
            _id: user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );

    return {accessToken, refreshToken};
};

const registerUser = asyncHandler(async(req, res) => {
    const {userId, password, email, phone} = req.body;

    if(!userId || !password)
        throw new ApiError(
            400,
            "Pleave provide required fields."
        )

    if(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
            throw new ApiError(400, "Invalid email format.");

        const existingEmail = await User.findOne({email});
        if(existingEmail)
            throw new ApiError(409, "Email already registered.");
    }

    if (phone) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            throw new ApiError(400, "Invalid phone number");
        }

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            throw new ApiError(409, "Phone number already registered");
        }
    }

    const existingUserId = await User.findOne({ userId });
    if (existingUserId)
        throw new ApiError(409, "User ID already taken.");

    const username = await generateUniqueUsername();

    const newUser = await User.create({
        userId,
        username,
        password,
        email,
        phone
    });

    if(!newUser)
        throw new ApiError(
            500,
            "Something went wrong. user could not be created."
        )

    const createdUser = await User.findById(newUser._id)
                    .select(
                        "-password -refreshToken"
                    );

    if(!createdUser)
        throw new ApiError(500, "Something went wrong. user could not be registered.");


    return res.status(200).json(
        new ApiResponse(
            200,
            createdUser,
            "User was registered successfully."
        )
    );

});

const loginUser = asyncHandler(async (req, res) => {
    const {email, userId, password, phone} = req.body;
    if(!userId && !email && !phone)
        throw new ApiError(404, "Please provide necessary details.");

    if(!password)
        throw new ApiError(400, "Password is required.");

    const currUser = await User.findOne({
            $or: [{userId}, {phone}, {email}]
    });
     
    if(!currUser)
        throw new ApiError(400, "User does not exist.");

    const isPasswordValid = await currUser.isPasswordCorrect(password);

    if(!isPasswordValid)
        throw new ApiError(404, "Incorrect Password. Please Try again.");

    const {accessToken, refreshToken} = generateTokens(currUser);

    const loggedInUser = await User.findById(currUser._id)
                        .select(
                            "-password -refreshToken"
                        );

    const options = {
        httpOnly : true,
        secure: true,
        sameSite: "Strict"
    };

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully!"
        )
    );
});

const getUser = asyncHandler(async (req, res) => {
    const currUser = await User.findById(req.user._id).select(
            "-password -refreshToken"
        )
    
    if(!currUser)
        throw new ApiError(
            404,
            "User not found."
        )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            currUser,
            "Profile fetched successfully!"
        )
    )

})

const updatePassword = asyncHandler(async(req, res) => {
    const{oldPassword, newPasssword} = req.body;

    if(!oldPassword || !newPasssword)
        throw new ApiError(400, "Both passwords are required.");

    const currUser = await User.findById(req.user?._id);
    const isPasswordCorrect = await isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect)
        throw new ApiError(404, "Incorrect Password");

    currUser.password = newPasssword;

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password changed successfully")
    )
})

const updateUserDetails = asyncHandler(async (req, res) => {
  const { userId, email, phone, rantPreferences } = req.body;

  const updateData = {};

  if (userId) updateData.userId = userId;
  if (email) updateData.email = email;
  if (phone) updateData.phone = phone;
  if (rantPreferences) {
    updateData.rantPreferences = {};

    if (typeof rantPreferences.autoDelete === "boolean") {
      updateData.rantPreferences.autoDelete = rantPreferences.autoDelete;
    }

    if (typeof rantPreferences.deleteAfter === "number") {
      updateData.rantPreferences.deleteAfter = rantPreferences.deleteAfter;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  res.status(200).json({
    success: true,
    message: "User details updated successfully",
    data: updatedUser,
  });
});

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})



export {
    generateTokens,
    registerUser,
    loginUser,
    getUser,
    updatePassword,
    updateUserDetails,
    logoutUser
}