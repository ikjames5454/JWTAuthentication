import axios from "axios"

class UserService{
    static BASE_URL = "http://localhost:8080"
   

    static async login(email, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password})
            console.log("Login Successful: ", response)
            return response.data;
            

        }catch(err){
            console.log("Login UnSuccessful: ", err)
            throw err;
            
        }
    }

    static async register(userData, token){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log("Registration Successful: ", response)
            return response.data;
        }catch(err){
            console.log("Registration UnSuccessful: ", err)
            throw err;
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log("Get All Users Successful: ", response)
            return response.data;
        }catch(err){
            console.log("Get All Users Unsuccessful: ", err)
            throw err;
        }
    }


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminUser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log("Get Profile Successful: ", response)
            return response.data;
        }catch(err){
            console.log("Get Profile Unsuccessful: ", err)
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log("Get User by Id Successful: ", response)
            return response.data;
        }catch(err){
            console.log("Get User by Id Unsuccessful: ", err)
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log("delete Users  Successful: ", response)
            return response.data;
        }catch(err){
            console.log("delete Users Successful: ", err)
            throw err;
        }
    }


    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        console.log("LogOut Successful")
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        console.log("token: ",token)
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UserService;