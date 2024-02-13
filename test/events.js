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

const handleCssProperty = (e, layoutData, dataKey) => {
    console.log('first')
    const activeLayout = getActiveLayout(layoutData)
    activeLayout[dataKey] = e.target.value
    renderCssProperties()
    storeInLocalStorage(layoutData)
}