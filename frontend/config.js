export const appwriteProjectEndpoint = import.meta.env.VITE_APPWRITE_PROJECT_ENDPOINT || 'https://cloud.appwrite.io/v1'
export const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'your-project-id'

// Validate environment variables
if (!import.meta.env.VITE_APPWRITE_PROJECT_ENDPOINT) {
  console.warn('VITE_APPWRITE_PROJECT_ENDPOINT is not defined. Using default endpoint.');
}

if (!import.meta.env.VITE_APPWRITE_PROJECT_ID) {
  console.warn('VITE_APPWRITE_PROJECT_ID is not defined. Using default project ID.');
}