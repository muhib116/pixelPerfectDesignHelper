
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
        ${AdBanner()}
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