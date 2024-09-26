import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js"

export class AuthService {
     client = new Client()
     account;

     constructor(){
        this.client.setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId); 

        this.account = new Account(this.client)
     }

     async createAccount({email, password, name}){
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name )
           if(userAccount){
            return this.login({email, password})
           }
           else{
            return userAccount
           }
        } catch (error) {
            throw error
        }
     }

     async login({email, password}){
        try {
           return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
     }

     async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentuser :: error", error)
        }

        return null 

        /* Note: if you had written "throw error" instead of console.log()
        then this "return null" won't work and "unreachable code detected" will 
        be displayed.

        This is because "throw error" immediately terminates the function's execution
        and does not execute other statements written after that while console.log()
        does not terminate the function.
        */
     }

     async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
     }
}


const authService = new AuthService()

export default authService