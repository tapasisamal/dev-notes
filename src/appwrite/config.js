import conf from "../conf/conf";
import { ID, Databases, Client, Query } from "appwrite";

export class Service{
    client = new Client()
    databases

    constructor() {
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createNote({title, content, userId}) {
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    userId
                }
            )
        }catch(error) {
            console.log(error)
        }
    }

    async updateNote($id, {title, content}) {
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                $id,
                {
                    title,
                    content
                }
            )
        }catch(error) {
            console.log(error)
        }
    }

    async getNote($id) {
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                $id,
            )
        }catch(error) {
            console.log(error)
        }
    }

    async getNotes(userId) {
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("userId", userId)]
            )
        }catch(error) {
            console.log(error)
        }
    }

    async deleteNote($id) {
        try{
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                $id
            )
        }catch(error) {
            console.log(error)
        }
    }
}

const service = new Service()
export default service 