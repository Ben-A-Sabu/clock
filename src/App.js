import React, { useState} from "react";
import './App.css';
import'./element.css';
import'./floatingbtn.css';
import './component/popup/popup.css';
import Navbar from './component/navbar';
import Content from './component/content';
import Base from './component/base';
import './component/button/button.css';
import Alarm from './alarm';
import Clock from './clock';
import Stopwatch from './stopwatch';
import Ttimer from './ttimer';


function App() {
  const[active,setActive]=useState("Alarm");

  return (
    <div className="App">
<Navbar>
    <h1>{active}</h1>
    <div></div>
</Navbar>

    <Content id="Displayarea">
    {active==="Alarm" && <Alarm/>}
    {active==="Clock" && <Clock/>}
    {active==="Stopwatch" && <Stopwatch/>}
    {active==="Timer" && <Ttimer/>}
    </Content>
   
      <Base>
            <div className="col alignment">
            <img src="images/alarm.png" id="alarm" alt="logo" onClick={()=> setActive("Alarm")}></img>
            <label htmlFor="alarm">Alarm</label>
            </div>
            <div className="col alignment ">
            <img src="images/clock.png" id="clock" alt="logo" onClick={()=>setActive("Clock")}></img>
            <label htmlFor="clock">Clock</label>
            </div>
            <div className="col alignment">
           <img src="images/stopwatch.png" id="stopwatch" alt="logo" onClick={()=>setActive("Stopwatch")}></img>
            <label htmlFor="stopwatch">Stopwatch</label>
            </div>
            <div className="col alignment">
           <img src="images/timer.png"id="timer" alt="logo" onClick={()=>setActive("Timer")}></img>
            <label htmlFor="timer">Timer</label>
            </div>
      </Base>
  
    </div>
  );
}

export default App;