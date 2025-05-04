import { create } from "zustand";
import request from "../services/fetch.service.js";
import roles from "@/constants/roles.js";
let casheRole = null;
const useInitDataStore = create((set) => ({
  regions: [],
  categories: [],
  roles: [],
  isLoading: true,
  error: null,

  fetchInitData: async (role) => {
    if (role) {
      casheRole = role;
    }

    set({ isLoading: true, error: null });
    if (casheRole == roles.ADMIN) {
      set({
        roles: [
          {
            id: "ADMIN",
            name: "Administrator",
          },
          {
            id: "OPERATOR",
            name: "Operator",
          },
          {
            id: "EMPLOYEE",
            name: "Arizaga javob beruvchi xodim",
          },
        ],
      });
    } else if (casheRole == 2) {
      set({
        roles: [
          {
            id: 5,
            name: "Кассир", // user yaratish qismi bo'lmedi
          },
        ],
      });
    } else if (casheRole == 3) {
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

      if (casheRole === roles.ADMIN) {
        requests.push(request("/regions"), request("/departments"));
      } else if (casheRole === 2) {
        requests.push(request("/regions?page=1&size=1000"), null);
      } else if (casheRole === 3) {
        requests.push(
          request("/regions?page=1&size=1000"),
          request("/departments")
        );
      } else if (casheRole === 5) {
        requests.push(request("/regions?page=1&size=1000"), null);
      }

      const [regionsRes, categoriesRes] = await Promise.all(
        requests.map((r) => (r ? r : Promise.resolve({ data: [] })))
      );

      set({
        regions: regionsRes?.data || [],
        categories: categoriesRes?.data || [],
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
