import React, { useState,useEffect } from "react";
import './App.css';
import'./element.css';
import'./floatingbtn.css';
import './component/popup/popup.css';
import Navbar from './component/navbar';
import Content from './component/content';
import Base from './component/base';
import Header from './component/header/header';
import Body from './component/body/body';
import Footer from './component/footer/footer';
import Floatingbtn from './component/floatingbtn';
import Popup from './component/popup/popup';
import Button from "./component/button/button";
import './component/button/button.css';
import Calendar from 'react-calendar';
import './calender.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [alarms, setAlarms] = useState(
    JSON.parse(localStorage.getItem("alarms")) || []
  );
  const [dropdown, setDropdown] = useState(false);
  const [pausedate, setPausedate] = useState(false);
  const [alarmday,setAlarmday]=useState([]);
  const [Vibrate,setVibrate]=useState(false);
  const[Ringtone,setRingtone]=useState();



  function ringAlarm() {
    const alarms = JSON.parse(localStorage.getItem("alarms")) || [];
  
    console.log("ring alarms");
  
    const now = new Date();
    for (let i = 0; i < alarms.length; i++) {
      const alarm = alarms[i];
      console.log(alarm);
      
      // Split the alarm time string into hours and minutes
      const [hours, minutes] = alarm.AlarmTime.split(':');
      const alarmTime = new Date();
      alarmTime.setHours(hours, minutes, 0, 0);
  
      console.log(alarmTime.getHours());
      console.log(now.getHours());
  
      // Check if the current time matches the alarm time
      if (now.getHours() === alarmTime.getHours() && now.getMinutes() === alarmTime.getMinutes()) {
        // Create a new Audio object and set the source to the alarm sound file
        const audio = new Audio(alarm.AlarmRingtone);
        audio.play(); // Play the audio
        break; // If you want to ring only one alarm at a time
      }
    }
  }
  
  
  
  // Run the ringAlarm function every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      ringAlarm();
    }, 60 * 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);


  const handleRingtone=(index)=>{
    const input = document.createElement("input");
      input.type = "file";
      input.accept ="audio/*";
      input.onchange = () => {
        const reader = new FileReader();
        reader.onload = () => {
          const audio = document.createElement("audio");
          audio.src = reader.result;
          setRingtone(reader.result);
         
        };
        reader.readAsDataURL(input.files[0]);
      };
      input.click();
    
    updateProperty("AlarmRingtone",Ringtone,index)
  }


  const handleDelete=(index)=>{

    // remove the alarm from the array
    var alarmArray = JSON.parse(localStorage.getItem("alarms")) || [];
    setAlarms(prevAlarms => prevAlarms.filter((alarmArray, i) => i !== index));
    localStorage.setItem("alarms", JSON.stringify(alarmArray.filter((alarmArray, i) => i !== index)));

  }
  
  function alarmdayclick(value, index) {
    // if the value is already present, remove from array
    if (alarmday.includes(value)) {
      console.log("found");
      updateProperty("AlarmDays", alarmday.filter((item) => item !== value), index);
    } else {
      setAlarmday((prevAlarmday) => [...prevAlarmday, value]);
      updateProperty("AlarmDays", [...alarmday, value], index);
    }
  }
  
  function handleVibrate(index,event){
    const checkboxValue = event.target.checked;
    setVibrate(checkboxValue);
    updateProperty("AlarmVibrate", Vibrate, index);
  }
  
  console.log(new Date().getDay());   
  
  function handleClick() {
    setShowPopup(true);
  }
  
  function handleClose() {
    setShowPopup(false);
  }
  
  function updateProperty(property, value, index) {
    setAlarms(prevAlarms =>
      prevAlarms.map((alarm, i) => {
        if (i === index) {
          return {
            ...alarm,
            [property]: value,
          };
        }
        return alarm;
      })
    );
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }
  
  console.log(alarms);
  
  function handleSave() {
    const alarmTime = document.getElementById("alarmtime").value;
    const alarmArray = JSON.parse(localStorage.getItem("alarms")) || [];
  
    setAlarms(prevAlarms => [
      ...prevAlarms,
      {
        AlarmTime: alarmTime,
        AlarmDays: [],
        AlarmPaused: "",
        AlarmRingtone: "Audio/mixkit-alarm-digital-clock-beep-989.wav",
        AlarmVibrate: "",
        AlarmPauseStart: "",
        AlarmPauseEnd: "",
      },
    ]);
  
    alarmArray.push({
      AlarmTime: alarmTime,
      AlarmDays: [],
      AlarmPaused: "",
      AlarmRingtone: "Audio/mixkit-alarm-digital-clock-beep-989.wav",
      AlarmVibrate: "",
      AlarmPauseStart: "",
      AlarmPauseEnd: "",
    });
  
    localStorage.setItem("alarms", JSON.stringify(alarmArray));
    setShowPopup(false);
  }
  
  
  function handleDropdown(index) {
    setDropdown(index === dropdown ? null : index);// if dropdown is true then set it to null else set it to index
  }

  function handlePausedate(index) {
    setPausedate(index === pausedate ? null : index);// if dropdown is true then set it to null else set it to index
  }
  
  return (
    <div className="App">
      <Navbar/>
      <Content id="Maincontent">
      {alarms.map((state, index) => (
  <div key={index} className="element col">
    <Header className="ElementHeader alignment ">
      <div className="label">Alarm {index+1}</div>
      <div className="alignment dropdownbtn" onClick={() => handleDropdown(index)} >
        {dropdown === index ? 'v' : '^'} {/* if dropdown is true then show v else show ^*/}
      </div>
    </Header>
    <Body className="ElementBody">
      <div className="row">
        {state.AlarmTime}
      </div>
    </Body>
    <Footer className="ElementFooter col">
      {dropdown === index && (
        <Body className="features col">
          <div className="alignment">
          <div className="daylabel alarmFeature">Every day</div>
          <input type="range" min="0" max="10"  step={10} className="On_Off alarmFeature" id="myRange"/>
          </div>
          <div className="alignment days" >
            <div className="day"   onClick={()=>alarmdayclick(0,index)}>S</div>
            <div className="day"  onClick={()=>alarmdayclick(1,index)}>M</div>
            <div className="day"  onClick={()=>alarmdayclick(2,index)}>T</div>
            <div className="day" onClick={()=>alarmdayclick(3,index)}>W</div>
            <div className="day" onClick={()=>alarmdayclick(4,index)}>T</div>
            <div className="day"  onClick={()=>alarmdayclick(5,index)}>F</div>
            <div className="day"  onClick={()=>alarmdayclick(6,index)}>S</div>
          </div>
          <div className="alignment">
            <div className="alarmFeature">Pause Alarm</div>
            <div className="Pausedate" onClick={()=>handlePausedate(index)}>+</div>
          </div>
          <div className="alignment">
            <div className="alarmFeature  Ringtone"  onClick={()=> handleRingtone(index)}>Default ring tone</div>
          </div>
          <div className="alignment">
            <div className="alarmFeature ">vibrate</div>
            <input type="checkbox" className="Vibrate" checked={state.AlarmVibrate} onChange={(event) => handleVibrate(index, event)} />
          </div>
          <div className="alignment">
            <div className="alarmFeature">Delete</div>
            <img src="images/del-icon.webp" className="smallimg  Delete" alt="logo"  onClick={()=> handleDelete(index)}></img>
          </div>
        </Body>
      )}

        {      
         pausedate===index &&(
          <Popup>
          {/* Add the content for popup here */}
          <Header className="PopupHeader  col" >
            <div>Select Date</div>
          </Header>
          <Body className="PopupBody col">
            <div className="row">
          <div>Start Date</div>
           <div>End Date</div>
            </div>
          <Calendar className="col" >
          </Calendar>
          </Body>
          <Footer className="PopupFooter row">
             <Button className="btn alignment" >Save</Button>
             <Button className="btn alignment"  onClick={handlePausedate} >Cancel</Button>
          </Footer>
        </Popup>
        )
         }

       </Footer>
      </div>
     ))}
      </Content>
      <Floatingbtn className="FloatingBtn alignment" onClick={handleClick} id="AddAlarm">
          +
      </Floatingbtn>
      <Base>
      </Base>
      {showPopup && (
        <Popup id="AddAlarm" onClose={handleClose} onSave={handleSave}>
          {/* Add the content for popup here */}
          <Header className="PopupHeader alignment" >
            <div>Select Time</div>
          </Header>
          <Body className="PopupBody alignment">
            <input type="time" id="alarmtime" name="appt" min="00:00" max="24:00" required></input>
          </Body>
          <Footer className="PopupFooter row">
             <Button className="btn alignment" onClick={handleSave}>Save</Button>
             <Button className="btn alignment" onClick={handleClose}>Cancel</Button>
          </Footer>
        </Popup>
      )}

     
     
    </div>
  );
}

export default App;
