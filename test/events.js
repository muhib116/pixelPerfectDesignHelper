const getActiveLayout = (layoutData) => layoutData.config[layoutData.activeIndex]

const renderColor = () => {
    const activeLayout = getActiveLayout(layoutData)

    if(!activeLayout || !activeLayout.colors.length) {
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
}

const handleLayout = (e, layoutData) => {
    const { _identity, content } = e.target.dataset
    if(!_identity) return
    const events = {
        _pph_image_wrapper: () => {
            layoutData.activeIndex = content
            renderFileUpload()
        },
        _pph_delete_layout_btn: () => {
            if(!confirm('Are you sure?')) return
            layoutData.config.splice(content, 1)
            renderFileUpload()
        },
        _pph_image_upload_input: () => {
            const inputField = e.target
            inputField.oninput = () => {
                const file = inputField.files[0]
                const reader = new FileReader()
                reader.onload = (e) => {
                    layoutData.config[content].src = e.target.result
                    renderFileUpload()
                }
                reader.readAsDataURL(file)
            }
        },
    }

    events[_identity]()
}