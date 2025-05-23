import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({ // make the user schema :3
    username: String,
    discriminator: {
        type: Number,
        min: 0,
        max: 9999,
        default: ()=>{
            return Math.floor(Math.random() * 10000)
        }
    },
    password: String,
    validTokens: [String],
    baseToken: String,
    email: String,
    verified: Boolean,
    bio: {
        type: String,
        default: null
    },
    avatarURL: {
        type: String,
        default: null
    },
    bannerURL: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    badges: {
        type: [String],
        default: []
    },
    disabled: Boolean,
    pronouns: {
        type: String,
        default: null
    },
    hasHadRecentCryingSession: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model('User', userSchema)

export { User, userSchema }