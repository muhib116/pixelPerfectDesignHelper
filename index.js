const wrapper = `
<div 
    class="_pixelPilotMainWrapper draggable shadow"
    style="
        z-index:999999999999999999999999999999;
        width: 300px;
        overflow: hidden;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    "
>
    <div
        class="_pp_scrollbar shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded text-xs"
        id="_pph_toolbox"
    >
        ${Header()}
        <div
            id="_pph_body"
            class="_pp_scrollbar text-white p-4 _pp_grid gap-2"
            style="
                max-height: 330px;
                overflow-y: auto;
            "
        >
            ${ ColorsHistory() }
            ${ WidthHeight() }
            ${ Position() }
            ${ OpacityAndZIndex() }
            ${ FileUpload() }
        </div>
        ${Banner()}
    </div>
</div>
`
const tempDiv = document.createElement('div')
tempDiv.innerHTML = wrapper
const panelWrapperElement = tempDiv.firstElementChild

loadFromLocalStorage()

// onMounted tab button active highlight start
const onLoadActionPanelButtonActivation = () => 
{
    const activeLayoutData = getActiveLayout(layoutData)

    const _handleClass = (element, addOrRemove) => {
        element.classList[addOrRemove]('bg-white')
        element.classList[addOrRemove]('text-red-500')
    }

    if(activeLayoutData && activeLayoutData?.isShow){
        _handleClass(elements.pph_image_show_btn, 'remove')
    }else {
        _handleClass(elements.pph_image_show_btn, 'add')
    }

    if(activeLayoutData?.isLock){
        _handleClass(elements.pph_image_lock_btn, 'add')
    }else{
        _handleClass(elements.pph_image_lock_btn, 'remove')
    }

    if(activeLayoutData?.invertImage){
        _handleClass(elements.pph_image_invert_btn, 'add')
    }else{
        _handleClass(elements.pph_image_invert_btn, 'remove')
    }
}
// onMounted tab button active highlight end



const loadFirstTime = () => {
    // If the panel already exists, remove it
    const existingPanel = document.getElementById('_pph_toolbox');
    if (existingPanel) {
        existingPanel.remove();
    }

    // Prepend the new panel to the body
    document.body.prepend(panelWrapperElement)


    //check if panel left position or top position get negative value then set them to 0
    if(layoutData.panelCoordinates.left < 0) layoutData.panelCoordinates.left = 30
    if(layoutData.panelCoordinates.top < 0) layoutData.panelCoordinates.top = 30
    //check if panel left position or top position get negative value then set them to 0


    runScript();
    // onload data print from localStorage
    renderColor();
    renderCssProperties();
    renderFileUpload();
    printImageInDOM(layoutData);
    makeToolboxDraggable(layoutData);

    onLoadActionPanelButtonActivation();
}

// Load data from local storage

// Function to handle panel display
function handlePanelDisplay() {
    layoutData.showPanel = !layoutData.showPanel;
    let overLayImgElement = document.getElementById('_overlayImage_pixelPerfect')
    if(!layoutData.showPanel && overLayImgElement){
        overLayImgElement.remove()
    }

    // If panel should be shown, load it
    if (layoutData.showPanel) {
        loadFirstTime();
    } else if (panelWrapperElement) {
        panelWrapperElement.remove();
    }

    // Store the updated layoutData in local storage
    storeInLocalStorage(layoutData);
}

// If panel should be shown initially, load it
if (layoutData.showPanel) {
    loadFirstTime();
}


// If chrome.runtime.onMessage exists, add a listener
if (chrome.runtime?.onMessage) {
    chrome.runtime.onMessage.addListener((request) => handlePanelDisplay());
}