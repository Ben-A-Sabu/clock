
import Body from "./body/body"
export default function Content(props) {
    return(
        <div className="Contentcontainer row" id={props.id}>
         <Body id={props.id} className={props.className} >
         {props.children}
         </Body>
        </div>
    )
}