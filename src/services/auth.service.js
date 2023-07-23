import axios from "axios";

class AuthService {
    static async login(data) {
        return  await axios.post('http://localhost:8080/api/login', data)
    }
    static async register(data){
         return await axios.post('http://localhost:8080/api/register',data)
    }

    static async getProfile() {
        let token = localStorage.getItem('token');
        return await axios.post('http://localhost:8081/api/me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
}

export default AuthService