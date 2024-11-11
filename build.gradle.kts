plugins {
    kotlin("multiplatform")
    kotlin("native.cocoapods")
}

group = "org.jetbrains.kotlin.sample"
version = "1.0-SNAPSHOT"

kotlin {
    iosX64()
    iosArm64()
    iosSimulatorArm64()

    cocoapods {
        summary = "Kotlin sample project with CocoaPods dependencies"
        homepage = "https://github.com/Kotlin/kotlin-with-cocoapods-sample"

        ios.deploymentTarget = "13.5"

//      Example of usage remote Cocoapods dependency from Cocoapods repository
        pod("Base64") {
            version = "~> 1.1.2"
        }

//      Example of usage remote Pod from Github repository by tag
        pod("SDWebImage") {
            source = git("https://github.com/SDWebImage/SDWebImage.git") {
                tag = "5.9.2"
            }
        }

//      Example of usage remote Pod from Github repository by branch
        pod("JSONModel") {
            source = git("https://github.com/jsonmodel/jsonmodel.git") {
                branch = "key-mapper-class"
            }
        }

//      Example of usage remote Pod from Github repository by commit
        pod("CocoaLumberjack") {
            source = git("https://github.com/CocoaLumberjack/CocoaLumberjack.git") {
                commit = "3e7f595e3a459c39b917aacf9856cd2a48c4dbf3"
            }
        }

//      Example of usage local Cocoapods dependency
        pod("pod_dependency") {
            version = "1.0"
            source = path(project.file("../pod_dependency"))
        }

//      Example of usage local Pod declared as Subspec
        pod("subspec_dependency/Core") {
            version = "1.0"
            source = path(project.file("../subspec_dependency"))
        }

//      Example of usage Pod from custom spec repository
//      Please, make sure that your existing Podfile contains `source 'path/to/spec-repo.git'` line
//        specRepos {
//            url("https://github.com/Kotlin/kotlin-cocoapods-spec.git")
//        }
//        pod("example")
    }

    sourceSets {
        all {
            languageSettings {
                optIn("kotlinx.cinterop.ExperimentalForeignApi")
            }
        }
    }
}
