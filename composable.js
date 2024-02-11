const { ref, computed, watch, createApp, onMounted } = Vue

const storageKey = '_pixelPerfectLayoutData'
const placeholderConfig = {
    imgElement: null,
    src: null,
    width: null,
    height: null,
    left: 0,
    top: 0,
    opacity: 0.5,
    showImage: true,
    zIndex: 1000,
    isLock: false,
    isShow: true,
    invertImage: false,
    colors: []
}

const layoutData = ref({
    activeIndex: 0,
    isCollapsed: false,
    imgElement: null,
    config: []
})

const start = () => {
    loadFromLocalStorage()
    printImageInDOM(layoutData.value)
}


// topBar action handler start
const handleCollapse = () => {
    layoutData.value.isCollapsed = !layoutData.value.isCollapsed
}
const handleShowForActiveLayout = () => {
    let activeLayout = layoutData.value.config[layoutData.value.activeIndex]
    if(activeLayout.src){
        activeLayout.isShow = !activeLayout.isShow
        printImageInDOM(layoutData.value)
    }else{
        alert('Please select a layout, that has image. or upload a new image')
    }
}
const handleLockForActiveLayout = () => {
    let activeLayout = layoutData.value.config[layoutData.value.activeIndex]
    if(activeLayout.src){
        activeLayout.isLock = !activeLayout.isLock
        printImageInDOM(layoutData.value)
    }else{
        alert('Please select a layout, that has image. or upload a new image')
    }
}
const handleInvertImageForActiveLayout = () => {
    let activeLayout = layoutData.value.config[layoutData.value.activeIndex]
    if(activeLayout.src){
        activeLayout.invertImage = !activeLayout.invertImage
        printImageInDOM(layoutData.value)
    }else{
        alert('Please select a layout, that has image. or upload a new image')
    }
}
// topBar action handler end


// panel body action start
const addNewLayout = () => {
    layoutData.value.config.unshift({...placeholderConfig})
    printImageInDOM(layoutData.value)
}
const deleteLayout = (index, layoutData) => {
    if(!confirm('Are you sure you want to delete this layout?')) return
    layoutData.config.splice(index, 1)
    layoutData.activeIndex = (index - 1) >= 0 ? index - 1 : 0
}
const setActiveIndex = (index) => {
    layoutData.value.activeIndex = index
    printImageInDOM(layoutData.value)
}
const openColorPicker = async(activeLayout) => {
    try {
        const colorPicker = new EyeDropper()
        const { sRGBHex } = await colorPicker.open()
        activeLayout.colors.unshift(sRGBHex)
    } catch (error) {
        console.error(error)
    }
}
const copyColorToClipBoard = async (color, handleCopyStatus) => {
    try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
            throw new Error('Clipboard writeText API not supported')
        }
        await navigator.clipboard.writeText(color)
        handleCopyStatus()
    } catch (error) {
        console.error('Failed to copy color to clipboard:', error);
    }
}
const clearColors = (activeLayout) => {
    if(!confirm('Are you sure ?')) return
    activeLayout.colors = []
}
const deleteSingleColor = (index, activeLayout) => {
    if(!confirm('Are you sure delete this color ?')) return
    activeLayout.colors.splice(index, 1)
}
const changeColor = (event, index, activeLayout) => {
    activeLayout.colors[index] = event.target.value
}
// panel body action end


// localStorage methods start
const storeInLocalStorage = (layoutData) => {
    localStorage.setItem(storageKey, JSON.stringify(layoutData))
}
const loadFromLocalStorage = () => {
    if(!localStorage.getItem(storageKey)) return
    let localStorageLayoutData = JSON.parse(localStorage.getItem(storageKey))
    layoutData.value = localStorageLayoutData ? localStorageLayoutData : layoutData.value
}
const deleteInLocalStorage = () => {
    localStorage.clear(storageKey)
}
// localStorage methods end



// print image to DOM start
const printImageInDOM = (layoutData) => 
{
    const activeLayoutData = layoutData.config[layoutData.activeIndex]
    layoutData.imgElement = document.getElementById('_overlayImage_pixelPerfect')
    
    if(!activeLayoutData) {
        layoutData?.imgElement?.remove()
        return
    }
    
    if(!layoutData.imgElement){
        layoutData.imgElement = document.createElement('img')
    }

    layoutData.imgElement.src = activeLayoutData.src
    layoutData.imgElement.setAttribute('id', '_overlayImage_pixelPerfect')
    layoutData.imgElement.setAttribute('draggable', 'false')
    document.body.appendChild(layoutData.imgElement)

    imageStyleAdd(layoutData.imgElement, activeLayoutData)
    
    let isMouseDown = false
    let mouseDownPosition = { x: 0, y: 0}
    let distance = { x: 0, y: 0 }

    layoutData.imgElement.onmousedown = function(e) {
        mouseDownPosition.x = e.clientX
        mouseDownPosition.y = e.clientY
        isMouseDown = true
    }
    
    layoutData.imgElement.onmousemove = function(e) {
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
    
    window.onmouseup = function() {
        isMouseDown = false
        // send data to background script
        storeInLocalStorage(layoutData)
    }
}
const imageStyleAdd = (imgElement, activeLayoutData) => {
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
    `
}
// print image to DOM end


// panel move by dragging start

// panel move by dragging end