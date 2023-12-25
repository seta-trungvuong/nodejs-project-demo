pipeline {
  agent any
  environment {
    ENV = "dev"
    // read config credentials dockerhub
    DOCKER_REGISTRY= "tvuong"
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    REPO = "nodejs-project-demo"
    TAG = sh(returnStdout: true, script: "git rev-parse -short=10 HEAD | tail -n +2").trim()
  }
  stages {
    stage('Build from source') {
      steps {
        sh "docker build -t $REPO-$ENV:latest --build-arg BUILD_ENV=$ENV ."
      }
    }
    stage('Login Dockerhub') {
      // login use 
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push Dockerhub') {
      steps {
        // tag docker image
        sh "docker tag $REPO-$ENV:latest $DOCKER_REGISTRY/$REPO:$TAG"
        sh "docker push $DOCKER_REGISTRY/$REPO:$TAG"
        sh "docker rmi -f $DOCKER_REGISTRY/$REPO:$TAG"
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}