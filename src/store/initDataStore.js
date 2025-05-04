import { create } from "zustand";
import request from "../services/fetch.service.js";
let casheId = null;
const useInitDataStore = create((set) => ({
  companies: [],
  regions: [],
  branches: [],
  roles: [],
  isLoading: true,
  error: null,

  fetchInitData: async (roleId) => {
    
    if (roleId) {
      casheId = roleId;
    }

    set({ isLoading: true, error: null });
    if (casheId == 1) {
      set({
        roles: [
          {
            id: 1,
            name: "Супер админ",
          },
          {
            id: 6,
            name: "Админ менеджер",
          },
          {
            id: 2,
            name: "Менеджер",
          },
          {
            id: 5,
            name: "Кассир",
          },
        ],
      });
    } else if (casheId == 2) {
      set({
        roles: [
          {
            id: 5,
            name: "Кассир", // user yaratish qismi bo'lmedi
          },
        ],
      });
    }else if (casheId == 3) {
      set({
        roles: [
          {
            id: 2,
            name: "Менеджер", // kassir va manager yarata oladi
          },
          {
            id: 5,
            name: "Кассир", // user yaratish qismi bo'lmedi
          },
        ],
      });
    }
    try {
      const requests = [];

      if (casheId === 1) {
        requests.push(
          request("/company?page=1&size=1000"),
          request("/regions?page=1&size=1000"),
          request("/branches?page=1&size=1000")
        );
      }

      else if (casheId === 2) {
        requests.push(null, request("/regions?page=1&size=1000"), null);
      } else if (casheId === 3) {
        requests.push(
          null,
          request("/regions?page=1&size=1000"),
          request("/branches?page=1&size=1000")
        );
      }

      else if (casheId === 5) {
        requests.push(
          null, 
          request("/regions?page=1&size=1000"),
          null 
        );
      }

      const [companiesRes, regionsRes, branchesRes] = await Promise.all(
        requests.map((r) => (r ? r : Promise.resolve({ data: [] })))
      );

      set({
        companies: companiesRes?.data || [],
        regions: regionsRes?.data || [],
        branches: branchesRes?.data || [],
        isLoading: false,
        error: null,
      });
    } catch (err) {
      set({
        error: err.message || "Noma'lum xatolik",
        isLoading: false,
      });
    }
  },
}));

export default useInitDataStore;
