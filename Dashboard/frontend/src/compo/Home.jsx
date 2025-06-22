import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleLogin = () => {
    navigate("/choose-user");
  };

  const handleGuestLogin = () => {
    navigate("/choose-user");
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.imageContainer}>
          <img
            src="https://media.collegedekho.com/media/img/institute/crawled_images/33322/qwsdftyhj56585.jpg?width=1080"
            alt="Students"
            style={styles.image}
          />
        </div>
        <div style={styles.textContainer}>
          <h1 style={styles.welcomeTitle}>
            Welcome to <br /> Face Based <br />  Attendnace System with Report Generation
          </h1>
          <p style={styles.descriptionText}>
            Streamline attendance, manage students and faculty, track
            performance, and generate insightful reports effortlessly.
          </p>
          <div style={styles.buttonContainer}>
            <button
              style={{
                ...styles.loginButton,
                ...(hoveredButton === "login" && styles.loginButtonHover),
              }}
              onMouseEnter={() => setHoveredButton("login")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              style={{
                ...styles.guestButton,
                ...(hoveredButton === "guest" && styles.guestButtonHover),
              }}
              onMouseEnter={() => setHoveredButton("guest")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={handleGuestLogin}
            >
              Login as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
    background: "linear-gradient(to right, #1E3C72, #2A5298)",
    color: "#ffffff",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: "1200px",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
  },
  imageContainer: {
    flex: "1 1 45%",
    maxWidth: "500px",
    width: "100%",
    overflow: "hidden",
    borderRadius: "12px",
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
  },
  textContainer: {
    flex: "1 1 45%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    textAlign: "center",
  },
  welcomeTitle: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
    marginBottom: "20px",
  },
  descriptionText: {
    fontSize: "1.1rem",
    opacity: "0.9",
    maxWidth: "90%",
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  loginButton: {
    background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
    width: "220px",
  },
  loginButtonHover: {
    transform: "scale(1.05)",
    background: "linear-gradient(135deg, #66BB6A, #388E3C)",
  },
  guestButton: {
    background: "transparent",
    color: "#ffffff",
    border: "2px solid #ffffff",
    borderRadius: "8px",
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
    width: "220px",
  },
  guestButtonHover: {
    transform: "scale(1.05)",
    background: "#ffffff",
    color: "#2A5298",
  },
};

export default Home;
