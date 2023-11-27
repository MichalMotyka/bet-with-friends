pipeline {
    agent any
    
    stages{
        stage('Run test backend'){
            steps{
                script{
                    sh "python -m unittest discover -v ./BE/tests"
                }
            }
        }
    }

    stages {
        stage('Build Backend Docker Image') {
            steps {
                // Zbudowanie obrazu Dockera dla backendu
                script {
                    docker.build("bfw_be:latest", "./BE") // Ścieżka do katalogu backendowego
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                // Zbudowanie obrazu Dockera dla frontendu
                script {
                    docker.build("bfw_fe:latest", "./FE") // Ścieżka do katalogu frontendowego
                }
            }
        }
        stage('Remove containers'){
            steps{
                script{
                    sh "docker stop bfw_be || true"
                    sh "docker rm bfw_be || true"
                    sh "docker stop bfw_fe || true"
                    sh "docker rm bfw_fe || true"
                }
            }
        }
        stage('Remove images') {
            steps {
                script {
                    sh 'docker images -a | grep "<none>" | awk \'{print $3}\' | xargs docker rmi'
                }
            }
        }
        stage('Deploy Containers') {
            steps {
                // Uruchomienie kontenerów na serwerze
                script {
                    sh 'docker run -d -p 5000:5000 --name bfw_be bfw_be:latest'
                     sh 'docker run -d -p 80:80 --name bfw_fe bfw_fe:latest'
                }
            }
        }
    }
}
