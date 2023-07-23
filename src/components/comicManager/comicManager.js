import "bootstrap/dist/css/bootstrap.css"
import Navbar from "../navbar/navbar";
import Comicservice from "../../services/comic.service";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NavbarMainPage from "../navbar/navbar.mainpage";

function ComicManager() {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/api/listcomic").then((res) => {
            setList(res.data);
        });
    }, []);
    return (
        <>
            <NavbarMainPage/>
            <button type="button" class="btn btn-primary btn-lg"><a style={{ textDecoration: "none", color: "inherit" }} href="/addComic">Add Comic</a></button>
            <table class="table table-striped table-bordered table-hover text-center align-middle">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {list &&
                        list.map((element, index) => (
                            <tr key={index}>
                                <td>{element.name}</td>
                                <td>{element.category}</td>
                                <td class="col-1"><img src={element.avatar} class="img-fluid" /></td>
                                <td><button><a  style={{ textDecoration: "none", color: "inherit" }}>Add Episode</a></button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}
export default ComicManager