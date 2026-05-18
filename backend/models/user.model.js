import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImageUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    companyId: {
      type: String, // We'll store the human-readable companyId string here for easier filtering
      required: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User
