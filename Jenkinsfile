pipeline {
    agent any

    stages {
        stage('Build Backend Docker Image') {
            steps {
                // Zbudowanie obrazu Dockera dla backendu
                script {
                    docker.build("bfw_be:latest", "./BE") // Ścieżka do katalogu backendowego
                }
            }
        }
        // stage('Build Frontend Docker Image') {
        //     steps {
        //         // Zbudowanie obrazu Dockera dla frontendu
        //         script {
        //             docker.build("bfw_fe:latest", "./FE") // Ścieżka do katalogu frontendowego
        //             docker.push("bfw_fe:latest")
        //         }
        //     }
        // }
        stage('Deploy Containers') {
            steps {
                // Uruchomienie kontenerów na serwerze
                script {
                    sh 'docker run -d -p 5000:5000 bfw_be:latest'
                }
            }
        }
    }
}
