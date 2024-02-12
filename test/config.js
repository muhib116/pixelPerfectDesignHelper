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

const layoutData = {
    panelElement: null,
    activeIndex: 0,
    panelCoordinates: {
        left: 200,
        top: 200
    },
    isCollapsed: false,
    imgElement: null,
    config: []
}

// _pph_move_btn
// _pph_collapse_btn
// _pph_image_show_btn
// _pph_image_lock_btn
// _pph_image_invert_btn
// _pph_color_picker_btn
// _pph_body

// _pph_color_history_wrapper
// _pph_colors_clear_btn
// _pph_colors_wrapper
// data-_pph_color_picker
// data-_pph_color_delete_btn

// _pph_width_input
// _pph_height_input
// _pph_left_input
// _pph_top_input
// _pph_opacity_input
// _pph_zIndex_input
// _pph_banner_container