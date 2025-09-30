import { useNavigate } from "react-router-dom";
import api from '../../../lib/api';
import { isValidUrl } from '../../../lib/utils';
import { useState } from "react";

function useDMAutomation() {
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(null);
    const [isFetchingAutomation, setIsFetchingAutomation] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [automationType, setAutomationType] = useState('text');
    const [dmMessages, setDmMessages] = useState(['']);
    const [card, setCard] = useState({
      title: '',
      subtitle: '',
      image_url: '',
      button: { title: '', url: '' }
    });
    const [editingId, setEditingId] = useState(null);
    const [existingAutomations, setExistingAutomations] = useState([]);
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate();

    const saveAutomation = async () => {
        try {
          setIsSaving(true);
          const payload = {
            keyword: keyword.trim().toLowerCase(),
            dmMessages: [],
            card: null,
            isActive: true,
            type: automationType
          };
    
          if (automationType === 'text') {
            const validMessages = dmMessages.map(msg => msg.trim()).filter(msg => msg);
            payload.dmMessages = validMessages;
          } else {
            payload.card = {
              title: card.title.trim(),
              subtitle: card.subtitle.trim(),
              image_url: card.image_url || '',
              button: {
                title: card.button.title.trim(),
                url: card.button.url.trim()
              }
            };
          }
          let res;
          if(editingId ===null ) res = await api.post('/dm-automation', payload, token);
          else {
            payload.dmAutomationId = editingId;
            res = await api.put('/dm-automation', payload, token);
          }
          setIsSaving(false);
          resetForm();
          await fetchAutomations();
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsSaving(false);
        }
    };
    const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCard({ ...card, image_url: e.target.result });
      reader.readAsDataURL(file);
    }
    };

    const resetForm = () => {
        setKeyword('');
        setDmMessages(['']);
        setCard({ title: '', subtitle: '', image_url: '', button: { title: '', url: '' } });
        setEditingId(null);
    };

    const isButtonDisabled = () => {
        if(!keyword.trim()) return true;
        
        if (automationType === 'text') {
        return !dmMessages.some(msg => msg.trim() !== '');
        } else if (automationType === 'card') {
        if (!card.title.trim() || !card.subtitle.trim()) return true;
        const btnTitle = card.button.title.trim();
        const btnUrl = card.button.url.trim();

        if(btnUrl && !isValidUrl(btnUrl)) return true;
        if ((btnTitle && !btnUrl) || (!btnTitle && btnUrl)) return true;
            return false;
        }
        return true;
    };

    
    const editAutomation = (automation) => {
        setKeyword(automation.keyword);
        setAutomationType(automation.type);
        setEditingId(automation._id);

        if (automation.type === 'text') setDmMessages(automation.dmMessages || ['']);
        else if (automation.type === 'card') setCard(automation.card || {
        title: '', subtitle: '', image_url: '', button: { title: '', url: '' }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => resetForm();

    const deleteAutomation = async (id) => {
        try {
        setIsDeleting(id)
        await api.del("/dm-automation",{ dmAutomationId : id },token);
        setExistingAutomations(existingAutomations.filter(auto => auto._id !== id));
        } catch (error) {
        console.log(error);
        } finally {
        setIsDeleting(null);
        }
        
        if (editingId === id) resetForm();
    };

    const fetchAutomations = async () => {
        try {
        if (!token) return navigate("/");
        const res = await api.get("/dm-automation", token);
        setExistingAutomations((prev) => [...res.rules]);
        setIsFetchingAutomation(false);
        } catch (err) {
        console.error("Error fetching automations:", err);
        } 
    };

    const addTextMessage = () => setDmMessages([...dmMessages, '']);
    const removeTextMessage = (index) => setDmMessages(dmMessages.filter((_, i) => i !== index));
    const updateTextMessage = (index, value) =>
        setDmMessages(dmMessages.map((msg, i) => (i === index ? value : msg)));

    return {
        saveAutomation, isButtonDisabled, 
        editAutomation, cancelEdit, deleteAutomation,
        fetchAutomations, handleImageUpload,addTextMessage,removeTextMessage, updateTextMessage,
        isSaving,isDeleting,isFetchingAutomation,setKeyword,keyword,automationType, setAutomationType,
    dmMessages,card,setCard, editingId, existingAutomations
    }
    
}

export default useDMAutomation