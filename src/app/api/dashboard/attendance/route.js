
import Attendance from "@/app/dashboard/attendance/page";
import AttendanceModel from "@/app/models/Attendance";
import { mongodb } from "@/lib/mongodb";

export const GET = async () => {
    try {
        // Connect to MongoDB
        await mongodb();

        // Fetch all users from the database
        const users = await AttendanceModel.find();

        // Return the list of users
        return new Response(
            JSON.stringify({ users }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching users:", error);

        // Return server error response
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
};

export const POST = async (req) => {
    try {
        // Connect to MongoDB
        await mongodb();

        // Parse the incoming request body
        const body = await req.json();

        const { studentId, studentName, class: className, attendanceRecords } = body;

        // Validate required fields
        if (!studentId || !studentName || !className || !attendanceRecords) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 }
            );
        }

        // Create a new attendance record
        const newAttendance = new AttendanceModel({
            studentId,
            studentName,
            class: className,
            attendanceRecords,
        });

        // Save the record to the database
        const savedAttendance = await newAttendance.save();

        // Return a success response
        return new Response(
            JSON.stringify({ message: "Attendance record created successfully", data: savedAttendance }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating attendance record:", error);

        // Return server error response
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
};

