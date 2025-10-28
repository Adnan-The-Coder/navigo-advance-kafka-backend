import { sendRideLocation } from "./producer.js";

// Send random ride updates every 5 seconds
setInterval(() => {
  const lat = 12.9716 + Math.random() / 100;
  const lon = 77.5946 + Math.random() / 100;
  const speed = 30 + Math.random() * 10;
  sendRideLocation(1, 1001, lat, lon, speed);
}, 5000);
