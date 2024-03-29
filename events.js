const getActiveLayout = (layoutData) => layoutData.config[layoutData.activeIndex]

const renderColor = () => {
    const activeLayout = getActiveLayout(layoutData)

    if(!activeLayout || !activeLayout.colors?.length) {
        elements.pph_color_history_wrapper.classList.add('hidden')
    }else{
        elements.pph_color_history_wrapper.classList.remove('hidden')
        let colorBoxes = activeLayout.colors.map((color, index) => ColorBox({color, index})).join('')
        elements.pph_colors_wrapper.innerHTML = colorBoxes
    }
    storeInLocalStorage(layoutData)
}

const renderCssProperties = () => {
    const activeLayout = getActiveLayout(layoutData)
    if(!activeLayout) return
    elements.pph_width_input.value = activeLayout.width
    elements.pph_height_input.value = activeLayout.height
    elements.pph_left_input.value = activeLayout.left
    elements.pph_top_input.value = activeLayout.top
    elements.pph_opacity_input.value = activeLayout.opacity
    elements.pph_zIndex_input.value = activeLayout.zIndex
}

const renderFileUpload = () => {
    renderColor()
    renderCssProperties()
    elements.pph_layouts_wrapper.innerHTML = layoutData.config.map((layout, index) => {
        return ImageBoxForUpload(layout, index)
    }).join('')
    storeInLocalStorage(layoutData)
}

const handleCssProperty = (e, layoutData, dataKey) => {
    const activeLayout = getActiveLayout(layoutData)
    activeLayout[dataKey] = e.target.value
    renderCssProperties()
    storeInLocalStorage(layoutData)
    printImageInDOM(layoutData)
}


const handleImageProcess = (file, index) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const base64Image = e.target.result;
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

            const newBase64Image = canvas.toDataURL('image/webp', 0.7);

            layoutData.config[index].src = newBase64Image;
            renderFileUpload();
            printImageInDOM(layoutData);
        };

        img.src = base64Image;
    };
    reader.readAsDataURL(file)
}
const handleLayout = (e, layoutData) => {
    const { _identity, content: index } = e.target.dataset
    if(!_identity) return

    const removeOverlayImage = () => {
        let overlayImage_pixelPerfect = document.getElementById('_overlayImage_pixelPerfect')
        if(overlayImage_pixelPerfect){
            overlayImage_pixelPerfect.remove()
        }
    }
    const events = {
        _pph_image_wrapper: () => {
            layoutData.activeIndex = index
            renderFileUpload()
            printImageInDOM(layoutData)
        },
        _pph_delete_layout_btn: () => {
            if (!window.confirm('Are you sure?')) return

            layoutData.config.splice(index, 1)

            if (layoutData.activeIndex == index)
            {
                const lowerActiveIndex = layoutData.activeIndex - 1
                const upperActiveIndex = layoutData.activeIndex + 1
                if (lowerActiveIndex >= 0) {
                    layoutData.activeIndex = lowerActiveIndex
                } else if (upperActiveIndex < layoutData.config.length) {
                    layoutData.activeIndex = upperActiveIndex
                } else {
                    layoutData.activeIndex = 0
                }
                removeOverlayImage()
            }

            renderFileUpload()
            printImageInDOM(layoutData)
        },
        _pph_image_upload_input: () => {
            const inputField = e.target
            inputField.oninput = () => {
                const file = inputField.files[0]
                handleImageProcess(file, index)
            }
        }
    }

    events[_identity]()
}

window.addEventListener('paste', (e) => {
    const files = e.clipboardData.files
    const lastLayout = layoutData.config[layoutData.config.length - 1]

    if(files.length){
        [...files].forEach(file => {
            if(lastLayout && !lastLayout.src){
                handleImageProcess(files, layoutData.config.length - 1)
            }else{
                layoutData.config.push({...placeholderConfig})
                handleImageProcess(file, layoutData.config.length - 1)
            }
        })
    }
})


const makeToolboxDraggable = (layoutData) => {
    const panelMouseDownPosition = {
        x: 0,
        y: 0
    }
    const panelDistance = {
        x: 0,
        y: 0
    }

    let panelIsMouseDown = false
    elements.pph_move_btn.onmousedown = (e) => {
        layoutData.toolBoxWrapper = e.target.closest('.draggable')
        panelMouseDownPosition.x = e.clientX
        panelMouseDownPosition.y = e.clientY
        panelIsMouseDown = true
    }
    
    const mouseMoveHandler = (e) => {
        if (!panelIsMouseDown) return
        
        panelDistance.x = e.clientX - panelMouseDownPosition.x
        panelDistance.y = e.clientY - panelMouseDownPosition.y
    
        const panelCoordinates = layoutData.panelCoordinates
        const toolBoxInfo = layoutData.toolBoxWrapper.getBoundingClientRect()
    
    
        let left = Number(toolBoxInfo.left) + Number(panelDistance.x)
        let top = Number(toolBoxInfo.top ) + Number(panelDistance.y)

        panelCoordinates.left = left < 0 ? 0 : 
                                    (left + toolBoxInfo.width) > window.innerWidth
                                        ? (window.innerWidth - toolBoxInfo.width)
                                        : left
        panelCoordinates.top  = top < 0 ? 0 :
                                    (top + toolBoxInfo.height) > window.innerHeight
                                        ? (window.innerHeight - toolBoxInfo.height)
                                        : top
        
        layoutData.toolBoxWrapper.style.left = panelCoordinates.left + 'px'
        layoutData.toolBoxWrapper.style.top  = panelCoordinates.top + 'px'

        // Update the mouseDownPosition for the next move
        panelMouseDownPosition.x = e.clientX
        panelMouseDownPosition.y = e.clientY
    }
    window.addEventListener('mousemove', mouseMoveHandler)

    const mouseUpHandler = () => {
        panelIsMouseDown = false
        storeInLocalStorage(layoutData)
    }
    window.addEventListener('mouseup', mouseUpHandler)
}