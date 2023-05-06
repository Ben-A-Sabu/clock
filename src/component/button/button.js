

export default function Button(props) {
    return(
        <div className={props.className} onClick={props.onClick}>
           {props.children}
        </div>
    )
}