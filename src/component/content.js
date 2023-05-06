
import Body from "./body/body"
export default function Content(props) {
    return(
        <div className="Contentcontainer row">
         <Body>
         {props.children}
         </Body>
        </div>
    )
}