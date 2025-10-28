/* eslint-disable @nx/enforce-module-boundaries */
import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: process.env.KAFKA_BROKERS.split(","),
});

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

await consumer.connect();
await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true });

console.log("📡 Kafka consumer connected. Waiting for ride data...");

await consumer.run({
  eachMessage: async ({ message }) => {
    const data = JSON.parse(message.value.toString());
    console.log("📍 Received:", data);
  },
});
