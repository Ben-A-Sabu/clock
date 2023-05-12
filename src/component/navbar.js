import Header from "./header/header";

export default function Navbar(props) {
  return (
    <div className="Navcontainer">
      <Header className="row">
      {props.children}
      </Header>   
    </div>
  );
}
