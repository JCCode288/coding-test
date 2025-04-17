"use server";

import Axios from "@/utils/axios.base";
import BE_Routes from "@/utils/constants/backend.routes";
import { MainJobType } from "@/utils/constants/bullmq.name";
import { cookies } from "next/headers";
import { MainEventListener, MainQueue } from "../bull-worker/queue";
import { MAIN_QUEUE_CONF } from "@/utils/constants/job.config";
import RedisCache from "../redis/cache";

const cache = new RedisCache();

export async function getSalesReps(page = 1, limit = 10) {
   try {
      const cached = await cache.get(BE_Routes.SALES_REPS, page, limit);
      if (cached) return cached;

      const query = new URLSearchParams();
      query.append("page", page);
      query.append("limit", limit);

      const url = `${BE_Routes.SALES_REPS}?${query.toString()}`;

      const { data } = await Axios.get(url);

      await cache.set(BE_Routes.SALES_REPS, data, page, limit);

      return data;
   } catch (err) {
      console.log("=== Get Sales Error ===");
      console.log(err);
      console.log("=== Get Sales Error ===");
      throw err;
   }
}
export async function getRepsById(id) {
   try {
      const url = `${BE_Routes.SALES_REPS}/${id}`;

      const { data } = await Axios.get(url);

      return data;
   } catch (err) {
      console.log("=== Get Rep By ID Error ===");
      console.log(err);
      console.log("=== Get Rep By ID Error ===");

      throw err;
   }
}
export async function addSalesReps(salesRepsData) {
   try {
      const data = {
         type: MainJobType.ADD_REPS,
         payload: { salesRepsData },
      };

      const jobData = await MainQueue.add(
         MainQueue.name,
         data,
         MAIN_QUEUE_CONF
      );

      await cache.delete(BE_Routes.SALES_REPS);

      // Using this trick to wait the response to simplify API Behaviour
      return jobData.waitUntilFinished(MainEventListener, 15000);
   } catch (err) {
      console.log("=== Add Sales Error ===");
      console.log(err);
      console.log("=== Add Sales Error ===");
      throw err;
   }
}
export async function getClients(page = 1, limit = 10) {
   try {
      const cached = await cache.get(BE_Routes.CLIENTS, page, limit);
      if (cached) return cached;

      const query = new URLSearchParams();
      query.append("page", page);
      query.append("limit", limit);

      const url = `${BE_Routes.CLIENTS}?${query.toString()}`;
      const { data } = await Axios.get(url);

      await cache.set(BE_Routes.CLIENTS, data, page, limit);

      return data;
   } catch (err) {
      console.log("=== Get Clients Error ===");
      console.log(err);
      console.log("=== Get Clients Error ===");
      throw err;
   }
}
export async function getClientsById(id) {
   try {
      const url = `${BE_Routes.CLIENTS}/${id}`;

      const { data } = await Axios.get(url);

      return data;
   } catch (err) {
      console.log("=== Get Rep By ID Error ===");
      console.log(err);
      console.log("=== Get Rep By ID Error ===");

      throw err;
   }
}
export async function addClients(clientData) {
   try {
      const data = {
         type: MainJobType.ADD_CLIENT,
         payload: { clientData },
      };

      const jobData = await MainQueue.add(
         MainQueue.name,
         data,
         MAIN_QUEUE_CONF
      );
      await cache.delete(BE_Routes.CLIENTS);

      // Using this trick to wait the response to simplify API Behaviour
      return jobData.waitUntilFinished(MainEventListener, 15000);
   } catch (err) {
      console.log("=== Add Clients Error ===");
      console.log(err);
      console.log("=== Add Clients Error ===");
      throw err;
   }
}
export async function getDeals(page = 1, limit = 10) {
   try {
      const cached = await cache.get(BE_Routes.DEALS, page, limit);
      if (cached) return cached;

      const query = new URLSearchParams();
      query.append("limit", limit);
      query.append("page", page);

      const url = `${BE_Routes.DEALS}?${query.toString()}`;
      const { data } = await Axios.get(url);

      await cache.set(BE_Routes.DEALS, data, page, limit);

      return data;
   } catch (err) {
      console.log("=== Get Deals Error ===");
      console.log(err);
      console.log("=== Get Deals Error ===");
      throw err;
   }
}
export async function getDealsById(id) {
   try {
      const url = `${BE_Routes.DEALS}/${id}`;

      const { data } = await Axios.get(url);

      return data;
   } catch (err) {
      console.log("=== Get Rep By ID Error ===");
      console.log(err);
      console.log("=== Get Rep By ID Error ===");

      throw err;
   }
}
export async function addDeals(dealData) {
   try {
      const data = {
         type: MainJobType.ADD_DEAL,
         payload: { dealData },
      };

      const jobData = await MainQueue.add(
         MainQueue.name,
         data,
         MAIN_QUEUE_CONF
      );

      await cache.delete(BE_Routes.DEALS);

      // Using this trick to wait the response to simplify API Behaviour
      return jobData.waitUntilFinished(MainEventListener, 15000);
   } catch (err) {
      console.log("=== Add Deals Error ===");
      console.log(err);
      console.log("=== Add Deals Error ===");
      throw err;
   }
}
export async function editDeals(id, dealData) {
   try {
      const data = {
         type: MainJobType.EDIT_DEAL,
         payload: { dealData, id },
      };

      const jobData = await MainQueue.add(
         MainQueue.name,
         data,
         MAIN_QUEUE_CONF
      );
      await cache.delete(BE_Routes.DEALS);

      // Using this trick to wait the response to simplify API Behaviour
      return jobData.waitUntilFinished(MainEventListener, 15000);
   } catch (err) {
      console.log("=== Edit Deals Error ===");
      console.log(err);
      console.log("=== Edit Deals Error ===");
      throw err;
   }
}
export async function deleteDeals(id) {
   try {
      const data = {
         type: MainJobType.DELETE_DEAL,
         payload: { id },
      };

      const jobData = await MainQueue.add(
         MainQueue.name,
         data,
         MAIN_QUEUE_CONF
      );
      await cache.delete(BE_Routes.DEALS);

      // Using this trick to wait the response to simplify API Behaviour
      return jobData.waitUntilFinished(MainEventListener, 15000);
   } catch (err) {
      console.log("=== Delete Deals Error ===");
      console.log(err);
      console.log("=== Delete Deals Error ===");
      throw err;
   }
}
export async function getSkills() {
   try {
      const cached = await cache.get(BE_Routes.SKILLS);
      if (cached) return cached;

      const { data } = await Axios.get(BE_Routes.SKILLS);

      await cache.set(BE_Routes.SKILLS, data);

      return data;
   } catch (err) {
      console.log("=== Get Deals Error ===");
      console.log(err);
      console.log("=== Get Deals Error ===");
      throw err;
   }
}
export async function getSkillById(id) {
   try {
      const url = `${BE_Routes.SKILLS}/${id}`;
      const { data } = await Axios.get(url);

      return data;
   } catch (err) {
      console.log("=== Get Rep By ID Error ===");
      console.log(err);
      console.log("=== Get Rep By ID Error ===");

      throw err;
   }
}

export async function addSkill(name) {
   try {
      const data = {
         type: MainJobType.ADD_SKILL,
         payload: { name },
      };

      const jobData = await MainQueue.add(
         MainQueue.name,
         data,
         MAIN_QUEUE_CONF
      );
      await cache.delete(BE_Routes.SKILLS);

      return jobData.waitUntilFinished(MainEventListener, 15000);
   } catch (err) {
      console.log("=== Add Skill Error ===");
      console.log(err);
      console.log("=== Add Skill Error ===");

      throw err;
   }
}

export async function promptAI(prompt) {
   try {
      const cookie = await cookies();
      const user_id = cookie.get("x-user") ?? "1";
      const payload = {
         prompt,
         user_id,
      };
      const { data } = await Axios.post(BE_Routes.AI, payload);

      console.log(data);

      return data.content;
   } catch (err) {
      console.log("=== Prompt AI Error ===");
      console.log(err);
      console.log("=== Prompt AI Error ===");
      throw err;
   }
}

export async function getMainJobs(type) {
   const jobs = await MainQueue.getJobs();
   const repsJob = [];

   for (const job of jobs) {
      if (job.data.type === type) repsJob.push(job);
   }

   return repsJob;
}
