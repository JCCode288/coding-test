import { Queue, QueueEvents } from "bullmq";
import IoRedis from "../redis";
import { QueueName } from "@/utils/constants/bullmq.name";

export const MainQueue = new Queue(QueueName.MAIN, {
   connection: IoRedis,
});
export const ChatQueue = new Queue(QueueName.CHAT, {
   connection: IoRedis,
});

export const MainEventListener = new QueueEvents(QueueName.MAIN, {
   connection: IoRedis,
});

MainEventListener.on("completed", ({ jobId }) => {
   console.log(`process with job id: ${jobId} finished`);
});

MainEventListener.on("failed", ({ jobId, failedReason }) => {
   console.log(
      `process with job id: ${jobId} failed with reason ${failedReason}`
   );
});
