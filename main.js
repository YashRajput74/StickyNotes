import { addNewNote, renderNote, renderNotesList } from "./module/ui.js"
import { locallyStoreNote, locallyRetrieveNote } from "./module/localStorage.js";

function loadNotes() {
    const stickyNotesData = locallyRetrieveNote();
    
    for (const [uniqueId, note] of Object.entries(stickyNotesData)) {
        renderNote([uniqueId, note]);
    }
}

window.addEventListener("DOMContentLoaded", loadNotes);
window.addEventListener("DOMContentLoaded", renderNotesList);
document.querySelector(".newNoteButton").addEventListener("click",addNewNote);
document.querySelector("main").addEventListener("click",(event)=>{
    const targetedButton=event.target;
    if(targetedButton.classList.contains("saveBtn")){
            const noteDiv = targetedButton.closest('.note');
            const uniqueId = noteDiv.dataset.id;
            const updatedTitle = noteDiv.querySelector('div div[contenteditable="true"]').innerText;
            const updatedContent = noteDiv.querySelector('.stickyContent[contenteditable="true"]').innerText;
            const stickyNotesData = JSON.parse(localStorage.getItem('stickyNotesData')) || {};
            
            if (stickyNotesData[uniqueId]) {
                stickyNotesData[uniqueId].title = updatedTitle;
                stickyNotesData[uniqueId].content = updatedContent;
                locallyStoreNote(stickyNotesData);
            }
            renderNotesList();
        }
    
        else if (targetedButton.classList.contains("deleteBtn")) {
            const noteDiv = targetedButton.closest('.note');
            const uniqueId = noteDiv.dataset.id;
            const stickyNotesData = JSON.parse(localStorage.getItem('stickyNotesData')) || {};
    
            if (stickyNotesData[uniqueId]) {
                delete stickyNotesData[uniqueId];
                locallyStoreNote(stickyNotesData);
            }    
            noteDiv.remove();
            renderNotesList();
        }
})
//localStorage.clear();