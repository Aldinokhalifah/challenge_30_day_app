const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    day: Number,
    note: String,
    status: String,
    filledAt: Date,
});


export default mongoose.models.Logs || mongoose.model('Logs', logsSchema);