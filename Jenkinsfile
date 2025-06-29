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

        stage('Deploy Frontend Container on Port 4000') {
            steps {
                script {
                    sh """
                    # Remove any existing container
                    docker rm -f front-pfa || true

                    # Pull the latest pushed image
                    docker pull ${IMAGE_NAME}:${env.BUILD_NUMBER}

                    # Run the container and expose port 4000
                    docker run -d --name front-pfe -p 3000:3000 ${IMAGE_NAME}:${env.BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Cleanup Docker Image Locally') {
            steps {
                script {
                    sh """
                    docker rmi ${IMAGE_NAME}:${env.BUILD_NUMBER} || true
                    docker logout
                    """
                }
            }
        }
    }
}
