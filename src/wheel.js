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
        } else {
          alert("Error, Saving response");
          setEnter(false);
          setEmail("");
        }
      })
      .catch((error) => {
        alert("Error, Saving response");
        setEnter(false);
        setEmail("");
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
        }
      })
      .catch((error) => {
        alert("Email already used");
        setEnter(false);
        setEmail("");
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

  return (
    <>
      {enter ? (
        <div>
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
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
}

export default Wheel;
