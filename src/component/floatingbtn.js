import Button from "./button/button";

export default function Floatingbtn(props) {
    return (
      
        <Button className={props.className} onClick={props.onClick}  id={props.id}>
        {props.children}
        </Button>
     
    );
    }