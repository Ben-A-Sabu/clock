import React, { useState } from "react";
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
//import Calendar from 'react-calendar';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [pausedate, setPausedate] = useState(false);

  function handleClick() {
    setShowPopup(true);
  }

  function handleClose() {
    setShowPopup(false);
  }
  
  function handleSave(){
    const alarmTime = document.getElementById("alarmtime").value;
    setAlarms([...alarms, alarmTime]);// alarms array is updated with new alarm time
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
      <Content>
      {alarms.map((alarmTime, index) => (
  <div key={index} className="element col">
    <Header className="ElementHeader alignment ">
      <div className="label">Alarm {index+1}</div>
      <div className="alignment dropdownbtn" onClick={() => handleDropdown(index)} >
        {dropdown === index ? 'v' : '^'} {/* if dropdown is true then show v else show ^*/}
      </div>
    </Header>
    <Body className="ElementBody">
      <div className="row">
        {alarmTime}
      </div>
    </Body>
    <Footer className="ElementFooter col">
      {dropdown === index && (
        <Body className="features col">
          <div className="alignment">
          <div className="daylabel alarmFeature">Every day</div>
          <input type="range" min="0" max="10"  step={10} className="On_Off alarmFeature" id="myRange"/>
          </div>
          <div className="alignment">
            <div className="day one">S</div>
            <div className="day two">M</div>
            <div className="day three">T</div>
            <div className="day four ">W</div>
            <div className="day five">T</div>
            <div className="day six">F</div>
            <div className="day seven">S</div>
          </div>
          <div className="alignment">
            <div className="alarmFeature">Pause Alarm</div>
            <div className="Pausedate" onClick={()=>handlePausedate(index)}>+</div>
          </div>
          <div className="alignment">
            <div className="alarmFeature">Default ring tone</div>
          </div>
          <div className="alignment">
            <div className="alarmFeature">vibrate</div>
            <input type="checkbox" ></input>
          </div>
          <div className="alignment">
            <div className="alarmFeature">Delete</div>
          </div>
        </Body>
      )}

        {      
         pausedate===index &&(
          <Popup>
          {/* Add the content for popup here */}
          <Header className="PopupHeader alignment" >
            <div>Select Date</div>
          </Header>
          <Body className="PopupBody alignment">
          
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
