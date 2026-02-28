const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
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
    content: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 2000 
    },
    parentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment", 
        default: null 
    }, // untuk reply
    createdAt: { type: Date, default: Date.now },
    editedAt: { type: Date, default: null },
    isHidden: { type: Boolean, default: false } // moderation flag
});

// Primary index untuk pagination newest-first per challenge
commentsSchema.index({ challengeId: 1, createdAt: -1 });

// index untuk moderasi/user
commentsSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Comments || mongoose.model("Comments", commentsSchema);