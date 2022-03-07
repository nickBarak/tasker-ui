pipeline {
    agent any

    stages {
        stage('Free Memory') {
            steps {
                echo '=== FREE MEMORY ==='
                sh 'sudo docker-compose -f "../../../../../home/opc/docker-compose.yaml" down'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '=== BUILD DOCKER IMAGE ==='
                sh 'sudo cp ../../../../../home/opc/.env .env'
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
                sh 'sudo docker-compose -f "../../../../../home/opc/docker-compose.yaml" up -d'
            }
        }
    }
}
