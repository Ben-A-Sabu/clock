import  './body.css';
export default function Body(props) {
    return (
        <div className={props.className} id={props.id}>
            {props.children}
       </div>
    );
}