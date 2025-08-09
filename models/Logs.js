const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    day: Number,
    note: String,
    status: String,
    date: Date,
});


export default mongoose.models.Logs || mongoose.model('Logs', logsSchema);