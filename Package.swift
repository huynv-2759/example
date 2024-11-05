// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "MySwiftPackage",
    platforms: [
        .macOS(.v10_15),
        .iOS(.v13)
    ],
    products: [
        .library(
            name: "MySwiftPackage",
            targets: ["MySwiftPackage"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-argument-parser", .exact("0.4.0")),
        .package(url: "https://github.com/Alamofire/Alamofire.git", .branch("master")),
        .package(url: "https://github.com/Quick/Quick.git", from: "3.1.2"),
    ],
    targets: [
        .target(
            name: "MySwiftPackage",
            dependencies: [
                .product(name: "ArgumentParser", package: "swift-argument-parser"),
                "Alamofire",
                "Quick"
            ]),
        .testTarget(
            name: "MySwiftPackageTests",
            dependencies: ["MySwiftPackage"]),
    ]
)
