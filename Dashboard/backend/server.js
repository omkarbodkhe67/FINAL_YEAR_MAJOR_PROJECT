// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const csvParser = require("csv-parser");

// const app = express();
// const PORT = 5000;
// const CSV_FILE_PATH = "C:\\Users\\Lenovo\\Desktop\\Omkar_BE\\Attendance.csv"; // Update if needed

// app.use(cors());
// app.use(express.json());

// app.get("/attendance", async (req, res) => {
//     try {
//         if (!fs.existsSync(CSV_FILE_PATH)) {
//             return res.status(400).json({ error: "❌ CSV file not found!" });
//         }

//         let attendanceData = [];

//         fs.createReadStream(CSV_FILE_PATH)
//             .pipe(csvParser({ headers: false }))
//             .on("data", (row) => {
//                 const rowKeys = Object.keys(row);
//                 if (rowKeys.length < 2) return; 

//                 const name = row[rowKeys[0]] ? row[rowKeys[0]].trim() : "Unknown";
//                 const timestamp = row[rowKeys[1]] ? row[rowKeys[1]].trim() : "00-00-0000 00:00:00";
//                 const lecture = row[rowKeys[2]] ? row[rowKeys[2]].trim() : "N/A";

//                 const [recordDate, recordTime] = timestamp.split(" ");

//                 // ✅ Convert Date to YYYY-MM-DD format
//                 const [day, month, year] = recordDate.split("-");
//                 const formattedDate = `${year}-${month}-${day}`;

//                 attendanceData.push({
//                     Name: name,
//                     Date: formattedDate,
//                     Time: recordTime,
//                     Subject: lecture
//                 });
//             })
//             .on("end", () => {
//                 res.json(attendanceData);
//             })
//             .on("error", (error) => {
//                 console.error("❌ CSV Read Error:", error);
//                 res.status(500).json({ error: "Error reading CSV file" });
//             });
//     } catch (error) {
//         console.error("❌ Processing Error:", error);
//         res.status(500).json({ error: "Error processing CSV" });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`✅ Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csvParser = require("csv-parser");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;
const CSV_FILE_PATH = "C:\\Users\\Lenovo\\Desktop\\Omkar_BE\\Attendance.csv"; // ✅ Update if needed
const IMAGE_DIR = "C:/Users/Lenovo/Desktop/Omkar_BE/ImagesBasic"; // ✅ Base folder for images

app.use(cors());
app.use(express.json());

// ✅ Ensure base image folder exists
if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// ✅ Multer storage config for multiple image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const studentName = req.body.studentName;
        if (!studentName) {
            return cb(new Error("Student name is required"), null);
        }

        const studentFolder = path.join(IMAGE_DIR, studentName);

        if (!fs.existsSync(studentFolder)) {
            fs.mkdirSync(studentFolder, { recursive: true });
        }

        cb(null, studentFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ✅ Allow multiple image uploads (max 5 at a time)
app.post('/upload', upload.array('images', 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    res.json({
        message: '✅ Images uploaded successfully!',
        files: req.files.map(file => file.path),
    });
});

// ✅ Attendance API (No Changes)
app.get("/attendance", async (req, res) => {
    try {
        if (!fs.existsSync(CSV_FILE_PATH)) {
            return res.status(400).json({ error: "❌ CSV file not found!" });
        }

        let attendanceData = [];

        fs.createReadStream(CSV_FILE_PATH)
            .pipe(csvParser({ headers: false }))
            .on("data", (row) => {
                console.log("🔍 Raw CSV Row:", row); // ✅ Debugging

                const rowKeys = Object.keys(row);
                if (rowKeys.length < 2) return;

                const name = row[rowKeys[0]] ? row[rowKeys[0]].trim() : "Unknown";
                const timestamp = row[rowKeys[1]] ? row[rowKeys[1]].trim() : "00-00-0000 00:00:00";
                const lecture = row[rowKeys[2]] ? row[rowKeys[2]].trim() : "N/A";
                const present = row[rowKeys[3]] ? row[rowKeys[3]].trim().toLowerCase() === "yes" : false;

                const [recordDate, recordTime] = timestamp.split(" ");
                const formattedDate = recordDate.split("-").reverse().join("-");

                attendanceData.push({
                    Name: name,
                    Date: formattedDate,
                    Time: recordTime,
                    Subject: lecture,
                    Present: present
                });
            })
            .on("end", () => {
                res.json(attendanceData);
            })
            .on("error", (error) => {
                console.error("❌ CSV Read Error:", error);
                res.status(500).json({ error: "Error reading CSV file" });
            });
    } catch (error) {
        console.error("❌ Processing Error:", error);
        res.status(500).json({ error: "Error processing CSV" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
