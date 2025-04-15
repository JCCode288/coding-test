import { MainJobType, QueueName } from "@/utils/constants/bullmq.name";
import { UnrecoverableError, Worker } from "bullmq";
import IoRedis from "../redis";
import BE_Routes from "@/utils/constants/backend.routes";
import Axios from "@/utils/axios.base";

const MainWorker = new Worker(
   QueueName.MAIN,
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
   switch (type) {
      case MainJobType.ADD_REPS:
         return async function ({ salesRepsData }) {
            const { data } = await Axios.post(
               BE_Routes.SALES_REPS,
               salesRepsData
            );

            return data;
         };

      case MainJobType.ADD_CLIENT:
         return async function ({ clientData }) {
            const { data } = await Axios.post(
               BE_Routes.CLIENTS,
               clientData
            );

            return data;
         };

      case MainJobType.ADD_DEAL:
         return async function ({ dealData }) {
            const { data } = await Axios.post(BE_Routes.DEALS, dealData);

            return data;
         };

      case MainJobType.EDIT_DEAL:
         return async function ({ id, dealData }) {
            const { data } = await Axios.put(
               `${BE_Routes.DEALS}/${id}`,
               dealData
            );

            return data;
         };

      case MainJobType.DELETE_DEAL:
         return async function ({ id }) {
            const { data } = await Axios.delete(
               `${BE_Routes.DEALS}/${id}`
            );

            return data;
         };

      case MainJobType.ADD_SKILL:
         return async function ({ name }) {
            const { data } = await Axios.post(`${BE_Routes.SKILLS}`, {
               name,
            });

            return data;
         };
      default:
         throw new UnrecoverableError("Invalid job type");
   }
}

MainWorker.on("ready", () => {
   console.log("Main Worker is ready!");
});

MainWorker.on("active", (job) => {
   console.log(
      "Main Worker is processing: ",
      job.id,
      "with type: ",
      job.data.type
   );
});

MainWorker.on("progress", (job) => {
   console.log(
      `Main worker Job ${job.id} is progressing`,
      "with type: ",
      job.data.type
   );
});

MainWorker.on("completed", async (job) => {
   console.log(`job with Job ID: ${job.id} is completed`);
});

MainWorker.on("failed", (job, err) => {
   console.log(`job with Job ID: ${job.id} failing`);
});

export default MainWorker;
