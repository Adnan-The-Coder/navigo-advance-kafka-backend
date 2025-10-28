/* eslint-disable @nx/enforce-module-boundaries */
import dotenv from "dotenv";
import { Kafka } from "kafkajs";
dotenv.config();

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: process.env.KAFKA_BROKERS.split(","),
});

const producer = kafka.producer();

export async function sendRideLocation(rideId, driverId, latitude, longitude, speed = 0) {
  const payload = {
    rideId,
    driverId,
    latitude,
    longitude,
    speed,
    timestamp: new Date().toISOString(),
  };

  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [{ key: String(rideId), value: JSON.stringify(payload) }],
  });

  console.log("📤 Produced:", payload);
  await producer.disconnect();
}
