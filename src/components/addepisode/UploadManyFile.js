import { useState } from "react";
import storage from "../../config/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import NavbarMainPage from "../navbar/navbar.mainpage";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function UploadFiles() {
    const [files, setFiles] = useState([]);
    const [percent, setPercent] = useState(0)
    const { id } = useParams();
    const navigate = useNavigate();
    const choseFile = (e) => {
        let files = e.target.files;
        setFiles(files)
    }
    const formAddEpisodes = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: values => {
            let data = {
                name: values.name,
                imgs: []
            }
            let promises = [];
            for (let i = 0; i < files.length; i++) {
                const storageRef = ref(storage, `/images/${files[i].name}`);
                const uploadTask = uploadBytesResumable(storageRef, files[i]);
                promises.push(uploadTask);
            }
            Promise.all(promises).then((snapshots) => {
                snapshots.forEach((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        data.imgs.push(url);
                        if (data.imgs.length === files.length) {
                            axios.post(`http://localhost:8080/api/addepisode/${id}`, data).then(res => {
                                if (res.data.status == 'error') {

                                } else {
                                    navigate('/comicManager')
                                }
                            });
                        }
                    });
                });
            });
        }

    })

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     for(let i=0; i<files.length; i++){
    //         const storageRef = ref(storage, `/images/${files[i].name}`);
    //         const uploadTask = uploadBytesResumable(storageRef, files[i]);
    //         uploadTask.on(
    //             "state_changed",
    //             (snapshot) => {
    //                 const percent = Math.round(
    //                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //                 );
    //                 // update progress
    //                 setPercent(percent);
    //             },
    //             (err) => console.log(err),
    //             () => {
    //                 // download url
    //                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                     console.log(url);
    //                 });
    //             }
    //         );
    //     }
    // }

    return (
        <>
            <NavbarMainPage />
            <h1>Add Episode</h1>
            <form encType="multipart/form-data" onSubmit={formAddEpisodes.handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        name="name"
                        aria-describedby="emailHelp"
                        style={{ width: "500px" }}
                        onChange={formAddEpisodes.handleChange}
                        value={formAddEpisodes.values.name}
                    />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div>
                    <input type="file" name="avatar" onChange={choseFile} required multiple />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <p>{percent} % done</p>
            </form>
            {/* <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input type="file" name="avatar" onChange={choseFile} required multiple />
                <button type="submit">Submit</button>
                <p>{percent} " % done "</p>
            </form> */}
        </>
    )

}

export default UploadFiles;