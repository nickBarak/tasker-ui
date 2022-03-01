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

        stage('Free Memory') {
            steps {
                echo '=== FREE MEMORY ==='
                sh 'sudo docker-compose -f "~/docker-compose.yaml" down'
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
        
        stage('Restart Containers with Latest Images') {
            steps {
                echo '=== RESTART CONTAINERS WITH LATEST IMAGES ==='
                sh 'sudo docker-compose up'
            }
        }
    }
}
