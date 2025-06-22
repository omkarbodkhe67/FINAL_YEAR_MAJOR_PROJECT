// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { saveAs } from "file-saver";

// const AttendancePercentage = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [percentageData, setPercentageData] = useState([]);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [percentageFilter, setPercentageFilter] = useState("");

//   useEffect(() => {
//     fetchAttendance();
//   }, []);

//   useEffect(() => {
//     if (fromDate && toDate) {
//       filterAndCalculatePercentage();
//     }
//   }, [fromDate, toDate, selectedSubject, percentageFilter]);

//   const fetchAttendance = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/attendance");
//       setAttendanceData(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching attendance:", error);
//     }
//   };

//   const filterAndCalculatePercentage = () => {
//     if (!fromDate || !toDate) return;

//     let filteredData = attendanceData.filter((record) => {
//       const recordDate = new Date(record.Date);
//       return recordDate >= new Date(fromDate) && recordDate <= new Date(toDate);
//     });

//     if (selectedSubject) {
//       filteredData = filteredData.filter((record) => record.Subject === selectedSubject);
//     }

//     const uniqueDates = new Set(filteredData.map((record) => record.Date));
//     const totalLectureDays = uniqueDates.size;

//     const attendanceCount = {};

//     filteredData.forEach((record) => {
//       const student = record.Name;
//       if (!attendanceCount[student]) {
//         attendanceCount[student] = new Set();
//       }
//       attendanceCount[student].add(record.Date);
//     });

//     let calculatedPercentages = Object.keys(attendanceCount).map((student) => ({
//       Name: student,
//       Percentage: ((attendanceCount[student].size / totalLectureDays) * 100).toFixed(2),
//     }));

//     if (percentageFilter) {
//       const [min, max] = percentageFilter.split("-").map(Number);
//       calculatedPercentages = calculatedPercentages.filter(
//         (record) => record.Percentage >= min && record.Percentage <= max
//       );
//     }

//     setPercentageData(calculatedPercentages);
//   };

//   const downloadAttendance = () => {
//     const csvContent = "Name,Percentage\n" +
//       percentageData.map(record => `${record.Name},${record.Percentage}%`).join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "attendance_report.csv");
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: "12px", boxShadow: "0 6px 12px rgba(0,0,0,0.15)", textAlign: "center", color: "#fff" }}>
//       <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "600" }}>📊 Attendance Percentage</h2>

//       <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
//         <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ padding: "10px", borderRadius: "6px", fontSize: "16px" }} />
//         <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ padding: "10px", borderRadius: "6px", fontSize: "16px" }} />
//         <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} style={{ padding: "10px", borderRadius: "6px", fontSize: "16px" }}>
//           <option value="">All Subjects</option>
//           <option value="Math">Math</option>
//           <option value="Physics">Physics</option>
//           <option value="Chemistry">Chemistry</option>
//         </select>
//         <select value={percentageFilter} onChange={(e) => setPercentageFilter(e.target.value)} style={{ padding: "10px", borderRadius: "6px", fontSize: "16px" }}>
//           <option value="">All Percentage Ranges</option>
//           <option value="0-30">0% - 30%</option>
//           <option value="31-50">31% - 50%</option>
//           <option value="51-70">51% - 70%</option>
//           <option value="71-100">71% - 100%</option>
//         </select>
//       </div>

//       <button onClick={downloadAttendance} style={{ backgroundColor: "#ff4b5c", color: "white", padding: "12px", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}>📥 Download Report</button>

