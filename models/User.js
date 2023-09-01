import mongoose from "mongoose";
/* 
    import validator from "validator"; -------------
    before I have validated using validator, 
    but at the moment I found express-validator more efficient for input validation
*/
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  profile: {
    type: String,
    default: "",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

UserSchema.methods.toJSON = function () {
  // technically I am going to create an instance method for this User model
  const userInstance = this.toObject();
  delete userInstance.password;
  return userInstance;
};

export default mongoose.model("User", UserSchema);
