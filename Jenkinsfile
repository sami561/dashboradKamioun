pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')
        IMAGE_NAME = "${DOCKERHUB_CREDENTIALS_USR}/front-pfa"
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
    post {
        success {
            script {
                if (env.BRANCH_NAME == 'master') {
                    emailext subject: 'Build Success: front-pfa',
                              body: 'The pipeline successfully built and deployed to Docker Hub.',
                              recipientProviders: [developers()],
                              to: 'semiayachi.contact@gmail.com'
                }
            }
        }
        failure {
            emailext subject: 'Build Failure: front-pfa',
                      body: 'The pipeline failed to build. Please check the Jenkins console output for more details.',
                      recipientProviders: [developers()],
                      to: 'semiayachi.contact@gmail.com'
        }
    }
}
