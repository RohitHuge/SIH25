import { Client, Account, ID } from "appwrite";
import { appwriteProjectEndpoint, appwriteProjectId } from '../../config.js';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        try {
            // Validate configuration before initializing
            if (!appwriteProjectEndpoint || appwriteProjectEndpoint === 'your-project-id') {
                throw new Error('Appwrite project endpoint is not properly configured. Please check your environment variables.');
            }
            
            if (!appwriteProjectId || appwriteProjectId === 'your-project-id') {
                throw new Error('Appwrite project ID is not properly configured. Please check your environment variables.');
            }

            this.client
                .setEndpoint(appwriteProjectEndpoint)
                .setProject(appwriteProjectId);
            this.account = new Account(this.client);
        } catch (error) {
            console.error('Failed to initialize AuthService:', error);
            throw error;
        }
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another 
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // Check if the error is due to no user being logged in
            if (error.code === 401 || error.type === 'user_unauthorized') {
                return null;
            }
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


