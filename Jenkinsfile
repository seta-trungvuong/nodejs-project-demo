pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    ENV = "dev"
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    TAG = sh(returnStdout: true, script: "git rev-parse -short=10 HEAD | tail -n +2").trim()
  }
  stages {
    stage('Build from source') {
      steps {
        sh "docker build -t nodejs-project-demo-$ENV:latest --build-arg BUILD_ENV=$ENV ."
      }
    }
    stage('Login Dockerhub') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push Dockerhub') {
      steps {
        // tag docker image
        sh "docker tag nodejs-project-demo-$ENV:latest [dockerhub-repo]:$TAG"
        sh "docker push [dockerhub-repo]:$TAG"
        sh "docker rmi -f [dockerhub-repo]:$TAG"
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}