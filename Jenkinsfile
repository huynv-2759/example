pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Check out the source code from your repository
                git 'https://github.com/your-repo.git'
            }
        }

        stage('Build') {
            steps {
                // Build your application (e.g., compile code, run tests, etc.)
                sh 'mvn clean package'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy your application using Helm
                // Make sure you have Helm installed and configured properly
                sh 'helm upgrade --install myapp ./path/to/helm/chart --namespace mynamespace'
            }
        }

        stage('Cleanup') {
            steps {
                // Clean up any resources or temporary files
                sh 'rm -rf ./path/to/helm/chart'
            }
        }
    }

    post {
        success {
            // Perform any post-deployment actions or notifications
            echo 'Deployment successful. Sending notifications...'
        }

        failure {
            // Handle failure scenarios (e.g., rollback, send notifications, etc.)
            echo 'Deployment failed. Taking necessary actions...'
        }
    }
}
