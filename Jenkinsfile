pipeline {
    agent any

    stages {
        stage('Clone Git Repository') {
            steps {
                echo '=== CLONE GIT REPOSITORY ==='
                sh 'sudo rm -rf tasker-ui'
                sh 'sudo git clone https://github.com/nickBarak/tasker-ui.git tasker-ui'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '=== BUILD DOCKER IMAGE ==='
                sh 'sudo docker rmi -f nickbarak/tasker-ui'
                sh 'sudo docker build -t nickbarak/tasker-ui tasker-ui'
            }
        }

        stage('Push Docker Image to Remote Repository') {
            steps {
                echo '=== PUSH DOCKER IMAGE TO REMOTE REPOSITORY ==='
                sh 'sudo docker push nickbarak/tasker-ui'
            }
        }
        
        stage('Restart Container with Latest Image') {
            steps {
                echo '=== RESTART CONTAINER WITH LATEST IMAGE ==='
                sh 'sudo docker restart ui'
            }
        }
    }
}
