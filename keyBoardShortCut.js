const handleKeyboardShortCut = (layoutData) => {
    //bind the function to the window keydown event
    window.addEventListener('keydown', (e) => {
        // shift + e | l | i | c | t)
        /**
         * e: show
         * c: color picker
         * l: lock
         * i: invert
         * t: toggle
         */
        const keyBindings = {
            KeyE: () => {
                layoutData.config[layoutData.activeIndex].isShow = !layoutData.config[layoutData.activeIndex].isShow
                elements.pph_image_show_btn.classList.toggle('bg-white')
                elements.pph_image_show_btn.classList.toggle('text-red-500')
            },
            KeyC: () => {
                handleColorPicking(layoutData)
            },
            KeyL: () => {
                layoutData.config[layoutData.activeIndex].isLock = !layoutData.config[layoutData.activeIndex].isLock
                elements.pph_image_lock_btn.classList.toggle('bg-white')
                elements.pph_image_lock_btn.classList.toggle('text-red-500')
            },
            KeyI: () => {
                layoutData.config[layoutData.activeIndex].invertImage = !layoutData.config[layoutData.activeIndex].invertImage
                elements.pph_image_invert_btn.classList.toggle('bg-white')
                elements.pph_image_invert_btn.classList.toggle('text-red-500')
            },
            KeyT: () => {
                layoutData.isCollapsed = !layoutData.isCollapsed
                elements.pph_body.classList.toggle('hidden')
                elements.pph_collapse_btn.classList.toggle('bg-white')
                elements.pph_collapse_btn.classList.toggle('text-red-500')
            },
        }
        if(e.shiftKey && keyBindings[e.code] && layoutData.showPanel)
        {
            keyBindings[e.code]()
            printImageInDOM(layoutData)
            storeInLocalStorage(layoutData)
        }
    })
}

handleKeyboardShortCut(layoutData)