# **Latency Monitoring Service**

> This project involves implementing a monitoring system that will run locally. The system makes periodic requests to a user-configurable list of endpoints (URLs) to assess and record their latency and availability. The collected metrics are made available for querying through a REST API.

## How to run the app with docker:

> For running the app using docker you might have installed docker on your system. If you have not it <a href="https://docs.docker.com/engine/install/">Click Here</a>. After it, you should run these commands to start the container: 

```bash
# Start the container 
docker compose up

# Or start the container in detached mode
docker compose up -d

# Ports:
The application listens on port 3000.
```

## Project documentation:

> Documentation is available at this <a href="https://mire-launch-0bd.notion.site/Documentaci-n-Monitor-de-Estado-de-Servicios-Web-4bd1de9cc4cb4b52b1a4ab18b243efd6">link</a>.

### API REST documentation:

> Once the app is running, API docs are available at <a href="http://localhost:3000/api/docs">http://localhost:3000/api/docs</a>.