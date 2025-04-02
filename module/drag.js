export function makeNoteDraggable(noteDiv, uniqueId) {
    let offsetX, offsetY, isDragging = false;

    noteDiv.addEventListener('mousedown', (event) => {
        event.preventDefault();
        offsetX = event.clientX - noteDiv.offsetLeft;
        offsetY = event.clientY - noteDiv.offsetTop;
        isDragging = true;
        const onMouseMove = (moveEvent) => {
            if (isDragging) {
                const newLeft = moveEvent.clientX - offsetX;
                const newTop = moveEvent.clientY - offsetY;
                noteDiv.style.left = `${newLeft}px`;
                noteDiv.style.top = `${newTop}px`;
            }
        };
        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}