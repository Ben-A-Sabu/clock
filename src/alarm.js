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
import Calendar from 'react-calendar';
import './calender.css'

function Alarm() {
  const [showPopup, setShowPopup] = useState(false);
  const [alarms, setAlarms] = useState(JSON.parse(localStorage.getItem("alarms")) || []);
  const [dropdown, setDropdown] = useState(false);
  const [pausedate, setPausedate] = useState(false);
  const[schedule,setSchedule]=useState(false);
  const[Ringtone,setRingtone]=useState();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const[AlarmId, setAlarmId] = useState(JSON.parse(localStorage.getItem("AlarmId")) || 0);
  const[editAlarm,setEditAlarm]=useState();
  const[label,setLabel]=useState("");
  const[EditSchedule,setEditSchedule]=useState(false);
  const[EditPause,setEditPause]=useState(false);
  const[AlarmPopup,setAlarmPopup]=useState(-1);
  const[AlarmAudio,setAlarmAudio]=useState();
  


  function handleAlarmPopup(index) {
    setAlarmPopup(index === AlarmPopup ? null : index);
  }
  
 function  handleAlarmId(){
    localStorage.setItem("AlarmId", JSON.stringify(AlarmId+1));
    setAlarmId(AlarmId+1);
  }
  

  function ringAlarm() {
    const alarms = JSON.parse(localStorage.getItem("alarms")) || [];
    const now = new Date();
    for (let i = 0; i < alarms.length; i++) {
      const alarm = alarms[i];
      
      // Split the alarm time string into hours and minutes
      const [hours, minutes] = alarm.AlarmTime.split(':');
      const alarmTime = new Date();
      alarmTime.setHours(hours, minutes, 0, 0);
  
      // Check if the current time matches the alarm time
      if (now.getHours() === alarmTime.getHours() && now.getMinutes() === alarmTime.getMinutes() &&  (alarm.AlarmActive===1)) {
        // Check if the alarm is paused or scheduled
        if (alarm.Puase === true) {
          // Check if the current date is within the pause range
          const pauseStartDate = new Date(alarm.pauseStartDate);
          const pauseEndDate = new Date(alarm.pauseEndDate);
          if (now >= pauseStartDate && now <= pauseEndDate) {

            continue; // Skip this alarm and move on to the next one
          }
         else if(now > pauseEndDate){
            updateProperty("Puase", false, i);
            updateProperty("PauStart", "Start Date", i);
            updateProperty("PauEnd", "End Date", i);
            }
        } else if (alarm.Schedule === true) {
          // Check if the current date is within the scheduled range
          const scheduleStartDate = new Date(alarm.ScheduleStart);
          const scheduleEndDate = new Date(alarm.ScheduleEnd);
          if (now >= scheduleStartDate && now <= scheduleEndDate) {

            handleAlarmPopup(i);        // Create a new Audio object and set the source to the alarm sound file
            const audio = new Audio(alarm.AlarmRingtone);
             audio.loop = true; // Set the loop property to true to make the audio repeat continuously
             audio.play(); // Start playing the audio
             setAlarmAudio(audio);
         
          } else {
            
            // Set the alarm to inactive if it's not within the scheduled range
            updateProperty("AlarmActive", 0, i);
            updateProperty("Schedule", false, i);
            updateProperty("ScheduleStart", "Start Date", i);
            updateProperty("ScheduleEnd", "End Date", i);
            continue; // Skip this alarm and move on to the next one
          }
        }
        // Check if the alarm is set to ring on the current day
        if (alarm.AlarmDays.length !== 0 && !alarm.AlarmDays.includes(now.getDay())) {
          continue; // Skip this alarm and move on to the next one
        }
            
         else{
          handleAlarmPopup(i);        // Create a new Audio object and set the source to the alarm sound file
        const audio = new Audio(alarm.AlarmRingtone);
         audio.loop = true; // Set the loop property to true to make the audio repeat continuously
         audio.play(); // Start playing the audio
         setAlarmAudio(audio);
         }

      }
    }
  }
  

  function ManageAlarmPaused(index, value, event) {  // to snooze and stop the alarm
    // Stop the alarm if the slider value is positive
    var id=alarms[index].AlarmId;
 
    if (value === "1") {
      const audio = AlarmAudio;
      audio.pause();
      setAlarmAudio(null); // Remove the audio element
      handleAlarmPopup(null); // Hide the alarm popup
      if (alarms[index].AlarmDays.length === 0 && alarms[index].ScheduleStart === "Start Date") {
        updateProperty("AlarmActive", 0, index);
      }
    }

    else if (value === "-1") {
      var audio = AlarmAudio;
      audio.pause();
      setAlarmPopup(-1)
      event.target.value = 0;
      setTimeout(() => {
        var currentalarms=JSON.parse(localStorage.getItem("alarms")) || [];
        if(currentalarms[index] && currentalarms[index].AlarmId === id){
          setAlarmPopup(index)
          audio.play();
        }
        else{
          setAlarmPopup(null)
        }
      }, 1 * 60 * 1000); // Snooze for 5 minutes
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

    updateProperty("AlarmRingtone",Ringtone,index)
  }


  const handleDelete = (index) => {

    // Get alarms from local storage or default to an empty array
    var alarmArray = JSON.parse(localStorage.getItem("alarms")) || [];
    
    // Filter out the alarm at the given index
    const newAlarmArray = alarmArray.filter((_, i) => i !== index);

    // Update the state
    setAlarms(newAlarmArray);

    // Update local storage
    localStorage.setItem("alarms", JSON.stringify(newAlarmArray));

    // Continue with your logic...
    setDropdown(false);
};

  

  const handleAlarmPaused = (index,value) => {
    const newPauseAlarm = parseInt(value);
    updateProperty("AlarmActive", newPauseAlarm, index);
    // remove the audio element if the slider value is positive
    
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
      {  AlarmId: AlarmId,
        AlarmTime: alarmTime,
        AlarmDays: [],
        AlarmActive: 1,
        AlarmRingtone: "Audio/mixkit-alarm-digital-clock-beep-989.wav",
        AlarmVibrate: "",
        PauseStart: "Start Date",
        PauseEnd: "End Date",
        ScheduleStart:"Start Date",
        ScheduleEnd:"End Date",
        AlarmLabel:"",
        Puase:false,
        Schedule:false,
      },
    ]);
  
    alarmArray.push({
      AlarmId: AlarmId,
      AlarmTime: alarmTime,
      AlarmDays: [],
      AlarmActive: 1,
      AlarmRingtone: "Audio/mixkit-alarm-digital-clock-beep-989.wav",
      AlarmVibrate: "",
      PauseStart: "Start Date",
      PauseEnd: "End Date",
      ScheduleStart:"Start Date",
      ScheduleEnd:"End Date",
      AlarmLabel:"",
      Puase:false,
      Schedule:false,
    });
  
    localStorage.setItem("alarms", JSON.stringify(alarmArray));
    setShowPopup(false);
  }

  function Updatealarm(index){
    updateProperty("AlarmTime", document.getElementById("Edittime").value, index)
    updateProperty("AlarmActive", 1, index)
    handleEditAlarm();
  }

  function UpdateLabel(index){
    updateProperty("AlarmLabel", document.getElementById("AlarmLabel").value, index)
    handlelabel();
  }

  const [datetype, setDatetype] = useState("Start");

  function Update_Sche_Paus_date(index,datetype,value,type){

    if (datetype === "Start" && type==="Pause") {
      document.getElementById("P_StartDate").innerHTML=value.toLocaleDateString('en-GB');
        setDatetype("End");
      return;
    }
    if (datetype === "End" && type==="Pause") {
      document.getElementById("P_EndDate").innerHTML=value.toLocaleDateString('en-GB');
        setDatetype("Start");
      return;
    }
    if (datetype === "Start" && type==="Schedule") {
      document.getElementById("S_StartDate").innerHTML=value.toLocaleDateString('en-GB');
        setDatetype("End");
      return;
    }
    if (datetype === "End" && type==="Schedule") {
        document.getElementById("S_EndDate").innerHTML=value.toLocaleDateString('en-GB');
        setDatetype("Start");
      return;
    }

  }


  function handleSaveDate(index, type, value1, value2) {
    var startdateStr = value1.innerHTML;
    var enddateStr = value2.innerHTML;
  
    // Transform "DD/MM/YYYY" to "YYYY-MM-DD"
    var startdateParts = startdateStr.split('/');
    var startdate = new Date(`${startdateParts[2]}-${startdateParts[1]}-${startdateParts[0]}`);
  
    var enddateParts = enddateStr.split('/');
    var enddate = new Date(`${enddateParts[2]}-${enddateParts[1]}-${enddateParts[0]}`);
  
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // set the time to 00:00:00.000
  
    // Check if startdate is less than or equal to enddate and if startdate is greater than or equal to currentDate
    if (startdate <= enddate && startdate >= currentDate) {
      if(type==="Pause"){
        updateProperty("Puase", true, index);
        updateProperty("PauStart", startdateStr, index);
        updateProperty("PauEnd",enddateStr, index);
        handlePausedate(index);
      }
      else{
        updateProperty("Schedule", true, index);
        updateProperty("ScheduleStart",startdateStr, index);
        updateProperty("ScheduleEnd", enddateStr, index);
        handleSceduledate(index);
      }
    }
    else {
      // Handle the case where the dates are not in the correct order or the startdate is in the past
     alert("Please select the correct date");
    }
  }
  

 function CancelPaOrSch(index,type){// cancel pause or schedule
  if(type==="Pause"){
    updateProperty("Puase", false, index);
    updateProperty("PauStart", "Start Date", index);
    updateProperty("PauEnd","End Date", index);
   
  }
    else{
      updateProperty("Schedule", false, index);
      updateProperty("ScheduleStart","Start Date", index);
      updateProperty("ScheduleEnd", "End Date", index);
         }
  }

  function formatDate(dateString) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateParts = dateString.split('/');
    const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
    
    let day = dateObject.getDate();
    let monthIndex = dateObject.getMonth();
    
    return `${day} ${monthNames[monthIndex]}`;
 }




  
  function handleDropdown(index) {
    setDropdown(index === dropdown ? null : index);// if dropdown is true then set it to null else set it to index
  }

  function handlePausedate(index) {
    setPausedate(index === pausedate ? null : index);// if dropdown is true then set it to null else set it to index
    setDatetype("Start");
  }
  
  function handleEditAlarm(index){
    setEditAlarm(index === editAlarm ? null : index);
  }

  function handlelabel(index){
    setLabel(index === label ? null : index);
  }

  function handleSceduledate(index){
    setSchedule(index === schedule ? null : index);
    setDatetype("Start");
  }

  function handleEditSchedule(index){
    setEditSchedule(index === EditSchedule ? null : index);
    setSchedule(index === schedule ? null : index);
  }

  function handleEditPause(index){
    setEditPause(index === EditPause ? null : index);
    setPausedate(index === pausedate ? null : index);
  }


  return (
    <>
        {alarms.map((state, index) => (
      <div key={index} className="element">
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
            <Button className="btn alignment" onClick={()=>handleEditAlarm(index)} >Cancel</Button>
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
            <div className="row" >
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
          { (state.AlarmDays.length!==0 && state.Puase===false) && ( 
            <div className="alignment">
              <div className="alarmFeature">Pause Alarm</div>
              <div className="Pausedate" onClick={()=>handlePausedate(index)}>+</div>
            </div>
            )}
                { (state.AlarmDays.length===0 && state.Schedule===false) && ( 
            <div className="alignment">
              <div className="alarmFeature">Schedule Alarm</div>
              <div className="Pausedate" onClick={()=>handleSceduledate(index)}>+</div>
            </div>
            )}
           { (state.AlarmDays.length!==0 && state.Puase===true) && ( 
            <div className="alignment">
              <div className="alarmFeature" onClick={()=>handlePausedate(index)}>Edit Pause Alarm</div>
              <div className="alarmFeature"  onClick={()=>handlePausedate(index)}>{formatDate (state.PauseStart)}-{formatDate(state.PauseEnd)}</div>
              <div className="Pausedate" onClick={()=>CancelPaOrSch(index,"Pause")}>-</div>
            </div>
            )}
                { (state.AlarmDays.length===0 && state.Schedule===true) && ( 
            <div className="alignment">
              <div className="alarmFeature" onClick={()=>handleSceduledate(index)}>Edit Schedule Alarm</div>
              <div className="alarmFeature"  onClick={()=>handleSceduledate(index)}>{formatDate (state.ScheduleStart)}-{formatDate(state.ScheduleEnd)}</div>
              <div className="Pausedate" onClick={()=>CancelPaOrSch(index,"Schedule")}>-</div>
            </div>
            )}
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
         ( pausedate===index ) &&(
            <Popup>
            {/* Add the content for popup here */}
            <Header className="PopupHeader alignment" >
              <div>Select Date</div>
              {document.getElementById("P_StartDate")!==" " &&(
                <Button className="btn alignment"  onClick={()=>handleEditPause(index)}><img src="images/edit-icon.webp" className="smallimg" alt="edit"/> </Button>
              )}
            </Header>
            <Body className="PopupBody col">
              <div className="row">
            <div id="P_StartDate">{state.PauseStart}</div>
            <div id="P_EndDate">{state.PauseEnd}</div>
              </div>
            <Calendar className="col" onChange={(date)=> Update_Sche_Paus_date(index,datetype,date,"Pause")} >
            </Calendar>
            </Body>
            <Footer className="PopupFooter row">
              <Button className="btn alignment" onClick={()=> handleSaveDate(index,"Schedule",document.getElementById("P_StartDate"),document.getElementById("P_EndDate"))} >Save</Button>
              <Button className="btn alignment"onClick={()=>handlePausedate(index)} >Cancel</Button>
            </Footer>
          </Popup>
          )
          }

        {      
          schedule===index &&(
            <Popup>
            {/* Add the content for popup here */}
            <Header className="PopupHeader alignment" >
              <div>Select Date</div>
              {document.getElementById("P_StartDate")!==" " &&(
                <Button className="btn alignment"  onClick={()=> handleEditSchedule(index)}><img src="images/edit-icon.webp" className="smallimg" alt="edit"/> </Button>
              )}
            </Header>
            <Body className="PopupBody col">
              <div className="row">
              <div id="S_StartDate">{state.ScheduleStart}</div>
              <div id="S_EndDate">{state.ScheduleEnd}</div>
            
              </div>
            <Calendar className="col" onChange={(date)=>Update_Sche_Paus_date(index,datetype,date,"Schedule")} >
            </Calendar>
            </Body>
            <Footer className="PopupFooter row">
              <Button className="btn alignment" onClick={()=> handleSaveDate(index,"Schedule",document.getElementById("S_StartDate"),document.getElementById("S_EndDate"))} >Save</Button>
              <Button className="btn alignment" onClick={()=>handleSceduledate(index)} >Cancel</Button>
            </Footer>
          </Popup>
          )
          }

         
{      
         (EditPause===index ) &&(
            <Popup>
            {/* Add the content for popup here */}
            <Header className="PopupHeader alignment" >
              <div>Select Date</div>
            </Header>
            <Body className="PopupBody col">
           
            <div id="P_StartDate">{state.PauseStart}</div>
            <input type="date" id="P_StartDate" className="TimeInput" name="appt" min="00:00" max="24:00"  defaultValue={state.PauseStart}></input>
            <div id="P_EndDate">{state.PauseEnd}</div>
            <input type="date" id="P_EndDate" className="TimeInput" name="appt" min="00:00" max="24:00"  defaultValue={state.PauseEnd}></input>
          
            </Body>
            <Footer className="PopupFooter row">
              <Button className="btn alignment" onClick={()=> handleSaveDate(index,"Schedule",document.getElementById("P_StartDate"),document.getElementById("P_EndDate"))} >Save</Button>
              <Button className="btn alignment"onClick={()=>handleEditPause(index)} >Cancel</Button>
            </Footer>
          </Popup>
          )
          }

        {      
          EditSchedule===index &&(
            <Popup>
            {/* Add the content for popup here */}
            <Header className="PopupHeader alignment" >
              <div>Select Date</div>
            </Header>
            <Body className="PopupBody col">
              <div id="S_StartDate">{state.ScheduleStart}</div>
              <input type="date" id="S_StartDate" className="TimeInput" name="appt" min="00:00" max="24:00"  defaultValue={state.ScheduleStart}></input>
              <div id="S_EndDate">{state.ScheduleEnd}</div>
              <input type="date" id="S_EndDate" className="TimeInput" name="appt" min="00:00" max="24:00"  defaultValue={state.ScheduleEnd}></input>

            </Body>
            <Footer className="PopupFooter row">
              <Button className="btn alignment" onClick={()=> handleSaveDate(index,"Schedule",document.getElementById("S_StartDate"),document.getElementById("S_EndDate"))} >Save</Button>
              <Button className="btn alignment" onClick={()=>handleEditSchedule(index)} >Cancel</Button>
            </Footer>
          </Popup>
          )
          }



         {
          AlarmPopup===index &&(
            <Popup id="StopSnooze">
            {/* Add the content for popup here */}
            <Body className="PopupBody col">
              <div className="row">{state.AlarmTime}</div>
             </Body>
            <Footer className="PopupFooter alignment">
            <div className="col">
              <input type="range" min="-1" max="1" step={1} defaultValue={0} className="On_Off PS alarmFeature" onChange={(event) => ManageAlarmPaused(index,event.target.value,event)}/>
              <div className="row alignment">
                <div  className="Snooze">Snooze</div>
                <div className="Stop">Stop</div>
              </div>
            </div>
        
            </Footer>
            </Popup>
            )   
         }


        </Footer>
        </div>
      ))}
         
     
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

    
  
    </>
  );
}

export default Alarm;