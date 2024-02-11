const moveMe = () => {
    const position = {
        x: 0,
        y: 0
    }
    let isMouseDown = false
    let elementToMove = null
    const mouseDown = (e) => {
        isMouseDown = true
    }
    const mouseMove = (e) => {
        if (isMouseDown) {
            position.x += e.movementX
            position.y += e.movementY
        }
    }
    const mouseUp = () => {
        isMouseDown = false
    }

    return {
        mouseDown,
        mouseMove,
        mouseUp,
        position
    }
}