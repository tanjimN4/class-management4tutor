"use client"
import { useEffect, useState } from "react";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch("/api/dashboard/attendance"); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const data = await response.json();
        setAttendanceData(data.users); // Assuming `users` is the key containing attendance data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) {
    return <p>Loading attendance data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Student ID</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Class</th>
            <th className="border border-gray-300 px-4 py-2">Attendance Records</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record) => (
            <tr key={record._id}>
              <td className="border border-gray-300 px-4 py-2">{record.studentId}</td>
              <td className="border border-gray-300 px-4 py-2">{record.studentName}</td>
              <td className="border border-gray-300 px-4 py-2">{record.class}</td>
              <td className="border border-gray-300 px-4 py-2">
                {record.attendanceRecords.map((att, index) => (
                  <div key={index}>
                    <span className="font-bold">{att.date}:</span> {att.status}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
