// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './compo/Home';
import ChooseUser from './compo/ChooseUser';
import Student from './compo/Student';
import TeacherDashboard from './compo/Teacher';
import AttendanceRecord from './compo/AttendanceRecord';
import AttendancePercentage from './compo/AttendancePercentage';
import Assignments from './compo/assignments';
import Admin from './compo/Admin';
import ViewEventSubmissions from './compo/ViewEventSubmissions';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/choose-user" element={<ChooseUser />} />
      <Route path="/student" element={<Student />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/attendance-record" element={<AttendanceRecord />} />
      <Route path="/attendance-percentage" element={<AttendancePercentage />} />
      <Route path="/assignments" element={<Assignments/>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/view-event-submissions" element={<ViewEventSubmissions />} />
    </Routes>
  );
}

export default App;
