import Header from "./header/header";

export default function Navbar(props) {
  return (
    <div className="Navcontainer">
      {props.children}
      <Header className="row">
        <h1>Alarm</h1>
        <div>:</div>
      </Header>   
    </div>
  );
}
