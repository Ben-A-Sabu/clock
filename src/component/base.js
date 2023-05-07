import Footer from "./footer/footer";
import { useState } from "react";

export default function Base(props) {

   const [alarm,setAlarm]=useState(false);
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
    



    return(
        <div className="Basecontainer">
           {props.children}
            <Footer className="row">
            <img src="images/alarm.png" id="alarm" alt="logo"></img>
            <img src="images/clock.png" id="clock" alt="logo"></img>
           <img src="images/stopwatch.png" id="stopwatch" alt="logo"></img>
           <img src="images/timer.png"id="timer" alt="logo"></img>
            </Footer>
        </div>
    )
}