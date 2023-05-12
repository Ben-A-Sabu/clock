import React, { useState, useEffect } from "react";
import "./stopwatch.css";
import "./App.css";
import "./element.css";
import "./floatingbtn.css";
import "./component/popup/popup.css";
import Content from "./component/content";
import Footer from "./component/footer/footer";
import Floatingbtn from "./component/floatingbtn";
import "./component/button/button.css";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [markTime, setMarkTime] = useState([]);
  const [isMarkedTimeVisible, setIsMarkedTimeVisible] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setMarkTime([]);
    setIsMarkedTimeVisible(false);
  };

  const handleMarkedTime = () => {
    setMarkTime([...markTime, time]);
    setIsMarkedTimeVisible(true);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time / 100) % 60);
    const milliseconds = time % 100;
    return (
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds) +
      "." +
      (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
  };

  return (
    <>
      <Content id="StopwatchContent">
        <div className="warp alignment">
          <div id="TimerDisplay" className="alignment">
            {formatTime(time)}
          </div>
        </div>

        {isMarkedTimeVisible && (
          <div className="col" id="MarkedTime">
            <div className="InnerContent">
              <h5>Marked Time</h5>
              <div className="alignment">{formatTime(time)}</div>
              {markTime.reverse().map((time, index) => (
                <div key={index}>
                  {markTime.length - index + ") "}
                  {formatTime(time)}
                </div>
              ))}
            </div>
          </div>
        )}
      </Content>
      <Footer >
      <Floatingbtn className="FloatingBtn alignment" id="Start" onClick={(event)=>handleStart(event)}><img src="images/play.png"  className="row smallimg" alt="play"/></Floatingbtn>
      {isRunning ===true &&(
         <div className="row">
        <Floatingbtn className="FloatingBtn alignment" id="Pause" onClick={()=> handleStop()}><img src="images/pause.png" alt="pause" /> </Floatingbtn>
        <Floatingbtn className="FloatingBtn alignment" id="Catch" onClick={()=> handleMarkedTime()}><img src="images/stopwatch.png" alt="stopwatch"/></Floatingbtn>
        </div>
      )}

      {
          ((isRunning ===false ||isRunning ===true ) && time >0) &&(
            <Floatingbtn className="FloatingBtn alignment" id="Reset" onClick={()=> handleReset()}><img src="images/reset.png" alt="reset"/></Floatingbtn>
          )


      }  

        </Footer>
    </>
  );
}

export default Stopwatch;
