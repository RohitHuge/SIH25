# Appwrite Configuration Setup

## Environment Variables Required

Create a `.env` file in the frontend directory with the following variables:

```env
# Appwrite Configuration
VITE_APPWRITE_PROJECT_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-actual-project-id-here
```

## How to Get Your Appwrite Credentials

1. **Go to Appwrite Console**: Visit [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. **Create a Project**: If you don't have one, create a new project
3. **Get Project ID**: 
   - Go to your project dashboard
   - Copy the Project ID from the project settings
4. **Get Project Endpoint**:
   - Usually: `https://cloud.appwrite.io/v1`
   - Or check your project settings for the correct endpoint

## Setup Steps

1. Create `.env` file in the frontend directory
2. Add the environment variables above
3. Replace `your-actual-project-id-here` with your actual project ID
4. Restart your development server: `npm run dev`

## Troubleshooting

- Make sure the `.env` file is in the `frontend` directory (same level as `package.json`)
- Ensure variable names start with `VITE_`
- Restart the development server after adding environment variables
- Check the browser console for any configuration warnings

## Current Status

The app will show warnings in the console if environment variables are not properly configured, but it will still run with default values for development purposes.
