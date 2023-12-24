node {
    stage('Build') {
        docker.image('node:20.10.0-alpine3.19').inside {
            sh 'node --version'
        }
    }
}