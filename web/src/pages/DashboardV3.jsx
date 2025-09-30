import { useSelector } from 'react-redux';
import Header from '../components/Dashboard/Header';
import { useState } from 'react';
import ReelsSection from '../components/Dashboard/ReelsSection';
import KeywordSection from '../components/Dashboard/KeywordSection';
import AutomationSetup from '../components/Dashboard/AutomationSetup';
import CommentSetup from '../components/Dashboard/CommentSetup';
import SaveConfiguration from '../components/Dashboard/SaveConfiguration';
import api from '../lib/api';
import SavedAutomation from '../components/Dashboard/SavedAutomation';

const DashboardV3 = () => {
    const user = useSelector((state) => state.auth.user);
    const token = localStorage.getItem('jwt');

    const [isGettingAutomation,setIsGettingAutomation] = useState(false);
    const [selectedReelAutomation, setSelectedReelAutomation] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectedReel, setSelectedReel] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const [automationType,setAutomationType] = useState("text");
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [cardImage, setCardImage] = useState(null);
    const [buttonTitle, setButtonTitle] = useState('');
    const [buttonUrl, setButtonUrl] = useState('');

    const [textMessages, setTextMessages] = useState(['']);
    const [commentReplies, setCommentReplies] = useState(['']);
    const [commentsActive, setCommentsActive] = useState(false);

    const [isDeletingAutomation,setIsDeletingAutomation] = useState(null);
    const [isSavingAutomation,setIsSavingAutomation] = useState(false);


    const addTextMessage = () => setTextMessages([...textMessages, '']);
    const removeTextMessage = (index) => textMessages.length > 1 && setTextMessages(textMessages.filter((_, i) => i !== index));
    const updateTextMessage = (index, value) => {
      const updated = [...textMessages];
      updated[index] = value;
      setTextMessages(updated);
    };

    const handleImageUpload = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) =>
          setCardImage(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  

    const addCommentReply = () => setCommentReplies([...commentReplies, '']);
    const removeCommentReply = (index) => commentReplies.length > 1 && setCommentReplies(commentReplies.filter((_, i) => i !== index));
    const updateCommentReply = (index, value) => {
      const updated = [...commentReplies];
      updated[index] = value;
      setCommentReplies(updated);
    };


    const saveReelAutomation = async() => {
        if (!selectedReel) return;
        if (!keyword.trim()) return;
        if (!automationType) return;
        console.log(automationType)
        const payload = {
            reelId : selectedReel,
            keyword: keyword.trim(),
            commentReplies : commentsActive ? commentReplies.filter(r => r.trim()) : null,
            dmMessages : automationType === 'text' ? textMessages.filter(m => m.trim()) : null,
            dmCard : automationType === 'card' ? {title :title, subtitle : subtitle, button : {title : buttonTitle, url : buttonUrl,}, image_url : cardImage } : null,
            type : automationType,
            isActive
        }

        try {
          setIsSavingAutomation(true);

          if(editingId) {
            payload.automationId = editingId;
            await api.put("/comment-automation",payload,token);
          }else {
            await api.post("/comment-automation",payload, token);
          }
           
          await handleReelSelection(selectedReel);
          resetReelForm();
        } catch (error) {
          console.log(error);
        } finally {
          setIsSavingAutomation(false);
        }
        
       
    };

    const resetReelForm = () => {
      setKeyword('');
      setAutomationType(null);
      setIsActive(false);
      setTitle('');
      setSubTitle('');
      setButtonTitle('');
      setButtonUrl('');
      setCardImage(null);
      setTextMessages(['']);
      setCommentReplies(['']);
      setCommentsActive(false);
      setEditingId(null);
    };


    const editAutomation = (automation) => {
        setSelectedReel(automation.reel._id);
        setKeyword(automation.keyword || '');
        setAutomationType(automation.type);
        setIsActive(automation.isActive || false);
        setEditingId(automation._id);
    
        if (automation.type === 'card' && automation.dmCard) {
          setTitle(automation.dmCard.title);
          setSubTitle(automation.dmCard.subtitle);
          setButtonTitle(automation.dmCard.button.title);
          setButtonUrl(automation.dmCard.button.url);
          setCardImage(automation.dmCard.image_url);
        } else if (automation.type === 'text') {
          if(automation.dmMessages.length === 0)setTextMessages(['']);
          else setTextMessages(automation.dmMessages);
        }
        
        if (automation.commentReplies) {
          if(automation.commentReplies.length === 0) setCommentReplies(['']);
          else setCommentReplies(automation.commentReplies);
          setCommentsActive(true);
        }
    
        window.scrollTo({ top: 40, behavior: 'smooth' });
    };
    
    const deleteAutomation = async(automationId,reelId) => {
      try {
        setIsDeletingAutomation(automationId)
        await api.del("/comment-automation", { reelId, automationId } , token)
        await handleReelSelection(reelId);
      } catch (error) {
        console.log(error);
      } finally {
        setIsDeletingAutomation(null);
      }
    };

    const handleReelSelection = async (reelId) => {
      try {
          setIsGettingAutomation(true);
          setSelectedReel(reelId)
          const res = await api.get(`/comment-automation/${reelId}`, token);
          setSelectedReelAutomation(res.automations);
      } catch (error) {
          console.log(error)
      }finally {
          setIsGettingAutomation(false);
      }
    }
    const cancelEdit = () => resetReelForm();
    

  return (
    <div className="min-h-screen bg-background">
        <Header/>
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8"> 
          <ReelsSection 
            setIsGettingAutomation={setIsGettingAutomation}
            setSelectedReelAutomation={setSelectedReelAutomation}
            selectedReel = {selectedReel}
            setSelectedReel = {setSelectedReel}
            handleReelSelection={handleReelSelection}
          />

          <KeywordSection 
            keyword={keyword} 
            setKeyword={setKeyword}
            selectedReel={selectedReel}
            isActive = {isActive}
            setIsActive={setIsActive}
          />

          <AutomationSetup
            selectedReel={selectedReel}
            automationType={automationType}
            setAutomationType={setAutomationType}
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubTitle={setSubTitle}
            cardImage={cardImage}
            setCardImage={setCardImage}
            textMessages={textMessages}
            addTextMessage={addTextMessage}
            updateTextMessage={updateTextMessage}
            removeTextMessage={removeTextMessage}
            buttonTitle={buttonTitle}
            buttonUrl={buttonUrl}
            setButtonUrl={setButtonUrl}
            setButtonTitle={setButtonTitle}
            handleImageUpload={handleImageUpload}
            editingId={editingId}
            cancelEdit={cancelEdit}
          />

          <CommentSetup
            selectedReel={selectedReel}
            commentReplies={commentReplies}
            setCommentsActive={setCommentsActive}
            removeCommentReply={removeCommentReply}
            updateCommentReply={updateCommentReply}
            commentsActive={commentsActive}
            addCommentReply={addCommentReply}
          />

          <SavedAutomation
            selectedReel={selectedReel}
            editingId={editingId}
            selectedReelAutomation={selectedReelAutomation}
            deleteAutomation={deleteAutomation}
            editAutomation={editAutomation}
            isDeletingAutomation={isDeletingAutomation}
          />

          <SaveConfiguration
          automationType={automationType}
          editingId={editingId}
          keyword={keyword}
          saveReelAutomation={saveReelAutomation}
          selectedReel={selectedReel}
          isSavingAutomation={isSavingAutomation}
          />
        </div>

    </div>

  );
};

export default DashboardV3;
