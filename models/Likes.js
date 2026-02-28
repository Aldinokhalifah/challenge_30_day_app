const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    challengeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "Challenge", 
        index: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User", 
        index: true 
    },
    createdAt: { type: Date, default: Date.now }
});

// satu like per user per challenge
likesSchema.index({challengeId: 1, userId: 1}, {unique: true});

// query ke user untuk melihat challenge yg dilike
likesSchema.index({userId: 1, createdAt: -1});

export default mongoose.models.Likes || mongoose.model('Likes', likesSchema);