import Footer from "./footer/footer";


export default function Base(props) {

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