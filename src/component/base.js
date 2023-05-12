import Footer from "./footer/footer";


export default function Base(props) {

    return(
        <div className="Basecontainer">
              <Footer className="row">
           {props.children}
           </Footer>
        </div>
    )
}