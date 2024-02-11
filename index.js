const div = document.createElement("div");
div.setAttribute("id", "_extension_toolBox");
document.body.appendChild(div)

createApp({
    components: {
        Header,
        FileUpload,
        LayoutImages,
        WidthHeight,
        Position,
        OpacityAndZIndex,
        AdBanner,
        ColorsHistory
    },
    setup() {
        let timeoutId = null
        const {
            mouseDown,
            mouseMove,
            mouseUp,
            position
        } = moveMe()

        onMounted(() => {
            start()
        })
        watch(() => layoutData, () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                storeInLocalStorage(layoutData.value)
                imageStyleAdd(layoutData.value.imgElement, layoutData.value.config[layoutData.value.activeIndex])
            }, 500)
        }, {deep: true})
        return {
            placeholderConfig,
            layoutData,
            activeLayout: layoutData.value.config[layoutData.value.activeIndex],
            mouseDown,
            mouseMove,
            mouseUp,
            position
        }
    },
    template: `
        <div
            class="draggable shadow-lg bg-gray-800 text-white rounded text-xs border border-red-500"
            style="width: 300px;position: fixed;left: 200px;top: 200px;max-height: 400px;overflow-y: auto; z-index:999999999999999999999999999999 "
        >
            <Header
                :activeLayout="layoutData.config[layoutData.activeIndex]"
                :mouseDown="mouseDown"
                :mouseMove="mouseMove"
                :mouseUp="mouseUp"
                class="sticky top-0"
            />
            <div
                v-if="!layoutData.isCollapsed"
                class="text-white p-4 grid gap-2"
            >
                <ColorsHistory
                    :activeLayout="layoutData.config[layoutData.activeIndex]"
                />
                <WidthHeight
                    v-if="layoutData.config[layoutData.activeIndex] && layoutData.config[layoutData.activeIndex].src"
                    :activeLayout="layoutData.config[layoutData.activeIndex]"
                />
                <Position
                    v-if="layoutData.config[layoutData.activeIndex] && layoutData.config[layoutData.activeIndex].src"
                    :activeLayout="layoutData.config[layoutData.activeIndex]"
                />
                <OpacityAndZIndex
                    v-if="layoutData.config[layoutData.activeIndex] && layoutData.config[layoutData.activeIndex].src"
                    :activeLayout="layoutData.config[layoutData.activeIndex]"
                />
                <FileUpload class="mt-4 overflow-y-auto" style="max-height: 266px" />    
            </div>
            <AdBanner />
        </div>
    `
}).mount('#_extension_toolBox');