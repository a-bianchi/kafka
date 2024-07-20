.PHONY: up down kafdrop

# Command to start the docker-compose services in the kafka folder
up:
	@echo "Starting Kafka and ZooKeeper services..."
	@docker-compose -f docker/docker-compose.yml up -d

# Command to stop the docker-compose services in the kafka folder
down:
	@echo "Stopping Kafka and ZooKeeper services..."
	@docker-compose -f docker/docker-compose.yml down
