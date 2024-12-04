const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  class: { type: String, required: true },
  attendanceRecords: [
    {
      date: { type: Date, required: true },
      status: { type: String, enum: ["Present", "Absent"], required: true },
    },
  ],
  createdAt: { type: Date, default: Date },
});

const AttendanceModel = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

module.exports = AttendanceModel;
