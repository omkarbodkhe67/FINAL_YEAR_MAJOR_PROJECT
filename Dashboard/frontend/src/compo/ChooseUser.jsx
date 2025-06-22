import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseUser = () => {
  const navigate = useNavigate();

  const handleUserSelection = (userType) => {
    switch (userType) {
      case 'admin':
        navigate('/admin');
        break;
      case 'student':
        navigate('/student');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      default:
        break;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Who are you?</h1>
      <div style={styles.optionsContainer}>
        <div style={styles.option} onClick={() => handleUserSelection('student')}>
          <img
            src="https://img.icons8.com/?size=100&id=23319&format=png&color=ffffff"
            alt="Student Logo"
            style={styles.icon}
          />
          <h2 style={styles.optionTitle}>Student</h2>
          <p style={styles.optionDescription}>
            View your courses, submit assignments, and check attendance.
          </p>
        </div>
        <div style={styles.option} onClick={() => handleUserSelection('teacher')}>
          <img
            src="https://img.icons8.com/?size=100&id=d5q9KF0l7VrO&format=png&color=ffffff"
            alt="Teacher Logo"
            style={styles.icon}
          />
          <h2 style={styles.optionTitle}>Teacher</h2>
          <p style={styles.optionDescription}>
            Manage student progress, upload assignments, and track performance.
          </p>
        </div>
        <div style={styles.option} onClick={() => handleUserSelection('admin')}>
        <img
  src="https://logodix.com/logo/1707094.png"
  alt="Admin Logo"
  style={styles.icon}
/>
          <h2 style={styles.optionTitle}>Admin</h2>
          <p style={styles.optionDescription}>
            Manage system users, view reports, and configure settings.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    background: 'linear-gradient(to right, #1E3C72, #2A5298)',
    color: '#ffffff',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
  },
  optionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    gap: '20px',
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    borderRadius: '12px',
    padding: '25px',
    width: '280px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  optionTitle: {
    fontSize: '1.8rem',
    margin: '15px 0 10px',
  },
  optionDescription: {
    fontSize: '1rem',
    opacity: '0.9',
  },
  icon: {
    width: '60px',
    height: '60px',
    filter: 'drop-shadow(2px 2px 10px rgba(255,255,255,0.5))',
  },
};

export default ChooseUser;
