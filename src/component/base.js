import Footer from "./footer/footer";


export default function Base(props) {

    return(
          <Footer className="Basecontainer row" id={props.id}>
           {props.children}
           </Footer>
    )
}