import conf from "../conf/conf";
import { ID, Client, Account } from "appwrite";

export class AuthService {
    client = new Client()
    account 

    constructor() {
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({name, email, password}) {
        try{
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name    
            )

            return user
            
        }catch(error) {
            console.log(error)
        }

        console.log("createAccount called");
    }

    async login({email, password}) {
        try{
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        }catch(error) {
            console.log(error)
        }
    }

    async getUser() {
        try{
            return await this.account.get()
        }catch(error) {
            console.log(error)
        }
    }

    async delete() {
        try{
            return await this.account.deleteSessions()
        }catch(error) {
            console.log(error)
        }
    }
}

const authService = new AuthService()
export default authService