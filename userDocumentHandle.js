// print image to DOM start
const _imageStyleAdd = (imgElement, activeLayoutData) => {
    if(!imgElement) return
    imgElement.style.cssText = `
        width: ${activeLayoutData.width}px;
        height: ${activeLayoutData.height}px;
        left: ${activeLayoutData.left}px;
        top: ${activeLayoutData.top}px;
        opacity: ${activeLayoutData.opacity};
        z-index: ${activeLayoutData.zIndex};
        position: fixed;
        pointer-events: ${activeLayoutData.isLock ? 'none' : 'auto'};
        cursor: ${activeLayoutData.isLock ? 'none' : 'move'};
        display: ${activeLayoutData.isShow ? '' : 'none'};
        filter: invert(${Number(activeLayoutData.invertImage)});
        user-select: none;
    `
}

const printImageInDOM = (layoutData) => 
{
    const activeLayoutData = layoutData.config[layoutData.activeIndex]
    layoutData.imgElement  = document.getElementById('_overlayImage_pixelPerfect')
    
    if(!activeLayoutData) {
        layoutData?.imgElement?.remove()
        return
    }
    
    if(!layoutData.imgElement && activeLayoutData?.src){
        layoutData.imgElement = document.createElement('img')
    }

    if(!layoutData.imgElement || !activeLayoutData?.src) return

    layoutData.imgElement.src = activeLayoutData.src
    layoutData.imgElement.setAttribute('id', '_overlayImage_pixelPerfect')
    layoutData.imgElement.setAttribute('draggable', 'false')
    document.body.appendChild(layoutData.imgElement)

    _imageStyleAdd(layoutData.imgElement, activeLayoutData)
    
    let isMouseDown = false
    let mouseDownPosition = { x: 0, y: 0}
    let distance = { x: 0, y: 0 }

    layoutData.imgElement.onmousedown = function(e) {
        mouseDownPosition.x = e.clientX
        mouseDownPosition.y = e.clientY
        isMouseDown = true
    }
    
    const handleMouseMove = (e) => {
        if (!isMouseDown) return
    
        distance.x = e.clientX - mouseDownPosition.x
        distance.y = e.clientY - mouseDownPosition.y
    
        activeLayoutData.left = Number(activeLayoutData.left) + Number(distance.x)
        activeLayoutData.top  = Number(activeLayoutData.top ) + Number(distance.y)
    
        layoutData.imgElement.style.left = activeLayoutData.left + 'px'
        layoutData.imgElement.style.top  = activeLayoutData.top + 'px'
    
        // Update the mouseDownPosition for the next move
        mouseDownPosition.x = e.clientX
        mouseDownPosition.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    
    window.addEventListener('mouseup', function() {
        isMouseDown = false
        storeInLocalStorage(layoutData)
        renderCssProperties()
    })
}
// print image to DOM end