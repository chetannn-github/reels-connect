import { create } from 'zustand';
import api from '../../lib/api';
import { compressImageAndUpload } from '../../lib/helper';

export const useDashboardStore = create((set, get) => ({
  keyword: '',
  selectedReel: null,
  editingId: null,
  isActive: false,
  selectedReelAutomation: [],
  automationType: 'text',
  trigger: false,
  
  card: {
    title: '',
    subtitle: '',
    cardImage: null,
    button: {
      title: '',
      url: ''
    }
  },

  textMessages: [''],
  commentReplies: [''],
  commentsActive: false,

  isDeletingAutomation: null,
  isSavingAutomation: false,
  isGettingAutomation: false,
  isUploadingImage: false,

  
  setKeyword: (keyword) => set({ keyword }),
  setSelectedReel: (selectedReel) => set({ selectedReel }),
  setEditingId: (editingId) => set({ editingId }),
  setIsActive: (isActive) => set({ isActive }),
  setSelectedReelAutomation: (selectedReelAutomation) => set({ selectedReelAutomation }),
  setAutomationType: (automationType) => set({ automationType }),
  setTrigger: (trigger) => set({ trigger }),
  setCard: (card) => set({ card }),
  setTextMessages: (textMessages) => set({ textMessages }),
  setCommentReplies: (commentReplies) => set({ commentReplies }),
  setCommentsActive: (commentsActive) => set({ commentsActive }),

  setIsDeletingAutomation: (isDeletingAutomation) => set({ isDeletingAutomation }),
  setIsSavingAutomation: (isSavingAutomation) => set({ isSavingAutomation }),
  setIsGettingAutomation: (isGettingAutomation) => set({ isGettingAutomation }),
  setIsUploadingImage: (isUploadingImage) => set({ isUploadingImage }),

  
  addTextMessage: () => {
    set({ textMessages: [...get().textMessages, ''] });
  },
  removeTextMessage: (index) => {
    const messages = get().textMessages;
    if (messages.length > 1) {
      set({ textMessages: messages.filter((_, i) => i !== index) });
    }
  },
  updateTextMessage: (index, value) => {
    const messages = [...get().textMessages];
    messages[index] = value;
    set({ textMessages: messages });
  },
  addCommentReply: () => {
    set({ commentReplies: [...get().commentReplies, ''] });
  },
  removeCommentReply: (index) => {
    const replies = get().commentReplies;
    if (replies.length > 1) {
      set({ commentReplies: replies.filter((_, i) => i !== index) });
    }
  },
  updateCommentReply: (index, value) => {
    const replies = [...get().commentReplies];
    replies[index] = value;
    set({ commentReplies: replies });
  },

  handleImageUpload: async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      set({ isUploadingImage: true });
      const url = await compressImageAndUpload(file);
      set({ card: { ...get().card, cardImage: url } });
    } catch (err) {
      console.log(err);
    } finally {
      set({ isUploadingImage: false });
    }
  },

  resetReelForm: () => {
    set({
      keyword: '',
      automationType: null,
      isActive: false,
      card: {
        title: '',
        subtitle: '',
        cardImage: null,
        button: { title: '', url: '' }
      },
      textMessages: [''],
      commentReplies: [''],
      commentsActive: false,
      editingId: null,
    });
  },

  editAutomation: (automation) => {
    set({
      selectedReel: automation.reel._id,
      keyword: automation.keyword || '',
      automationType: automation.type,
      isActive: automation.isActive || false,
      editingId: automation._id,
    });

    if (automation.type === 'card' && automation.dmCard) {
      set({
        card: {
          title: automation.dmCard.title,
          subtitle: automation.dmCard.subtitle,
          cardImage: automation.dmCard.image_url,
          button: {
            title: automation.dmCard.button.title,
            url: automation.dmCard.button.url,
          }
        }
      });
    } else if (automation.type === 'text') {
      set({ textMessages: automation.dmMessages.length ? automation.dmMessages : [''] });
    }

    if (automation.commentReplies) {
      set({
        commentReplies: automation.commentReplies.length ? automation.commentReplies : [''],
        commentsActive: true,
      });
    }

    window.scrollTo({ top: 40, behavior: 'smooth' });
  },

  deleteAutomation: async (automationId, reelId, token) => {
    try {
      set({ isDeletingAutomation: automationId });
      await api.del("/comment-automation", { reelId, automationId }, token);
      await get().handleReelSelection(reelId, token);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isDeletingAutomation: null });
    }
  },

  handleReelSelection: async (reelId, token) => {
    try {
      set({ isGettingAutomation: true, selectedReel: reelId });
      const res = await api.get(`/comment-automation/${reelId}`, token);
      set({ selectedReelAutomation: res.automations });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isGettingAutomation: false });
    }
  },

  saveReelAutomation: async (token) => {
    const {
      selectedReel,
      keyword,
      automationType,
      isActive,
      editingId,
      textMessages,
      commentReplies,
      commentsActive,
      card,
    } = get();

    if (!selectedReel || !keyword.trim() || !automationType) return;

    const payload = {
      reelId: selectedReel,
      keyword: keyword.trim(),
      commentReplies: commentsActive ? commentReplies.filter(r => r.trim()) : null,
      dmMessages: automationType === 'text' ? textMessages.filter(m => m.trim()) : null,
      dmCard: automationType === 'card' ? {
        title: card.title,
        subtitle: card.subtitle,
        image_url: card.cardImage,
        button: { title: card.button.title, url: card.button.url },
      } : null,
      type: automationType,
      isActive,
    };

    try {
      set({ isSavingAutomation: true });

      if (editingId) {
        payload.automationId = editingId;
        await api.put("/comment-automation", payload, token);
      } else {
        await api.post("/comment-automation", payload, token);
      }

      await get().handleReelSelection(selectedReel, token);
      get().resetReelForm();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isSavingAutomation: false });
    }
  },

  cancelEdit: () => get().resetReelForm(),


  isButtonDisabled: () => {
    const { 
      keyword, 
      isUploadingImage, 
      automationType, 
      textMessages, 
      card 
    } = get();

    if (!keyword.trim()) return true;          
    if (isUploadingImage) return true;

    if (automationType === 'text') {
      const hasMessage = textMessages.some(msg => msg.trim());
      if (!hasMessage) return true;
    }

    if (automationType === 'card') {

      const { title, subtitle, cardImage, button } = card;
      if (!title.trim() && !subtitle.trim() && !cardImage && (!button.title.trim() || !button.url.trim())) {
        return true;
      }
    }

    return false;
}
}));
