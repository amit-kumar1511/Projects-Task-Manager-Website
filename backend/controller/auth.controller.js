import User from "../models/user.model.js"
import Company from "../models/company.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export const signup = async (req, res, next) => {
  const { name, email, password, profileImageUrl, companyId } = req.body

  if (!name || !email || !password || !companyId) {
    return next(errorHandler(400, "All fields (including companyId) are required"))
  }

  // Check if company exists
  const company = await Company.findOne({ companyId })
  if (!company) {
    return next(errorHandler(404, "Invalid Company ID. Please contact your admin."))
  }

  // Check if user already exists
  const isAlreadyExist = await User.findOne({ email })
  if (isAlreadyExist) {
    return next(errorHandler(400, "User already exists"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    profileImageUrl,
    role: "user",
    companyId,
  })

  try {
    await newUser.save()
    res.json("User Signup successful")
  } catch (error) {
    next(error)
  }
}

export const adminSignup = async (req, res, next) => {
  const { name, email, password, companyName, profileImageUrl } = req.body

  if (!name || !email || !password || !companyName) {
    return next(errorHandler(400, "All fields are required"))
  }

  // Check if user already exists
  const isAlreadyExist = await User.findOne({ email })
  if (isAlreadyExist) {
    return next(errorHandler(400, "User already exists"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)
  const generatedCompanyId = crypto.randomBytes(3).toString("hex").toUpperCase() // 6 chars unique ID

  try {
    // 1. Create User first (without companyId temporarily if needed, but our schema requires it)
    // Actually, we'll create the company first, then the user.
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role: "admin",
      companyId: generatedCompanyId,
    })

    const savedUser = await newUser.save()

    const newCompany = new Company({
      name: companyName,
      companyId: generatedCompanyId,
      admin: savedUser._id,
    })

    await newCompany.save()

    res.json({
      message: "Admin Signup successful",
      companyId: generatedCompanyId,
      companyName,
    })
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required"))
    }

    const validUser = await User.findOne({ email })

    if (!validUser) {
      return next(errorHandler(404, "User not found!"))
    }

    // compare password
    const validPassword = bcryptjs.compareSync(password, validUser.password)

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credentials"))
    }

    const token = jwt.sign(
      { id: validUser._id, role: validUser.role, companyId: validUser.companyId },
      process.env.JWT_SECRET
    )

    const { password: pass, ...rest } = validUser._doc

    res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest)
  } catch (error) {
    next(error)
  }
}

export const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return next(errorHandler(404, "User not found!"))
    }

    const { password: pass, ...rest } = user._doc

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return next(errorHandler(404, "User not found!"))
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.profileImageUrl = req.body.profileImageUrl || user.profileImageUrl

    if (req.body.password) {
      user.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updatedUser = await user.save()

    const { password: pass, ...rest } = user._doc

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No file uploaded"))
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`

    res.status(200).json({ imageUrl })
  } catch (error) {
    next(error)
  }
}

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been loggedout successfully!")
  } catch (error) {
    next(error)
  }
}
