FROM confluentinc/cp-kafka:latest

ENTRYPOINT ["sh", "-c", "kafka-topics --create --bootstrap-server kafka-1:9092,kafka-2:9093 --replication-factor 1 --partitions 1 --topic test-topic && sleep infinity"]
