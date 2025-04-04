export function makeNoteDraggable(noteDiv, uniqueId) {
    let offsetX, offsetY, isDragging = false;
    noteDiv.addEventListener('mousedown', (event) => {
        if (event.target.isContentEditable || event.target.closest('[contenteditable="true"]')) {
            return;
        }
        event.preventDefault();
        /**check if the event is mousedown or touchdown then set offset according to that */
        const ClientInputX=event.type=="mousedown"?event.clientX:event.touches[0].clientX;/**touches[0] is the first touch by the phone user(touch[1] is the second finger) */
        const ClientInputY=event.type=="mousedown"?event.clientY:event.touches[0].clientY;
        offsetX = ClientInputX - noteDiv.offsetLeft;
        offsetY = ClientInputY - noteDiv.offsetTop;
        isDragging = true;
        const onMouseMove = (moveEvent) => {
            if (isDragging) {
                const ClientMoveX=moveEvent.type=="mousemove"?moveEvent.clientX:moveEvent.touches[0].clientX;/**if the event is of mouse the event.clientx is calculated of mouse otherwise it is calculated of y */
                const ClientMoveY=moveEvent.type=="mousemove"?moveEvent.clientY:moveEvent.touches[0].clientY;

                const newLeft = ClientMoveX- offsetX;
                const newTop = ClientMoveY - offsetY;
                noteDiv.style.left = `${newLeft}px`;
                noteDiv.style.top = `${newTop}px`;
            }
        };
        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('touchmove', onMouseMove);
                document.removeEventListener('touchend', onMouseUp);
            }
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('touchend', onMouseUp);
    });
}
