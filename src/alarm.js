import React, { useState,useEffect } from "react";
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
import Calendar from 'react-calendar';
import './calender.css';

function Alarm() {

  const [showPopup, setShowPopup] = useState(false);
  const [alarms, setAlarms] = useState(JSON.parse(localStorage.getItem("alarms")) || []);
  const [dropdown, setDropdown] = useState(false);
  const [pausedate, setPausedate] = useState(false);
  const[Ringtone,setRingtone]=useState();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [AlarmId, setAlarmId] = useState(JSON.parse(localStorage.getItem("AlarmId")) || 0);
  const[editAlarm,setEditAlarm]=useState();
  const[label,setLabel]=useState("");


 function  handleAlarmId(){
    localStorage.setItem("AlarmId", JSON.stringify(AlarmId+1));
    setAlarmId(AlarmId+1);
  }
  

  function ringAlarm() {
    const alarms = JSON.parse(localStorage.getItem("alarms")) || [];
    const now = new Date();
    for (let i = 0; i < alarms.length; i++) {
      const alarm = alarms[i];
      console.log(alarm);
      
      // Split the alarm time string into hours and minutes
      const [hours, minutes] = alarm.AlarmTime.split(':');
      const alarmTime = new Date();
      alarmTime.setHours(hours, minutes, 0, 0);
  
      // Check if the current time matches the alarm time
      if (now.getHours() === alarmTime.getHours() && now.getMinutes() === alarmTime.getMinutes() &&  (alarm.AlarmActive===1) ) {
        // Create a new Audio object and set the source to the alarm sound file
        // if AlarmDay is not empty then check whether the current day is present in the AlarmDay array
        if(alarm.AlarmDays.length!==0){
          if(alarm.AlarmDays.includes(now.getDay())){
             const audio = new Audio(alarm.AlarmRingtone);
             audio.play();
           } // Play the audio
          }
           else{
            const audio = new Audio(alarm.AlarmRingtone);
            audio.play();
           }

          // check whether AlarmDays is empty or not , if empty then set AlarmActive to 0 else set AlarmActive to 1
          if(alarm.AlarmDays.length===0){
            updateProperty("AlarmActive", 0, i);
          }


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
  },);


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

      console.log(Ringtone);
    
    updateProperty("AlarmRingtone",Ringtone,index)
  }


  const handleDelete=(index)=>{
    // remove the alarm from the array
    var alarmArray = JSON.parse(localStorage.getItem("alarms")) || [];
    setAlarms(prevAlarms => prevAlarms.filter((alarmArray, i) => i !== index));
    localStorage.setItem("alarms", JSON.stringify(alarmArray.filter((alarmArray, i) => i !== index)));
    setDropdown(false);

  }

  const handleAlarmPaused = (index,value) => {
    const newPauseAlarm = parseInt(value);
    updateProperty("AlarmActive", newPauseAlarm, index);
  };
  
  function alarmdayclick(value, index) {
    // if the value is already present, remove from array
   if(alarms[index].AlarmDays.includes(value)){
    updateProperty("AlarmDays", alarms[index].AlarmDays.filter((day) => day !== value), index);
   }
    else{
      // if the value is not present, add to array
      updateProperty("AlarmDays", [...alarms[index].AlarmDays, value], index);
    }

  }

   
  function handleVibrate(index,event){
    const checkboxValue = event.target.checked;
    updateProperty("AlarmVibrate", checkboxValue, index);
  } 
  
  function handleClick() {
    setShowPopup(true);
  }
  
  function handleClose() {
    setShowPopup(false);
  }
  
  function updateProperty(property, value, index) {
    setAlarms(prevAlarms => {
      const newAlarms = prevAlarms.map((alarm, i) => {
        if (i === index) {
          return {  ...alarm,[property]: value,};
        }
        return alarm;
      });
      localStorage.setItem("alarms", JSON.stringify(newAlarms));
      return newAlarms;
    });
  }
  
  
  console.log(alarms);
  
  function handleSave() {
    const alarmTime = document.getElementById("alarmtime").value;
    const alarmArray = JSON.parse(localStorage.getItem("alarms")) || [];
    if(alarmTime===""){
      alert("Please select the time");
      return;
    }
    handleAlarmId();
  
    setAlarms(prevAlarms => [
      ...prevAlarms,
      { AlarmId: AlarmId,
        AlarmTime: alarmTime,
        AlarmDays: [],
        AlarmActive: 1,
        AlarmRingtone: "Audio/mixkit-alarm-digital-clock-beep-989.wav",
        AlarmVibrate: "",
        AlarmPauseStart: "",
        AlarmPauseEnd: "",
        AlarmDate:new Date().toLocaleString(),
        AlarmLabel:"",
      },
    ]);
  
    alarmArray.push({
      AlarmId: AlarmId,
      AlarmTime: alarmTime,
      AlarmDays: [],
      AlarmActive: 1,
      AlarmRingtone: "Audio/mixkit-alarm-digital-clock-beep-989.wav",
      AlarmVibrate: "",
      AlarmPauseStart: "",
      AlarmPauseEnd: "",
      AlarmDate:new Date().toDateString(),
      AlarmLabel:"",
    });
  
    localStorage.setItem("alarms", JSON.stringify(alarmArray));
    setShowPopup(false);
  }

  function Updatealarm(index){
    updateProperty("AlarmTime", document.getElementById("Edittime").value, index)
    handleEditAlarm();
  }

  function UpdateLabel(index){
    updateProperty("AlarmLabel", document.getElementById("AlarmLabel").value, index)
    handlelabel();
  }
  
  
  function handleDropdown(index) {
    setDropdown(index === dropdown ? null : index);// if dropdown is true then set it to null else set it to index
  }

  function handlePausedate(index) {
    setPausedate(index === pausedate ? null : index);// if dropdown is true then set it to null else set it to index
  }
  
  function handleEditAlarm(index){
    setEditAlarm(index === editAlarm ? null : index);
  }

  function handlelabel(index){
    setLabel(index === label ? null : index);
  }



  return (
    <div className="App">

      <Content id="Maincontent">
        {alarms.map((state, index) => (
      <div key={index} className="element col">
      <Header className="ElementHeader alignment ">
        <div className="label">{state.AlarmLabel}</div>
        <div className="alignment dropdownbtn" onClick={() => handleDropdown(index)} >
          {dropdown === index ? 'v' : '^'} {/* if dropdown is true then show v else show ^*/}
        </div>

            { label===index &&(
          <Popup >
          {/* Add the content for popup here */}
          <Header className="PopupHeader alignment" >
            <div>Edit Label</div>
          </Header>
          <Body className="PopupBody alignment">
          <input type="Text"className="TimeInput" id="AlarmLabel" name="appt" defaultValue={state.AlarmLabel}/>
          </Body>
          <Footer className="PopupFooter row">
          <Button className="btn alignment" onClick={() =>UpdateLabel(index)}>Save</Button>
          <Button className="btn alignment" onClick={()=>handlelabel(index)} >Cancel</Button>
          </Footer>
        </Popup>
              )}

      </Header>
      <Body className="ElementBody">
        <div className="row" onClick={()=>handleEditAlarm(index)}>
          {state.AlarmTime}
      </div>

      {    editAlarm===index &&(
            <Popup >
            {/* Add the content for popup here */}
            <Header className="PopupHeader alignment" >
              <div>Select Time</div>
            </Header>
            <Body className="PopupBody alignment">
            <input type="time" id="Edittime" className="TimeInput" name="appt" min="00:00" max="24:00"  defaultValue={state.AlarmTime}></input>
            </Body>
            <Footer className="PopupFooter row">
            <Button className="btn alignment" onClick={() =>Updatealarm(index)}>Save</Button>
            <Button className="btn alignment" onClick={()=>handleEditAlarm()} >Cancel</Button>
            </Footer>
          </Popup>
          )}

      </Body>
      <Footer className="ElementFooter col">
      <div className="alignment">
            <div className="daylabel alarmFeature">{state.AlarmDays.map((day) => weekdays[day]).join(", ")}</div>
            <input type="range" min="0" max="1" step={1} defaultValue={state.AlarmActive} className="On_Off alarmFeature" onChange={(event) => handleAlarmPaused(index, event.target.value)}/>
        </div>
      

        {dropdown === index && (
          <Body className="features col">
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
              <div className="alarmFeature">Label</div>
              <img src="images/label_icon.png" className="smallimg" alt="logo"  onClick={()=> handlelabel(index)}></img>
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
        
        {showPopup && (
          <Popup id="AddAlarm" onClose={handleClose} onSave={handleSave}>
            {/* Add the content for popup here */}
            <Header className="PopupHeader alignment" >
              <div>Select Time</div>
            </Header>
            <Body className="PopupBody alignment">
              <input type="time" id="alarmtime" className="TimeInput" name="appt" min="00:00" max="24:00" required></input>
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

export default Alarm;
