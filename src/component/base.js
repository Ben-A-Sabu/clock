import Footer from "./footer/footer";
///import { useState } from "react";

export default function Base(props) {

 /*  const [alarm,setAlarm]=useState(false);
    const [clock,setClock]=useState(false);
    const [stopwatch,setStopwatch]=useState(false);
    const [timer,setTimer]=useState(false);

    const alarmClick=()=>{
        setAlarm(true);
        setClock(false);
        setStopwatch(false);
        setTimer(false);
    }
    const clockClick=()=>{
        setAlarm(false);
        setClock(true);
        setStopwatch(false);
        setTimer(false);
    }
    const stopwatchClick=()=>{
        setAlarm(false);
        setClock(false);
        setStopwatch(true);
        setTimer(false);
    }
    const timerClick=()=>{
        setAlarm(false);
        setClock(false);
        setStopwatch(false);
        setTimer(true);
    }
    */



    return(
        <div className="Basecontainer">
           {props.children}
            <Footer className="row">
            <div className="col alignment">
            <img src="images/alarm.png" id="alarm" alt="logo"></img>
            <label htmlFor="alarm">Alarm</label>
            </div>
            <div className="col alignment ">
            <img src="images/clock.png" id="clock" alt="logo"></img>
            <label htmlFor="clock">Clock</label>
            </div>
            <div className="col alignment">
           <img src="images/stopwatch.png" id="stopwatch" alt="logo"></img>
            <label htmlFor="stopwatch">Stopwatch</label>
            </div>
            <div className="col alignment">
           <img src="images/timer.png"id="timer" alt="logo"></img>
            <label htmlFor="timer">Timer</label>
            </div>
            </Footer>
        </div>
    )
}