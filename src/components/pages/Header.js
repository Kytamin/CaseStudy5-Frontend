import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css"
import Navbar from "../navbar/navbar";
import NavbarMainPage from "../navbar/navbar.mainpage";
function Header() {
    const user = useSelector(state => state.auth.userLogin)
    return (
        <div style={{ objectFit: 'cover',width:"100vw",height:"100vh",backgroundImage:'url("https://cf.shopee.vn/file/6dba42c1f3e5c7d567f439138608a031")'}}>
        <Navbar/>
        <h2 style={{textAlign:"center"}}><button type="button" class="btn btn-outline-info"><a>Get Start</a></button></h2>
        </div>
        )
}
export default Header;