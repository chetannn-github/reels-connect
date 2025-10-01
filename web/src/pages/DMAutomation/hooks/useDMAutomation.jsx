import { create } from "zustand";
import api from "../../../lib/api";
import { isValidUrl } from "../../../lib/utils";
import { compressImageAndUpload } from "../../../lib/helper";

const useDMAutomationStore = create((set, get) => ({
  isSaving: false,
  isDeleting: null,
  isFetchingAutomation: true,
  keyword: "",
  automationType: "text",
  dmMessages: [""],
  card: {
    title: "",
    subtitle: "",
    image_url: "",
    button: { title: "", url: "" },
  },
  editingId: null,
  existingAutomations: [],
  isImageUploading : false,

  
  setKeyword: (keyword) => set({ keyword }),
  setAutomationType: (automationType) => set({ automationType }),
  setCard: (card) => set({ card }),
  setIsUploadingImage: (isUploadingImage) => set({ isUploadingImage }),

  resetForm: () =>
    set({
      keyword: "",
      dmMessages: [""],
      card: { title: "", subtitle: "", image_url: "", button: { title: "", url: "" } },
      editingId: null,
    }),

  handleImageUpload: async (e) => {
    const file = e.target.files?.[0];
    try {
      if (file) {
        set({ isUploadingImage: true });
        const url = await compressImageAndUpload(file);
        set((state) => ({ card: { ...state.card, image_url: url} }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUploadingImage: false });
    }
    
  },

  isButtonDisabled: () => {
    const { keyword, automationType, dmMessages, card, isUploadingImage } = get();
    if (!keyword.trim()) return true;
    if(isUploadingImage) return true;

    if (automationType === "text") {
      return !dmMessages.some((msg) => msg.trim() !== "");
    } else if (automationType === "card") {
      if (!card.title.trim() || !card.subtitle.trim()) return true;
      const btnTitle = card.button.title.trim();
      const btnUrl = card.button.url.trim();

      if (btnUrl && !isValidUrl(btnUrl)) return true;
      if ((btnTitle && !btnUrl) || (!btnTitle && btnUrl)) return true;
      return false;
    }
    return true;
  },

  saveAutomation: async () => {
    const {
      automationType,
      dmMessages,
      card,
      keyword,
      editingId,
      resetForm,
      fetchAutomations,
    } = get();
    const token = localStorage.getItem("jwt");

    try {
      set({ isSaving: true });
      const payload = {
        keyword: keyword.trim().toLowerCase(),
        dmMessages: [],
        card: null,
        isActive: true,
        type: automationType,
      };

      if (automationType === "text") {
        const validMessages = dmMessages.map((msg) => msg.trim()).filter((msg) => msg);
        payload.dmMessages = validMessages;
      } else {
        payload.card = {
          title: card.title.trim(),
          subtitle: card.subtitle.trim(),
          image_url: card.image_url || "",
          button: {
            title: card.button.title.trim(),
            url: card.button.url.trim(),
          },
        };
      }

      let res;
      if (editingId === null) res = await api.post("/dm-automation", payload, token);
      else {
        payload.dmAutomationId = editingId;
        res = await api.put("/dm-automation", payload, token);
      }

      set({ isSaving: false });
      resetForm();
      await fetchAutomations();
    } catch (err) {
      console.error(err.message);
    } finally {
      set({ isSaving: false });
    }
  },

  editAutomation: (automation) => {
    set({
      keyword: automation.keyword,
      automationType: automation.type,
      editingId: automation._id,
      dmMessages: automation.type === "text" ? automation.dmMessages || [""] : get().dmMessages,
      card:
        automation.type === "card"
          ? automation.card || { title: "", subtitle: "", image_url: "", button: { title: "", url: "" } }
          : get().card,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  cancelEdit: () => get().resetForm(),

  deleteAutomation: async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      set({ isDeleting: id });
      await api.del("/dm-automation", { dmAutomationId: id }, token);
      set((state) => ({
        existingAutomations: state.existingAutomations.filter((auto) => auto._id !== id),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isDeleting: null });
    }

    if (get().editingId === id) get().resetForm();
  },

  fetchAutomations: async (navigate) => {
    const token = localStorage.getItem("jwt");
    
    try {
      if (!token) return navigate("/");
      const res = await api.get("/dm-automation", token);
      set({ existingAutomations: [...res.rules], isFetchingAutomation: false });
    } catch (err) {
      console.error("Error fetching automations:", err);
    }
  },

  addTextMessage: () => set((state) => ({ dmMessages: [...state.dmMessages, ""] })),
  removeTextMessage: (index) =>
    set((state) => ({
      dmMessages: state.dmMessages.filter((_, i) => i !== index),
    })),
  updateTextMessage: (index, value) =>
    set((state) => ({
      dmMessages: state.dmMessages.map((msg, i) => (i === index ? value : msg)),
    })),
}));

export default useDMAutomationStore;
