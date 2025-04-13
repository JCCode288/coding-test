"use server";

import Axios from "@/utils/axios.base";
import BE_Routes from "@/utils/constants/backend.routes";
import { cookies } from "next/headers";

export async function getSalesReps(page = 1, limit = 10) {
   try {
      const query = new URLSearchParams();
      query.append("page", page);
      query.append("limit", limit);

      const url = `${BE_Routes.SALES_REPS}?${query.toString()}`;

      const { data } = await Axios.get(url);

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
      const { data } = await Axios.post(
         BE_Routes.SALES_REPS,
         salesRepsData
      );

      return data;
   } catch (err) {
      console.log("=== Add Sales Error ===");
      console.log(err);
      console.log("=== Add Sales Error ===");
      throw err;
   }
}
export async function getClients(page = 1, limit = 10) {
   try {
      const query = new URLSearchParams();
      query.append("page", page);
      query.append("limit", limit);

      const url = `${BE_Routes.CLIENTS}?${query.toString()}`;
      const { data } = await Axios.get(url);

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
      const { data } = await Axios.post(BE_Routes.CLIENTS, clientData);

      return data;
   } catch (err) {
      console.log("=== Add Clients Error ===");
      console.log(err);
      console.log("=== Add Clients Error ===");
      throw err;
   }
}
export async function getDeals() {
   try {
      const query = new URLSearchParams();
      query.append("limit", 15);
      query.append("page", 1);

      const url = `${BE_Routes.DEALS}?${query.toString()}`;
      const { data } = await Axios.get(url);

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
      const { data } = await Axios.post(BE_Routes.DEALS, dealData);

      return data;
   } catch (err) {
      console.log("=== Add Deals Error ===");
      console.log(err);
      console.log("=== Add Deals Error ===");
      throw err;
   }
}
export async function editDeals(id, dealData) {
   try {
      const { data } = await Axios.put(
         `${BE_Routes.DEALS}/${id}`,
         dealData
      );

      return data;
   } catch (err) {
      console.log("=== Edit Deals Error ===");
      console.log(err);
      console.log("=== Edit Deals Error ===");
      throw err;
   }
}
export async function deleteDeals(id) {
   try {
      const { data } = await Axios.delete(`${BE_Routes.DEALS}/${id}`);

      return data;
   } catch (err) {
      console.log("=== Delete Deals Error ===");
      console.log(err);
      console.log("=== Delete Deals Error ===");
      throw err;
   }
}
export async function getSkills() {
   try {
      const { data } = await Axios.get(BE_Routes.SKILLS);

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
export async function promptAI(prompt) {
   try {
      const cookie = await cookies();
      const user_id = cookie.get("x-user") ?? "1";
      const payload = {
         prompt,
         user_id,
      };
      const { data } = await Axios.post(BE_Routes.AI, payload);

      return data.answer;
   } catch (err) {
      console.log("=== Prompt AI Error ===");
      console.log(err);
      console.log("=== Prompt AI Error ===");
      throw err;
   }
}
