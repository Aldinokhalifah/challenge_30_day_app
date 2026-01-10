const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    customId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    timezone: {
        type: String,
        default: 'UTC'
    }

}, { timestamps: true });

// hash paswword sebelum disimpan
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// compound index untuk query optimization
userSchema.index({ userId: 1, customId: 1 });


export default mongoose.models.User || mongoose.model('User', userSchema);
