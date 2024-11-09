import "./styles.css";
import WheelComponent from "react-wheel-of-prizes";

import React, { useState } from "react";

import axios from "axios";

function Wheel() {
  const segments = [
    "Better luck ",
    "10% off",
    "5% off",
    "Better luck ",
    "20% off",
    "15% off",
  ];
  const segColors = [
    "black",
    "#60BA97",
    "black",
    "#60BA97",
    "black",
    "#60BA97",
  ];
  const onFinished = (winner) => {
    axios
      .get(
        `http://localhost:8080/wordCamp/updateCoupon?userEmail=${email}&coupon=${winner}`
      )
      .then((response) => {
        if (response.data) {
          alert("saved your response, Thank you");
          setEnter(false);
          setEmail("");
          setName("");
        } else {
          alert("Error, Saving response");
          setEnter(false);
          setEmail("");
          setName("");
        }
      })
      .catch((error) => {
        alert("Error, Saving response");
        setEnter(false);
        setEmail("");
        setName("");
      });
  };

  const emailEntered = () => {
    axios
      .get(`http://localhost:8080/wordCamp/userStatus?userEmail=${email}`)
      .then((response) => {
        if (response.data) {
          setEnter(!enter);
        } else {
          alert("Email already used");
          setEnter(false);
          setEmail("");
          setName("");
        }
      })
      .catch((error) => {
        alert("Email already used");
        setEnter(false);
        setEmail("");
        setName("");
      });
  };

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      axios
        .get(`http://localhost:8080/wordCamp/userStatus?userEmail=${email}`)
        .then((response) => {
          if (response.data) {
            setEnter(!enter);
          } else {
            alert("Email already used");
            setEnter(false);
            setEmail("");
          }
        })
        .catch((error) => {
          alert("Email already used");
          setEnter(false);
          setEmail("");
        });
    } else {
      alert("Please enter a valid email address.");
    }
  };
  const [email, setEmail] = useState("");
  const [enter, setEnter] = useState(false);
  const [name, setName] = useState("");

  return (
    <>
      {enter ? (
        <div style={styles.container}>
          <h1 style={styles.header}>
            Welcome to Rocon Spin the Wheel Contest {name}
          </h1>
          <p style={styles.subHeader}>Click on the wheel to claim offers</p>
          <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment="MM"
            onFinished={(winner) => onFinished(winner)}
            primaryColor="black"
            contrastColor="white"
            buttonText="Start"
            isOnlyOnce={false}
            size={190}
            upDuration={500}
            downDuration={600}
            fontFamily="Helvetica"
          />
        </div>
      ) : (
        <>
          <div style={styles.container}>
            <h1 style={styles.header}>
              Welcome to Rocon Spin the Wheel Contest
            </h1>

            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formRow}>
                <label style={styles.label}>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  style={styles.input}
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Email:</label>
                <input
                  style={styles.input}
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <button
                style={{
                  ...styles.button,
                  backgroundColor: name && email ? "#4CAF50" : "#ccc",
                  cursor: name && email ? "pointer" : "not-allowed",
                }}
                disabled={!name || !email}
                type="submit"
              >
                Submit
              </button>
            </form>
            <video src="wheel.mov" style={styles.video} loop autoPlay muted />
          </div>
        </>
      )}
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  subHeader: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
    textAlign: "center",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  label: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginRight: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    outline: "none",
    width: "-webkit-fill-available",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
  },
  video: {
    width: "400px",
    borderRadius: "8px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  formRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
};

export default Wheel;
