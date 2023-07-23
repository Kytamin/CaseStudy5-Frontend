import { useState } from "react";
import storage from "../../config/firebase.config";
import "bootstrap/dist/css/bootstrap.css"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Comicservice from "../../services/comic.service";
import NavbarMainPage from "../navbar/navbar.mainpage";
function UploadFile() {
    const [errMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [percent, setPercent] = useState(0)
    const choseFile = (e) => {
        let file = e.target.files[0];
        setFile(file)
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const storageRef = ref(storage, `/images/${file.name}`);
    //     const uploadTask = uploadBytesResumable(storageRef, file);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             const percent = Math.round(
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             );
    //             setPercent(percent);
    //         },
    //         (err) => console.log(err),
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                 console.log(url);
    //                 setAvatar(url)
    //             });
    //         }
    //     );
    // }
    const formAddComic = useFormik({
        initialValues: {
            name: "",
            category: "",
        },
        onSubmit: values => {

            const storageRef = ref(storage, `/images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        let data = {
                            name: values.name,
                            category: values.category,
                            avatar: url
                        }
                        Comicservice.addComic(data).then(res => {
                            if (res.data.status == 'error') {
                                setErrorMessage(res.data.message)
                            } else {
                                navigate('/comicManager')
                            }
                        })
                    });
                }
            );

        }
    })

    return (
        <>
            <NavbarMainPage />
            <button type="submit" class="btn btn-primary"><a style={{ textDecoration: "none", color: "inherit" }} href="/comicManager">Back</a></button>
            <h1>Add Comic</h1>
            <form encType="multipart/form-data" onSubmit={formAddComic.handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        name="name"
                        aria-describedby="emailHelp"
                        style={{ width: "500px" }}
                        onChange={formAddComic.handleChange}
                        value={formAddComic.values.name}
                    />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Category</label>
                    <input type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        name="category"
                        style={{ width: "500px" }}
                        onChange={formAddComic.handleChange}
                        value={formAddComic.values.category}
                    />
                </div>
                <div>
                    <input type="file" name="avatar" onChange={choseFile} required />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <p>{percent} % done</p>
            </form>
        </>
    )
}

export default UploadFile