const placeholderConfig = {
    img: null,
    width: null,
    height: null,
    left: 0,
    top: 0,
    opacity: 0.5,
    showImage: true,
    fileInput: null,
    zIndex: 1000,
    isLock: false,
    isShow: true,
}

const layoutData = ref({
    activeIndex: 0,
    isCollapsed: false,
    config: []
})

const testData = [
    { src: "https://cdn-icons-png.flaticon.com/128/1055/1055666.png" },
    { src: "https://cdn-icons-png.flaticon.com/128/2409/2409387.png" },
    { src: "https://cdn-icons-png.flaticon.com/128/11513/11513321.png" },
]


const toolBox = `
    <div
        class="shadow-lg bg-gray-800 rounded text-xs border border-red-500"
        style="width: 300px;position: fixed;left: 200px;top: 200px;max-height: 400px;overflow-y: auto;"
    >
        ${Header()}
        <div class="text-white p-4 grid gap-2">
            <div 
                class="grid grid-cols-3 overflow-y-auto gap-2" 
                style="max-height: 200px"
            >
                ${FileUpload()}
                ${LayoutImages({data:testData})}
            </div>
                
            ${WidthHeight()}
            ${Position()}
            ${OpacityAndZIndex()}
        </div>
        ${AdBanner()}
    </div>
`
// ${layoutImages()}
printRealHtml(toolBox)

const elementsData = [
    {
        element: _id("_PFCollapse"),
        property: "collapse"
    },
    {
        element: _id("_PFShowHide"),
        property: "showHide"
    },
    {
        element: _id("_PFLockUnlock"),
        property: "lockUnlock"
    },
    {
        element: _id("_PFInvertImage"),
        property: "invertImage"
    },
    {
        element: _id("_PFWidth"),
        property: "width"
    },
    {
        element: _id("_PFHeight"),
        property: "height"
    },
    {
        element: _id("_PFOpacity"),
        property: "opacity"
    },
    {
        element: _id("_PFZIndex"),
        property: "zIndex"
    },
    {
        element: _id("_PFLeft"),
        property: "left"
    },
    {
        element: _id("_PFTop"),
        property: "top"
    }
]

elementsData.forEach(item => {
    const activeConfig = layoutData.config[layoutData.activeIndex]
    item.onInput = () => 
    {
        activeConfig[item.property] = item.element.value
    }
})