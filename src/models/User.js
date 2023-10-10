import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "USER",
    },
    haveAcc: {
        type: Date,
        default: () => Date.now()
    },
    movieList: {
        type: [{}],
    }
}, { timestamps: true })

const User = models.UserMovie || model("UserMovie", userSchema)

export default User