import { addNewNote, renderNote } from "./module/ui.js"
import { locallyStoreNote, locallyRetrieveNote } from "./module/localStorage.js";

function loadNotes() {
    const stickyNotesData = locallyRetrieveNote();
    
    for (const [uniqueId, note] of Object.entries(stickyNotesData)) {
        renderNote([uniqueId, note]);
    }
}

window.addEventListener("DOMContentLoaded", loadNotes);
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
        }
})
document.querySelector("main").addEventListener("click", (event) => {
    if (event.target.classList.contains("gradientBtn")) {
        const noteDiv = event.target.closest('.note');
        const gradient = event.target.style.background;
        noteDiv.style.background = gradient;
    }
})
//localStorage.clear();