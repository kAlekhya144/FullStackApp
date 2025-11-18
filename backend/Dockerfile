FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /backendApp
COPY src ./src
COPY pom.xml .
RUN mvn clean package

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /backendApp/target/employee-backend-1.0.0.jar .
ENTRYPOINT ["java", "-jar", "employee-backend-1.0.0.jar"]
