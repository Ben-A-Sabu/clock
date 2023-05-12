import React, { useState } from "react";
import './App.css';
import'./element.css';
import'./floatingbtn.css';
import './component/popup/popup.css';
import Content from './component/content';
import Header from './component/header/header';
import Body from './component/body/body';
import Footer from './component/footer/footer';
import Floatingbtn from './component/floatingbtn';
import Popup from './component/popup/popup';
import Button from "./component/button/button";
import './component/button/button.css';
import './calender.css';

function Ttimer() {

  const [showPopup, setShowPopup] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const[timer,setTimer]=useState([]);
  const[label,setLabel]=useState("");
  
  function handleClick() {
    setShowPopup(true);
  }
  
  function handleClose() {
    setShowPopup(false);
  }
  
  function handleDropdown(index) {
    setDropdown(index === dropdown ? null : index);// if dropdown is true then set it to null else set it to index
  }

  function updateProperty( property,value, index) {

   setTimer(prevtimer =>{
    const newTimer=prevtimer.map((timer,i)=>{
      if(i===index){
        return {...timer,[property]:value}
      }
      return timer;
    });
    return newTimer;
   })

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
  const Time = hoursToMs + minutesToMs + secondsToMs;

  setTimer(prevtimer => [...prevtimer,
    { time: Time,
      timeron: false,
      initialTime: Time, // set initialTime to the initial value of the timer
    },
  ]);

  setShowPopup(false);
}


const handleDelete=(index)=>{
  setTimer(prevtimer => prevtimer.filter((timer,i)=>i!==index));
  setDropdown(false);

}


  
  console.log(timer);

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
  
 
  function startTimer(index) {
    const timerElement = timer[index];
    if (timerElement.timeron === false) {
        timerElement.timeron = true;
       updateProperty("timeron", true, index);
       timerElement.countdown = setInterval(() => {
          timerElement.time -= 100;
          updateProperty("time", timerElement.time, index);
        if (timerElement.time <= 0) {
           clearInterval(timerElement.countdown);
           timerElement.timeron = false;
        }
      }, 1000); // Update every second
    }
  }
  

  const resetTimer = (index) => {
    const timerElement = timer[index];
    const initialTime = timerElement.initialTime;
    timerElement.time = initialTime;
    updateProperty("time",initialTime, index);
  };
  
  const stopTimer = (index) => {
    const timerElement = timer[index];
    if (timerElement.timeron === true) {
       clearInterval(timerElement.countdown);
       timerElement.timeron = false;
       updateProperty("timeron", false, index);
    }
  };

  
  const AddOneMin = (index) => {
    const timerElement = timer[index];
    timerElement.time += 6000;
    clearInterval(timerElement.countdown);
    updateProperty("time", timerElement.time, index);
    timerElement.countdown = setInterval(() => {
        timerElement.time -= 100;
        updateProperty("time", timerElement.time, index);
        if (timerElement.time <= 0) {
          clearInterval(timerElement.countdown);
          timerElement.timeron = false;
        }
      }, 1000);
  };

  function handlelabel(index){
    setLabel(index === label ? null : index);
  }

  return (
    <>
      <Content id="Maincontent">
        {timer.map((state, index) => (
      <div key={index} className="element col">
      <Header className="ElementHeader alignment ">
        <div className="label">{formatTime(state.initialTime)} Timer</div>
        <div className="alignment dropdownbtn" onClick={() => handleDropdown(index)} >
          {dropdown === index ? 'v' : '^'} {/* if dropdown is true then show v else show ^*/}
        </div>
      </Header>
      <Body className="ElementBody">
        <div className="row">{formatTime(state.time)}</div>
      </Body>
      <Footer className="ElementFooter row">
         <Button className="btn alignment" onClick={()=>AddOneMin(index)}  >+1:00</Button>
         {timer[index].timeron === false &&(<Button className="btn alignment"  ><img src="images/play.png" alt="play" className="smallimg" onClick={()=>startTimer(index)} /></Button>)}
         {timer[index].timeron  === true && ( <Button className="btn alignment"  ><img src="images/pause.png" alt="pause" className="smallimg" onClick={()=>stopTimer(index)} /></Button>)}
         { (timer[index].timeron === false && timer[index].time < timer[index].initialTime) && (<Button  id="Reset" onClick={()=>resetTimer(index)}><img src="images/reset.png" className="smallimg" alt="reset"/></Button>)}

            
         {dropdown === index && (
          <Body className="features col">
            <div className="alignment">
              <div className="alarmFeature">Label</div>
              <img src="images/label_icon.png" className="smallimg" alt="logo"  onClick={()=> handlelabel(index)}></img>
            </div>
            <div className="alignment">
              <div className="alarmFeature">Delete</div>
              <img src="images/del-icon.webp" className="smallimg  Delete" alt="logo"  onClick={()=> handleDelete(index)}></img>
            </div>
          </Body>
        )}

















        </Footer>
        </div>
      ))}
        </Content>
        <Floatingbtn className="FloatingBtn alignment" onClick={handleClick} >+</Floatingbtn>
        
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
    </>
  );
}

export default Ttimer;


