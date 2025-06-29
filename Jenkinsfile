pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')
        IMAGE_NAME = "${DOCKERHUB_CREDENTIALS_USR}/front-pfe"
    }
    triggers {
        pollSCM('*/5 * * * *') // Check every 5 minutes
    }
    stages {
        stage('Checkout') {
            steps {
                echo "Getting source code"
                checkout scm
            }
        }
        stage('Docker Auth') {
            steps {
                script {
                    sh '''
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    '''
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} .
                    """
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    sh """
                    docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}
                    """
                }
            }
        }
        stage('Cleanup Docker Images') {
            steps {
                script {
                    sh """
                    docker rmi ${IMAGE_NAME}:${env.BUILD_NUMBER}
                    docker logout
                    """
                }
            }
        }
    }
   
}
