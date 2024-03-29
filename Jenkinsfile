pipeline {
  agent { 
    node {label 'build'} 
  }
  tools {nodejs "NodeJS20"} 
  environment {
    ENV = "dev"
    // read config credentials dockerhub
    DOCKER_REGISTRY= "tvuong"
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-tvuong')
    REPO = "nodejs-project-demo"
    TAG = sh(returnStdout: true, script: "git rev-parse -short=10 HEAD | tail -n +2").trim()
  }
  stages {
    stage('Test') {
      steps {
        sh "npm ci"
        sh "npm run build --if-present"
        sh "npm test"
      }
    }
    stage('Build') {
      steps {
        sh "docker build -t $REPO-$ENV:latest --build-arg NODE_ENV=$ENV ."
        // login Dockerhub 
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        // tag docker image
        sh "docker tag $REPO-$ENV:latest $DOCKER_REGISTRY/$REPO:$TAG"
        // push image to docker hub
        sh "docker push $DOCKER_REGISTRY/$REPO:$TAG"
        // clean up docker image
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