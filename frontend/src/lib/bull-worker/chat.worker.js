import { ChatJobType, QueueName } from "@/utils/constants/bullmq.name";
import { UnrecoverableError, Worker } from "bullmq";
import IoRedis from "../redis";
import BE_Routes from "@/utils/constants/backend.routes";
import Axios from "@/utils/axios.base";

const ChatWorker = new Worker(
   QueueName.CHAT,
   async (job) => {
      if (!job.data) throw new UnrecoverableError("Job Data not found");

      const payload = job.data.payload;
      const type = job.data.type;

      if (!type) throw new UnrecoverableError("Job Type not found");

      const processor = getJobProcessor(type);
      const data = await processor(payload);

      return data;
   },
   {
      connection: IoRedis,
      concurrency: 1,
   }
);

function getJobProcessor(type) {
   if (type === ChatJobType.PROMPT_CHAT)
      return async function (payload) {
         const { data } = await Axios.post(BE_Routes.AI, payload);

         return data;
      };
   else throw new UnrecoverableError("Invalid job type");
}

export default ChatWorker;
