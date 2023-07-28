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






function Clock() {
  const [showPopup, setShowPopup] = useState(false);
  const [clock, setClock] = useState(JSON.parse(localStorage.getItem('WorldClock')) || []);

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(async () => {
      const updatedClock = await Promise.all(clock.map(async (country) => {
        const time = await getTimeForLocation(country.CountryName);
        return { CountryName: country.CountryName, Time: time };
      }));
      setClock(updatedClock);
      localStorage.setItem('WorldClock', JSON.stringify(updatedClock));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [clock]);

  function handleClick() {
    setShowPopup(true);
  }

  function handleClose() {
    setShowPopup(false);
  }

  async function getTimeForLocation(location) {
    try {
      const apiKey = 'OMAFT9JIB1OO'; // Replace with your API key
      const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${location}`);
      const data = await response.json();
      const time = new Date(data.formatted).toLocaleTimeString();
      return time;
    } catch (error) {
      console.error(`Error getting time for location ${location}: ${error}`);
      return null;
    }
  }

  async function handleSave() {
    const clockArray = JSON.parse(localStorage.getItem('WorldClock')) || [];

    // Get the country name from the input field
    const countryName = document.getElementById('countryname').value;

    // Check if the country name is empty or not
    if (countryName === '') {
      alert('Please enter a country name');
      return;
    }

    // Check if the country name already exists in the array or not
    const isCountryExists = clockArray.some((country) => country.CountryName === countryName);
    if (isCountryExists) {
      alert('Country already exists');
      return;
    }

    // Get the current time for the country
    const time = await getTimeForLocation(countryName);

    // Add the country name and time to the clock array
    clockArray.push({ CountryName: countryName, Time: time });

    setClock(clockArray);

    localStorage.setItem('WorldClock', JSON.stringify(clockArray));
    setShowPopup(false);

    // Display the clock array
    console.log(clockArray);
  }

  function handleDelete(index) {
    const clockArray = JSON.parse(localStorage.getItem('WorldClock')) || [];
    clockArray.splice(index, 1);
    setClock(clockArray);
    localStorage.setItem('WorldClock', JSON.stringify(clockArray));
  }


  return (
    <>
      {clock.map((clock, index) => (
        <div className="element col" key={index}>
          <Header className="ElementHeader alignment ">
          <img src="images/del-icon.webp" className="smallimg  Delete" alt="logo"  onClick={()=> handleDelete(index)}></img>
          </Header>
          <Body className="col ElementBody">
            <div>{clock.CountryName}</div>
            <div>{clock.Time}</div>
          </Body>
          <Footer className="ElementFooter col">
          </Footer>
        </div>
      ))}
    
      <Footer/>
      <Floatingbtn className="FloatingBtn alignment"  id="AddClock" onClick={()=>handleClick()}> +</Floatingbtn>

      {showPopup && (
        <Popup id="AddAlarm" onClose={handleClose} onSave={handleSave}>
          <Header className="PopupHeader alignment" >
            <div>Add Clock</div>
          </Header>
          <Body className="PopupBody alignment">
            <input type="text" id="countryname" className="TimeInput" name="appt" placeholder="Search Country" required></input>
          </Body>
          <Footer className="PopupFooter row">
            <Button className="btn alignment" onClick={handleSave}>Add</Button>
            <Button className="btn alignment" onClick={handleClose}>Cancel</Button>
          </Footer>
        </Popup>
      )}
    </>
  );
}

export default Clock;