//       <table style={{ width: "100%", marginTop: "20px", background: "#fff", color: "#333", borderRadius: "12px", borderCollapse: "collapse" }}>
//         <thead>
//           <tr style={{ backgroundColor: "#007bff", color: "white" }}>
//             <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
//             <th style={{ padding: "12px", textAlign: "left" }}>Percentage</th>
//           </tr>
//         </thead>
//         <tbody>
//           {percentageData.length > 0 ? percentageData.map((record, index) => (
//             <tr key={index} style={{ backgroundColor: record.Percentage < 50 ? "#ffcccc" : "white" }}>
//               <td style={{ padding: "12px" }}>{record.Name}</td>
//               <td style={{ padding: "12px" }}>{record.Percentage}%</td>
//             </tr>
//           )) : (
//             <tr>
//               <td colSpan="2" style={{ textAlign: "center", padding: "12px" }}>No attendance data for selected range.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendancePercentage;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AttendancePercentage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [percentageData, setPercentageData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [manualMin, setManualMin] = useState("");
  const [manualMax, setManualMax] = useState("");
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      filterAndCalculatePercentage();
    }
  }, [fromDate, toDate, selectedSubject, manualMin, manualMax]);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:5000/attendance");
      setAttendanceData(response.data);
    } catch (error) {
      console.error("❌ Error fetching attendance:", error);
    }
  };

  const filterAndCalculatePercentage = () => {
    let filteredData = attendanceData.filter((record) => {
      const recordDate = new Date(record.Date);
      return recordDate >= new Date(fromDate) && recordDate <= new Date(toDate);
    });

    if (selectedSubject) {
      filteredData = filteredData.filter((record) => record.Subject === selectedSubject);
    }

    const uniqueDates = new Set(filteredData.map((record) => record.Date));
    const totalLectureDays = uniqueDates.size;

    const attendanceCount = {};

    filteredData.forEach((record) => {
      const student = record.Name;
      if (!attendanceCount[student]) {
        attendanceCount[student] = new Set();
      }
      attendanceCount[student].add(record.Date);
    });

    let calculatedPercentages = Object.keys(attendanceCount).map((student) => ({
      Name: student,
      Percentage: ((attendanceCount[student].size / totalLectureDays) * 100).toFixed(2),
    }));

    if (manualMin && manualMax) {
      calculatedPercentages = calculatedPercentages.filter(
        (record) =>
          parseFloat(record.Percentage) >= parseFloat(manualMin) &&
          parseFloat(record.Percentage) <= parseFloat(manualMax)
      );
    }

    setPercentageData(calculatedPercentages);
  };

  const downloadAttendance = () => {
    const csvContent =
      "Name,Percentage\n" +
      percentageData.map((record) => `${record.Name},${record.Percentage}%`).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "attendance_report.csv");
  };

  const chartData = {
    labels: percentageData.map((data) => data.Name),
    datasets: [
      {
        label: "Attendance %",
        data: percentageData.map((data) => data.Percentage),
        backgroundColor: percentageData.map((data) =>
          data.Percentage >= 75 ? "#4caf50" : data.Percentage >= 50 ? "#ff9800" : "#f44336"
        ),
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: "📈 Attendance Performance Dashboard",
        color: "#333",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  const doughnutData = {
    labels: ["Excellent (75%+)", "Average (50-74%)", "Poor (<50%)"],
    datasets: [
      {
        data: [
          percentageData.filter((d) => d.Percentage >= 75).length,
          percentageData.filter((d) => d.Percentage >= 50 && d.Percentage < 75).length,
          percentageData.filter((d) => d.Percentage < 50).length,
        ],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
        background: "#f0f4f8",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        color: "#333",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "28px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        📊 Attendance Analytics Dashboard
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
          <option value="">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
        </select>
        <input
          type="number"
          placeholder="Min %"
          value={manualMin}
          onChange={(e) => setManualMin(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "16px",
            width: "100px",
          }}
        />
        <input
          type="number"
          placeholder="Max %"
          value={manualMax}
          onChange={(e) => setManualMax(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "16px",
            width: "100px",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "24px" }}>
        <button
          onClick={downloadAttendance}
          style={{
            backgroundColor: "#ff4b5c",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          📥 Download CSV
        </button>
        <button
          onClick={() => setShowChart(!showChart)}
          style={{
            backgroundColor: "#00c896",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {showChart ? "Hide Dashboard" : "📈 Show Dashboard"}
        </button>
      </div>

      {showChart && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      )}

      <table
        style={{
          width: "100%",
          background: "#fff",
          color: "#333",
          borderRadius: "12px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white" }}>
            <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {percentageData.length > 0 ? (
            percentageData.map((record, index) => (
              <tr key={index} style={{ backgroundColor: record.Percentage < 50 ? "#ffcccc" : "white" }}>
                <td style={{ padding: "12px" }}>{record.Name}</td>
                <td style={{ padding: "12px" }}>{record.Percentage}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center", padding: "12px" }}>
                No data for selected range.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePercentage;














