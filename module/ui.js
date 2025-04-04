import {addDate} from "./date.js"
import {locallyRetrieveNote, locallyStoreNote} from "./localStorage.js"
import { makeNoteDraggable } from "./drag.js";
export function renderNote([uniqueId, note]){
    const gradientColors = [
        'linear-gradient(135deg, #e57373, #c0392b)',
        'linear-gradient(135deg, #a8d5ba, #6aa84f)',
        'linear-gradient(135deg, #88b04b, #4caf50)',
        'linear-gradient(135deg, #89cff0, #4682b4)',
        'linear-gradient(135deg, #5d9cec, #3b6ea5)',
        'linear-gradient(135deg, #fdd835, #f9a825)',
        'linear-gradient(135deg, #f8bbd0, #d81b60)',
        'linear-gradient(135deg, #f06292, #c2185b)',
        'linear-gradient(135deg, #2c2c2e, #000000)',
        'linear-gradient(135deg, #d6d6d6, #ffffff)'
    ];
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.dataset.id = uniqueId;
    const randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    noteDiv.style.background = randomGradient;
    const randomTop = Math.floor(Math.random() *40) + 10;    const randomLeft = Math.floor(Math.random() * 50) + 10;
    noteDiv.style.position = 'absolute';
    noteDiv.style.top = `${randomTop}vh`;
    noteDiv.style.left = `${randomLeft}vw`;
    noteDiv.innerHTML = `
        <div>
            <div contenteditable="true">${note.title}</div>
            <div>${note.date}</div>
        </div>
        <div class="stickyContent" contenteditable="true">${note.content}</div>
        <div class="buttonContainer">
            <button class="colorBtn">Color</button>
            <button class="saveBtn">Save</button>
            <button class="deleteBtn">Delete</button>
        </div>
       <div class="gradientButtons">
            ${gradientColors.map(gradient => `<div class="gradientBtn" style="background: ${gradient};"></div>`).join('')}
        </div>
    `;
    document.querySelector("main").appendChild(noteDiv);
    makeNoteDraggable(noteDiv, uniqueId);
}

export function renderNotesList(){
    const stickyNotesData = locallyRetrieveNote();
    const allNotesDiv = document.querySelector(".allNotes>div");
    allNotesDiv.innerHTML = '';
    for (const [uniqueId, note] of Object.entries(stickyNotesData)) {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("notePreview");
        noteDiv.innerHTML = `
            <div class="noteTitle">${note.title}</div>
            <div class="noteDate">${note.date}</div>
        `;
        noteDiv.addEventListener("click", () => {
            console.log(`Clicked on note with ID: ${uniqueId}`);
        });
        allNotesDiv.appendChild(noteDiv);
    }
}

export function addNewNote(){
    const uniqueId = new Date().getTime();
    const note={
        title: "New Note",
        content: "Add the content of the note here.",
        date: addDate()
    }
    renderNote([uniqueId, note]);
    let stickyNotesData = locallyRetrieveNote();
    stickyNotesData[uniqueId] = note;
    console.log("Notes after adding new one:", stickyNotesData);
    locallyStoreNote(stickyNotesData);
    renderNotesList();
}
