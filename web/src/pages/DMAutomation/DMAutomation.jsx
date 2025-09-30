import { useEffect } from 'react';

import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import useDMAutomation from './hooks/useDMAutomation';
import Header from './components/Header';
import ExistingAutomations from './components/ExistingAutomations';
import CreateAutomation from './components/CreateAutomation';


const DMAutomation = () => {
  const {
    saveAutomation,cancelEdit,deleteAutomation, editAutomation,fetchAutomations,isButtonDisabled,
    addTextMessage,removeTextMessage, updateTextMessage,handleImageUpload, 
    isSaving,isDeleting,isFetchingAutomation,setKeyword,keyword,automationType, setAutomationType,
    dmMessages,card,setCard, editingId, existingAutomations
  } = useDMAutomation();
  
  useEffect(() => {fetchAutomations(); }, []);
  if(isFetchingAutomation) return <FullScreenLoader variant="orbit" message="Welcome to DM Automation" isVisible={isFetchingAutomation}/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
       <Header/>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Create/Edit Automation */}
          <CreateAutomation
          saveAutomation = {saveAutomation} cancelEdit ={cancelEdit} isButtonDisabled = {isButtonDisabled}
          addTextMessage = {addTextMessage} removeTextMessage = {removeTextMessage}  updateTextMessage = {updateTextMessage} 
          handleImageUpload = {handleImageUpload}
          isSaving = {isSaving} setKeyword = {setKeyword} keyword = {keyword} automationType = {automationType}  
          setAutomationType  = {setAutomationType}
          dmMessages = {dmMessages} card = {card} setCard = {setCard}  editingId = {editingId}
          />

          {/* Existing Automations */}
          <ExistingAutomations existingAutomations={existingAutomations} editingId = {editingId}  isDeleting={isDeleting}
                 editAutomation= {editAutomation} deleteAutomation={deleteAutomation}/>
        </div>
      </div>
    </div>
  );
};

export default DMAutomation;

