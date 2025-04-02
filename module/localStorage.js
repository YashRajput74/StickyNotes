export function locallyRetrieveNote(){
    return JSON.parse(localStorage.getItem("stickyNotesData")) || {};
}

export function locallyStoreNote(data){
    const stringifiedData = JSON.stringify(data);

    console.log("Serialized data:", stringifiedData);
    localStorage.setItem("stickyNotesData", stringifiedData);
}