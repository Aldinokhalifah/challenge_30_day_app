const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    customId: {
        type: Number,
        required: true,
        unique: true
    },
    title: String,
    description: String,
    startDate: Date,
    createdAt: Date,
    logs: Array,
    isPublic: Boolean,
});

export default mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);