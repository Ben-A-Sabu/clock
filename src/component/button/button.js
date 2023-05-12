

export default function Button(props) {
    return(
        <div className={props.className} onClick={props.onClick} id={props.id}>
           {props.children}
        </div>
    )
}