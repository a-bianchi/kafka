# Kafka NestJS Proof of Concept

This is a NestJS project serving as a proof of concept for using Kafka. The project includes a producer and a consumer. The producer reads tweets from a text file and sends them through Kafka. The consumer receives these messages, printing tweets that contain hashtags along with the hashtags themselves, and returning the tweet ID if there are no hashtags.

## Description

### Producer
- Reads tweets from a text file.
- Sends tweets via Kafka.

### Consumer
- Consumes messages from Kafka.
- Prints tweets containing hashtags and their hashtags.
- Returns the tweet ID if there are no hashtags.

## Running the Project Locally

### Prerequisites

Ensure you have Docker and `make` installed on your machine.

### Steps

1. **Start Kafka Server:**
   - Run the following command to start the Kafka server using Docker:
     ```sh
     make up
     ```

2. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory of the project.
   - Copy the contents from `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```

3. **Start the Project:**
   - Run the following command to start the project in development mode:
     ```sh
     pnpm start:dev
     ```

By following these steps, the producer will start reading tweets from the specified text file and send them through Kafka. The consumer will receive these messages and process them accordingly.

## Additional Information

- Ensure the text file containing the tweets is properly formatted in JSON.
- Check the Kafka configuration in `app.config.ts` to match your Kafka server settings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
