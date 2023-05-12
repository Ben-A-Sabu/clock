import React, { useState,useEffect } from "react";
import './App.css';
import'./element.css';
import'./floatingbtn.css';
import './component/popup/popup.css';
import Header from './component/header/header';
import Body from './component/body/body';
import Footer from './component/footer/footer';
import Floatingbtn from './component/floatingbtn';
import Popup from './component/popup/popup';
import Button from "./component/button/button";
import './component/button/button.css';
import './timer.css';
import "./stopwatch.css";
function Timer() {


   const [showPopup, setShowPopup] = useState(false);
   const [time, setTime] = useState(0);
   const[timerpopup,setTimerPopup]=useState(false);
   const [timerOn, setTimerOn] = useState(false);
   const[play,setPlay]=useState(false);
   const[timer,setTimer]=useState([]);



   useEffect(() => {
      let interval = null;
      if (timerOn) {
         interval = setInterval(() => {
            setTime((prevTime) => prevTime - 10);
         }, 10);
      } else if (!timerOn) {
         clearInterval(interval);
      }
      return () => clearInterval(interval);
   }, [timerOn]);

   const startTimer = (event) => {
      setTimerOn(true);
      event.preventDefault();
      setTimerPopup(true);
      setPlay(false);
   };

   const stopTimer = () => {
      setTimerOn(false);
   };

   const resetTimer = () => {
      setTime(timer[0]);
     setTimerOn(false);
   };

  


   function handleClick() {
      setShowPopup(true);
    }
    
    const handleClose=(event)=> {
      setShowPopup(false);
    }
    function handleSave() {
      const hoursValue = document.getElementById("hours-input").value;
      const minutesValue = document.getElementById("minutes-input").value;
      const secondsValue = document.getElementById("seconds-input").value;
    
      // Check if all fields are empty or not
      if (hoursValue === "" && minutesValue === "" && secondsValue === "") {
        alert("Please enter a value");
        return;
      }
    
      // covert the entered values to milliseconds
      const hoursToMs = hoursValue * 360000;
      const minutesToMs = minutesValue * 6000;
      const secondsToMs = secondsValue * 100;

      const time = hoursToMs + minutesToMs + secondsToMs;
      console.log(hoursToMs, minutesToMs, secondsToMs, time);
      setTime(time);

      // Hide the popup
      setShowPopup(false);
      setPlay(true);
      setTimer(prevtimer => [...prevtimer,time]);
    }
    
   

   const formatTime = (time) => {
      const hours = Math.floor(time / 360000);
      const hourbal=Math.floor(time%360000);
      const minutes = Math.floor(hourbal / 6000);
      const minutebal=Math.floor(hourbal%6000);
      const seconds = Math.floor((minutebal / 100) % 60);
      return (
        (hours < 10 ? "0" + hours : hours) +"h"+
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +"m"+
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)+"s" 
      )};

     //

    const AddOneMin=()=>{
      setTime(time+6000);
      }




const closeTimer=()=>{
   setTimerPopup(false);
   setPlay(false);
   setTimerOn(false);
   setTime(0);
   setTimer([]);
   setPlay(false);
   setTimerPopup(false);
}

   return (
        <> 

           <div id="TimerScreen"> {formatTime(time)}</div>
         <Floatingbtn className="FloatingBtn alignment" onClick={handleClick} id="AddAlarm">+</Floatingbtn>
         
         { play && (<Floatingbtn className="FloatingBtn alignment" id="Start" onClick={(event)=>startTimer(event)}><img src="images/play.png"  className="row smallimg" alt="play"/></Floatingbtn>)}
        
        {showPopup && (
          <Popup  onClose={handleClose} onSave={handleSave}>
            {/* Add the content for popup here */}
            <Header className="PopupHeader alignment" >
              <div>Set Timer</div>
            </Header>
            <Body className="PopupBody  col">
                 <label htmlFor="hours-input">Hours:</label>
                 <input type="number" id="hours-input" name="hours-input" min="0" max="23" className="TimeInput" placeholder="Hour"/>

                 <label htmlFor="minutes-input">Minutes:</label>
                 <input type="number" id="minutes-input" name="minutes-input" min="0" max="59" className="TimeInput" placeholder="Minute"/>

                 <label htmlFor="seconds-input">Seconds:</label>
                 <input type="number" id="seconds-input" name="seconds-input" min="0" max="59" className="TimeInput" placeholder="Second"/>
            </Body>
            <Footer className="PopupFooter row">
              <Button className="btn alignment" onClick={handleSave}>Set</Button>
              <Button className="btn alignment" onClick={(event)=>handleClose(event)}>Cancel</Button>
            </Footer>
          </Popup>
        )}


         {  timerpopup===true && (
            <Popup>
            {/* Add the content for popup here */}
              <Header className="PopupHeader  row" >
                <div>Timer</div>
                <Button className="btn alignment" onClick={()=>closeTimer()} ><img src="images/close.png"  alt="pause" className="smallimg" /></Button>
              </Header>
              <Body className="PopupBody  col">
               {timerOn === false && (<Button  id="Reset" onClick={()=>resetTimer()}><img src="images/reset.png" className="smallimg" alt="reset"/></Button>)}
                <div className="warp col">
                  <div id="TimerDisplay" className="alignment">{formatTime(time)}</div>
                 </div>
              </Body>
              <Footer className="PopupFooter row">
             {timerOn === true  && ( <Button className="btn alignment"  ><img src="images/pause.png" alt="pause" onClick={()=>stopTimer()} /></Button>)}  <Button className="btn alignment" onClick={()=>AddOneMin()}  >+1:00</Button>
               
               {timerOn === false && (<Button className="btn alignment"  ><img src="images/play.png" alt="play" onClick={(event)=>startTimer(event)} /></Button>)}
              </Footer>
          </Popup>
         )}
            </>
   );  
}

export default Timer;