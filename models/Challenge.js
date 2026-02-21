const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
    lastFilled: {
        day: { type: Number, default: null },
        dateISO: { type: String, default: null } 
    }
});

// Tambahkan compound index untuk query optimization
challengeSchema.index({ userId: 1, customId: 1 });

export default mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);