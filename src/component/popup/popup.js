import './popup.css'

export default function Popup(props) {
    return (
        <div className='popupbg column' >
            <div className='ppcontent' id={props.id}> 
            {console.log(props.children)}
            {props.children}
            </div>
       </div>
    );
}