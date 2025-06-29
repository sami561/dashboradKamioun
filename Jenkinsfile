pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')
        IMAGE_NAME = "${DOCKERHUB_CREDENTIALS_USR}/front-pfe"
        // Add your deployment server credentials and details
        DEPLOY_SERVER = 'your-server-ip-or-hostname'
        DEPLOY_SSH_CREDS = credentials('deploy-ssh-creds') // SSH credentials ID in Jenkins
        DEPLOY_PORT = '8080' // Port to expose on host
        CONTAINER_PORT = '80' // Port your app listens on in container
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
        stage('Deploy to Server') {
            steps {
                script {
                    // SSH into the deployment server and run commands
                    sshagent([DEPLOY_SSH_CREDS]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_SSH_CREDS_USR}@${DEPLOY_SERVER} << EOF
                        echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin
                        docker pull ${IMAGE_NAME}:${env.BUILD_NUMBER}
                        docker stop \$(docker ps -q --filter ancestor=${IMAGE_NAME}) || true
                        docker rm \$(docker ps -a -q --filter ancestor=${IMAGE_NAME}) || true
                        docker run -d -p ${DEPLOY_PORT}:${CONTAINER_PORT} --name front-pfe-${env.BUILD_NUMBER} ${IMAGE_NAME}:${env.BUILD_NUMBER}
                        docker logout
                        EOF
                        """
                    }
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
