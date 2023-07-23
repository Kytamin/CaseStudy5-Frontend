import axios from "axios";

class Comicservice {
    static async getListComic() {
        return  await axios.post('http://localhost:8080/api/listcomic')
    }
    static async addComic(data){
        return await axios.post('http://localhost:8080/api/addcomic',data)
    }
    static async getListAdventure(){
        return  await axios.post('http://localhost:8080/api/listadventure')
    }
}

export default Comicservice