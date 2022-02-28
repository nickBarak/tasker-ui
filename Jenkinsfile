pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo '=== CLONE REPOSITORY ==='
                sh 'rm -rf tasker-ui'
                git clone 'https://github.com/nickBarak/tasker-ui.git' tasker-api
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '=== BUILD DOCKER IMAGE ==='
                sh 'docker rmi -f nickbarak/tasker-ui'
                sh 'docker build -t nickbarak/tasker-ui .'
            }
        }

        stage('Push Docker Image to Remote Repository') {
            steps {
                echo '=== PUSH DOCKER IMAGE TO REMOTE REPOSITORY ==='
                sh 'docker push nickbarak/tasker-ui'
            }
        }
        
        stage('Restart Container with Latest Image') {
            steps {
                echo '=== RESTART CONTAINER WITH LATEST IMAGE ==='
                sh 'docker restart ui'
            }
        }
    }
}
