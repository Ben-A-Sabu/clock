import Footer from "./footer/footer";

export default function Base(props) {
    return(
        <div className="Basecontainer">
           {props.children}
            <Footer className="row">
            <img src="images/alarm.png" alt="logo"></img>
            <img src="images/clock.png" alt="logo"></img>
           <img src="images/stopwatch.png" alt="logo"></img>
           <img src="images/timer.png" alt="logo"></img>
            </Footer>
        </div>
    )
}