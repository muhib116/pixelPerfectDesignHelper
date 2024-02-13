const storageKey = '_pixelPerfectLayoutData'
const placeholderConfig = {
    imgElement: null,
    src: null,
    width: null,
    height: null,
    left: 0,
    top: 0,
    opacity: 1,
    showImage: true,
    zIndex: 1000,
    isLock: false,
    isShow: true,
    invertImage: false,
    colors: []
}

let layoutData = {
    panelElement: null,
    activeIndex: 0,
    panelCoordinates: {
        left: 200,
        top: 200
    },
    isCollapsed: false,
    imgElement: null,
    config: [{
        imgElement: null,
        src: null,
        width: null,
        height: null,
        left: 0,
        top: 0,
        opacity: 1,
        showImage: true,
        zIndex: 1000,
        isLock: false,
        isShow: true,
        invertImage: false,
        colors: []
    }]
}


// localStorage methods start
const storeInLocalStorage = (layoutData) => {
    localStorage.setItem(storageKey, JSON.stringify(layoutData))
}
const loadFromLocalStorage = () => {
    if(!localStorage.getItem(storageKey)) return
    let localStorageLayoutData = JSON.parse(localStorage.getItem(storageKey))
    layoutData = localStorageLayoutData ? localStorageLayoutData : layoutData.value
}
const deleteInLocalStorage = () => {
    localStorage.clear(storageKey)
}
// localStorage methods end

const _id = (id) => document.getElementById(id)

const getElementsById = () => ({
    pph_move_btn: _id("_pph_move_btn"),
    pph_collapse_btn: _id("_pph_collapse_btn"),
    pph_image_show_btn: _id("_pph_image_show_btn"),
    pph_image_lock_btn: _id("_pph_image_lock_btn"),
    pph_image_invert_btn: _id("_pph_image_invert_btn"),
    pph_body: _id("_pph_body"),
    
    pph_color_picker_btn: _id("_pph_color_picker_btn"),
    pph_color_history_wrapper: _id('_pph_color_history_wrapper'),
    pph_colors_clear_btn: _id('_pph_colors_clear_btn'),
    pph_colors_wrapper: _id('_pph_colors_wrapper'),
    pph_copied_status: _id('_pph_copied_status'),
    pph_copy_color_btn: _id('_pph_copy_color_btn'),

    pph_width_input: _id('_pph_width_input'),
    pph_height_input: _id('_pph_height_input'),
    pph_left_input: _id('_pph_left_input'),
    pph_top_input: _id('_pph_top_input'),
    pph_opacity_input: _id('_pph_opacity_input'),
    pph_zIndex_input: _id('_pph_zIndex_input'),
    pph_banner_container: _id('_pph_banner_container'),
    pph_add_layout_btn: _id('_pph_add_layout_btn'),
    pph_layouts_wrapper: _id('_pph_layouts_wrapper'),
})

let elements
const runScript = () => {
    elements = getElementsById()
    
    elements.pph_color_picker_btn.onclick = () => {
        handleColorPicking(layoutData)
    }
    elements.pph_colors_clear_btn.onclick = () => {
        handleColorClear(layoutData)
    }
    elements.pph_colors_wrapper.onclick = (e) => {
        handleColorItem(e, layoutData)
    }

    elements.pph_width_input.oninput = (e) => {
        handleCssProperty(e, layoutData, 'width')
    }
    elements.pph_height_input.oninput = (e) => {
        handleCssProperty(e, layoutData, 'height')
    }
    elements.pph_left_input.oninput = (e) => {
        handleCssProperty(e, layoutData, 'left')
    }
    elements.pph_top_input.oninput = (e) => {
        handleCssProperty(e, layoutData, 'top')
    }
    elements.pph_opacity_input.oninput = (e) => {
        handleCssProperty(e, layoutData, 'opacity')
    }
    elements.pph_zIndex_input.oninput = (e) => {
        handleCssProperty(e, layoutData, 'zIndex')
    }
    elements.pph_add_layout_btn.onclick = () => {
        layoutData.config.push({...placeholderConfig})
        renderFileUpload()
    }
    elements.pph_layouts_wrapper.onclick = (e) => {
        handleLayout(e, layoutData)
    }
}