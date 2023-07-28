import Header from "./header/header";

export default function Navbar(props) {
  return (
      <Header className="Navcontainer row" id={props.id}>
      {props.children}
      </Header>   
  );
}
