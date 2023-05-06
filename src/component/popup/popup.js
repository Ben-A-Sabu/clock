import './popup.css'

export default function Popup(props) {
    return (
        <div className='popupbg column' id={props.id}>
            <div className='ppcontent'> 
            {console.log(props.children)}
            {props.children}
            </div>
       </div>
    );
}