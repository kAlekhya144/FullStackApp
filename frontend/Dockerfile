FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*
# Remove default nginx static files

# Copy build artifacts
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80  
# for nginx - expose port 80

CMD ["nginx", "-g", "daemon off;"]

# Kubernetes expects the main process in a container to run in the foreground
# If Nginx runs as a background (daemon) process, the container will exit—then Kubernetes will restart it repeatedly because it thinks the app crashed.
# What happens if you don't use daemon off?
# Pod starts, Nginx goes background,Container exits
# Kubernetes restarts it forever (CrashLoopBackOff)

