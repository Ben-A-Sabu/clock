
import Body from "./body/body"
export default function Content(props) {
    return(
         <Body id={props.id} className="Contentcontainer" >
         {props.children}
         </Body>
    )
}