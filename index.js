const div = document.createElement("div");
div.setAttribute("id", "_extension_toolBox");
document.body.appendChild(div);

const { createApp, onMounted, watch } = Vue;

createApp({
    components: {
        Header,
        FileUpload,
        LayoutImages,
        WidthHeight,
        Position,
        OpacityAndZIndex,
        AdBanner
    },
    setup() {
        let timeoutId = null
        onMounted(() => {
            start()
        })
        watch(() => layoutData, () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                console.log('working...')
                storeInLocalStorage(layoutData.value)
            }, 500)
        }, {deep: true})
        return {
            placeholderConfig,
            layoutData,
            activeLayout: layoutData.value.config[layoutData.value.activeIndex]
        }
    },
    template: `
        <div
            class="shadow-lg bg-gray-800 rounded text-xs border border-red-500"
            style="width: 300px;position: fixed;left: 200px;top: 200px;max-height: 400px;overflow-y: auto;"
        >
            <Header />
            <div
                v-if="layoutData.config[layoutData.activeIndex]"
                class="text-white p-4 grid gap-2"
            >
                <WidthHeight
                    :activeLayout="layoutData.config[layoutData.activeIndex]"
                />
                <Position
                    :activeLayout="layoutData.config[layoutData.activeIndex]"
                />
                <OpacityAndZIndex
                    :activeLayout="layoutData.config[layoutData.activeIndex]"
                />
                <FileUpload class="mt-4 overflow-y-auto" style="max-height: 266px" />    
            </div>
            <AdBanner />
        </div>
    `
}).mount('#_extension_toolBox');