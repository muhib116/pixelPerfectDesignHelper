
const wrapper = `
    <div
        class="fixed scrollbar draggable shadow-lg bg-gray-800 text-white rounded text-xs border border-red-500"
        id="_pph_toolbox"
        style="
            width: 300px;
            max-height: 400px;
            overflow-y: auto;
            z-index:999999999999999999999999999999;
        "
    >
        ${Header()}
        <div
            id="_pph_body"
            class="text-white p-4 grid gap-2"
        >
            ${ColorsHistory()}
            ${WidthHeight()}
            ${Position()}
            ${OpacityAndZIndex()}
            ${FileUpload()}
        </div>
        ${isPremium ? '' : AdBanner()}
    </div>
`


document.body.innerHTML = wrapper

loadFromLocalStorage()
runScript()
// onload data print from localStorage
renderColor()
renderCssProperties()
renderFileUpload()
printImageInDOM(layoutData)
makeToolboxDraggable(layoutData)



// onMounted tab button active highlight start
const activeLayoutData = getActiveLayout(layoutData)
const _handleClass = (element, addOrRemove) => {
    element.classList[addOrRemove]('bg-white')
    element.classList[addOrRemove]('text-red-500')
}

if(activeLayoutData.isShow){
    _handleClass(elements.pph_image_show_btn, 'remove')
}else {
    _handleClass(elements.pph_image_show_btn, 'add')
}

if(activeLayoutData.lock){
    _handleClass(elements.pph_image_lock_btn, 'add')
}else{
    _handleClass(elements.pph_image_lock_btn, 'remove')
}

if(activeLayoutData.invert){
    _handleClass(elements.pph_image_invert_btn, 'add')
}else{
    _handleClass(elements.pph_image_invert_btn, 'remove')
}
// onMounted tab button active highlight end