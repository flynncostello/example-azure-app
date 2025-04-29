# Simple Flask App for Azure Deployment

A minimal web application demonstrating CI/CD deployment to Azure using GitHub Actions and Docker.

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── azure-deploy.yml
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── templates/
│   └── index.html
├── .gitignore
├── app.py
├── Dockerfile
├── README.md
└── requirements.txt
```

## Local Development

1. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the application:
   ```
   python app.py
   ```

4. Access the application at http://localhost:5000

## Docker Development

1. Build the Docker image:
   ```
   docker build -t simple-flask-app .
   ```

2. Run the container:
   ```
   docker run -p 5000:5000 simple-flask-app
   ```

3. Access the application at http://localhost:5000

## Deployment

This application is set up to automatically deploy to Azure Web App when changes are pushed to the main branch through GitHub Actions.