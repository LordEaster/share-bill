pipeline {
    agent any
    environment {
        GIT_URL = 'https://github.com/BSO-Space/share-bill'
        SLACK_CHANNEL = '#jenkins-notifications'
    }
    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch name for the build')
        string(name: 'DOCKER_TAG', defaultValue: 'latest', description: 'Docker image tag')
    }
    stages {
        stage("Checkout & Pulling") {
            steps {
                script {
                    git branch: "${params.BRANCH_NAME}", url: "${GIT_URL}"
                    if ("${params.BRANCH_NAME}" != "main") {
                        error("This pipeline only runs on the main branch. Current branch: ${params.BRANCH_NAME}")
                    }
                    sh "git pull origin ${params.BRANCH_NAME}"
                }
            }
            post {
                always {
                    echo "In Processing"
                }
                success {
                    echo "Successful"
                }
                failure {
                    echo "Failed"
                }
            }
        }
        stage("Code analysis") {
            steps {
                withCredentials([string(credentialsId: 'share-bill', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        npm install sonar-scanner
                        npx sonar-scanner \
                        -Dsonar.projectKey=share-bill \
                        -Dsonar.host.url=http://sonarqube-dso-demo:9000 \
                        -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }
        stage("Docker deployment") {
            steps {
                sh 'docker-compose -p share-bill -f docker-compose.prod.yml build --no-cache'
                sh 'docker-compose -p share-bill -f docker-compose.prod.yml up -d'
            }
        }
    }
    post {
        always {
            echo "Pipeline finished"
            slackSend channel: "${SLACK_CHANNEL}", color: '#00FF00', message: """
                *Pipeline Finished*: ${env.JOB_NAME} [#${env.BUILD_NUMBER}]
                *Status*: ${currentBuild.currentResult}
                *Branch*: ${params.BRANCH_NAME}
                *Last Commit By*: ${env.LAST_COMMIT_AUTHOR}
                *Commit Message*: ${env.LAST_COMMIT_MESSAGE}
            """
        }
        success {
            echo "Pipeline success"
            slackSend channel: "${SLACK_CHANNEL}", color: '#36A64F', message: """
                *Pipeline Success*: ${env.JOB_NAME} [#${env.BUILD_NUMBER}]
                *Branch*: ${params.BRANCH_NAME}
                *Last Commit By*: ${env.LAST_COMMIT_AUTHOR}
                *Commit Message*: ${env.LAST_COMMIT_MESSAGE}
            """
        }
        failure {
            echo "Pipeline error"
            slackSend channel: "${SLACK_CHANNEL}", color: '#FF0000', message: """
                *Pipeline Failed*: ${env.JOB_NAME} [#${env.BUILD_NUMBER}]
                *Branch*: ${params.BRANCH_NAME}
                *Last Commit By*: ${env.LAST_COMMIT_AUTHOR}
                *Commit Message*: ${env.LAST_COMMIT_MESSAGE}
            """
        }
    }
}
