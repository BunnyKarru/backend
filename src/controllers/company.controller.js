import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const createCompany=async(req,res)=>{
    try {
        const {companyName}=req.body;
        if (companyName==="") {
            throw new ApiError(400, "All fields are required"); 
        }
       
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let companyCode = '';
            const charactersLength = characters.length;
            for (let i = 0; i < 6; i++) {
                companyCode+= characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            
        


        const company = await Company.create({companyName,companyCode})
        const createdCompany = await Company.findById(company._id)
        if (!createdCompany) {
            throw new ApiError(500,"Company creation failed")
        }

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            console.log("Token ivvu ra lucha");
           return ;
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id)

        user.company.push(company._id);
        await user.save();



        return res.status(201).json(new ApiResponse(200,createdCompany,"Company created successfully"))


    } catch (error) {
        throw new ApiError(401,error)
    }
}

export default createCompany;