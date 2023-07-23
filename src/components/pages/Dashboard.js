import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css"
import Navbar from "../navbar/navbar";
import NavbarMainPage from "../navbar/navbar.mainpage";
import Adventure from "../cardComic/adventureComic";
import Background from "../backgroud/backgroud";
import Detective from "../cardComic/detectiveComic";

function Dashboard() {
    const user = useSelector(state => state.auth.userLogin)
    return (
        <div className="my-image" style={{width:"100vw",height:"100vh",objectFit: 'cover'}}>
            <NavbarMainPage />
            <Background/>
            <h4>Adventure</h4>
            <Adventure />
            <h4>Detective</h4>
            <Detective/>
        </div>
    )
}
export default Dashboard;