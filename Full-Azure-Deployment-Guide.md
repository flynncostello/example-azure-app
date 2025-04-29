# Complete Guide to Deploying a Web App on Azure Container App Service

This guide walks through the entire process of creating a simple web application and deploying it to Azure Web App for Containers using GitHub Actions and Docker Hub.

## Project Structure

A complete Flask web application structure:

```
flask-azure-app/
├── .github/
│   └── workflows/
│       └── azure-deploy.yml   # GitHub Actions workflow file
├── static/                    # Static files directory
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── main.js            # JavaScript functionality
│   └── img/                   # Images directory (if needed)
│       └── logo.png
├── templates/                 # HTML templates
│   ├── index.html             # Homepage template
│   ├── layout.html            # Base layout template (if using template inheritance)
│   └── error.html             # Error page template
├── .gitignore                 # Git ignore file
├── app.py                     # Main Flask application
├── config.py                  # Configuration settings (optional)
├── Dockerfile                 # Docker configuration
├── README.md                  # Project documentation
├── requirements.txt           # Python dependencies
```

## Step 1: Create the GitHub Repository

1. Log in to GitHub
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "flask-azure-app")
4. Add a description (optional)
5. Choose public or private visibility
6. Initialize with a README (optional)
7. Click "Create repository"

## Step 2: Create Your Web Application Locally

1. Clone the repository to your local machine
2. Create the application structure as shown above
3. Create basic web app files:
   - `app.py` - Flask application
   - `templates/index.html` - HTML template
   - `static/css/style.css` - CSS styles
   - `static/js/main.js` - JavaScript functionality
   - `requirements.txt` - Python dependencies
   - `.gitignore` - Files to ignore in Git

## Step 3: Create Docker Configuration

1. Create a `Dockerfile` in the root directory
2. Define the Docker image configuration (base image, working directory, dependencies, etc.)
3. Specify the command to run your application

## Step 3.5: Test Docker Image Locally

1. Build Docker image locally
```
docker build -t flynncostello/example-azure-app:latest .
```

2. Run the Container locally
```
docker run -d -p 5000:5000 --name azure-app-test flynncostello/example-azure-app:latest
```
- Now go to port 5000 at http://localhost:5000 or whatever port you ran it on

3. Can check logs
```
docker logs azure-app-test
```

4. Stopping and Removing Container and Image
```
# Stop the running container
docker stop azure-app-test

# Remove the container
docker rm azure-app-test

# List all images to confirm image ID
docker images

# Remove the image (you can use the image name or ID)
docker rmi flynncostello/example-azure-app:latest
```

## Step 4: Set Up GitHub Actions Workflow

1. Create the directory `.github/workflows/`
2. Create a workflow file `azure-deploy.yml` with the following jobs:
   - Checkout code
   - Login to Docker Hub
   - Build and push Docker image
   - Deploy to Azure Web App

## Step 5: Set Up Docker Hub

1. Create a Docker Hub account if you don't have one
2. Create an access token:
   - Go to Account Settings > Security > New Access Token
   - Give it a name (e.g., "GitHub Actions")
   - Set permissions to "Read, Write, Delete"
   - Copy the generated token immediately (it won't be shown again)

## Step 6: Set Up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following repository secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

## Step 7: Create Azure Web App with GitHub Actions Integration

1. Log in to the Azure Portal (portal.azure.com)
2. Click "Create a resource"
3. Search for "Web App" and select it
4. Fill in the basics:
   - Resource Group: Create new or use existing
   - Name: Your app name (must be unique)
   - Publish: Docker Container
   - Operating System: Linux
   - Region: Choose a region close to your users
5. In the Docker tab:
   - Options: Single Container
   - Image Source: Docker Hub or Other Registry
   - Access Type: Public
   - Leave image and tag empty (will be filled by GitHub Actions)
6. Review and create the Web App

## Step 8: Configure GitHub Actions in Azure Web App

1. Once your Web App is created, go to its overview page
2. In the left menu, scroll down and click on "Deployment Center"
3. Select "GitHub Actions" as your source
4. Connect to your GitHub account if prompted
5. Select your repository and branch
6. In the "Workflow Option" section, select "Add or update workflow"
7. Azure will automatically generate a GitHub Actions workflow

## Step 9: Get Azure Publish Profile (if using manual setup)

1. Once your Web App is created, go to its overview page
2. Click on "Get publish profile" (download button)
3. Save the file locally
4. Open the downloaded .publishsettings file with a text editor
5. Copy the entire contents

```
AZURE_WEBAPP_PUBLISH_PROFILE = [contents of profile.publishsettings file]
```

## Step 10: Add Azure Publish Profile to GitHub Secrets (if using manual setup)

1. Go back to your GitHub repository secrets
2. Add a new secret:
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: Paste the entire content of the publish profile file

## Step 11: Configure Azure Web App Startup Command

1. In the Azure Portal, go to your Web App
2. Navigate to Settings > Configuration > General settings
3. In the "Startup Command" field, enter:
   ```
   gunicorn --bind 0.0.0.0:8080 app:app
   ```
4. Save the configuration

## Step 12: Configure Port Mapping (if needed)

1. In your Azure Web App Configuration
2. Go to Application settings
3. Add a new application setting:
   - Name: `WEBSITES_PORT`
   - Value: `5000` (or whatever port your app uses)
4. Save the configuration

## Step 13: Commit and Push Your Code

1. Commit all your files to your local repository
2. Push the changes to GitHub:
   ```
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

## Step 14: Monitor the Deployment

1. Go to the "Actions" tab in your GitHub repository
2. Watch the workflow run triggered by your push
3. If successful, the workflow will:
   - Build your Docker image
   - Push it to Docker Hub
   - Deploy it to Azure Web App

## Step 15: Verify Your Deployment

1. Once the GitHub Actions workflow completes successfully
2. Go to your Azure Web App URL: `https://your-app-name.azurewebsites.net`
3. Verify that your application is running correctly

## Common Issues and Troubleshooting

If you encounter issues:

1. **Workflow fails during Docker build or push:**
   - Check Docker Hub credentials in GitHub secrets
   - Verify your Dockerfile syntax
   - Ensure Docker Hub repository exists and has correct permissions

2. **Deployment fails:**
   - Check Azure Web App configuration
   - Verify the Azure publish profile secret (if using manual setup)
   - Check that your app name in the workflow matches your Azure Web App name

3. **Application starts but doesn't work correctly:**
   - Check startup command configuration
   - Verify port configuration in both app and Azure settings
   - Check Azure Web App logs (Log stream in Monitoring section)

4. **Container fails to start:**
   - Check Dockerfile for proper base image and commands
   - Verify dependencies in requirements.txt
   - Ensure environment variables are properly set
   - Check if your app is listening on the correct port

5. **500 errors after deployment:**
   - Check application logs for errors
   - Verify that gunicorn is configured correctly
   - Check if the WEBSITES_PORT environment variable matches your app's port