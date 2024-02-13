
const wrapper = `
    <div
        class="scrollbar draggable shadow-lg bg-gray-800 text-white rounded text-xs border border-red-500"
        style="width: 300px;position: fixed;max-height: 400px;overflow-y: auto; z-index:999999999999999999999999999999 "
        :style="{
            left: layoutData.panelCoordinates.left+'px',
            top: layoutData.panelCoordinates.top+'px'
        }"
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

runScript()

// onload data print from localStorage
loadFromLocalStorage()
renderColor()
renderCssProperties()
renderFileUpload()