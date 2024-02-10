// basic component start
const TemplatePreview = {
    props: ['item', 'isActive'],
    template: `
        <div 
            v-if="item?.src" 
            class="aspect-squire border shadow cursor-pointer bg-white rounded overflow-hidden"
            :class="isActive ? 'border-red-500' : 'border-black'"
        >
            <img
                class="block w-full"
                :src="item.src"
            />
        </div>
    `
}
const Input = {
    props: [
        'placeholder',
        'type',
        'label',
        'modelValue'
    ],
    setup(){
        const { defineOptions, defineModel } = Vue
        defineOptions({
            inheritAttrs: false
        })
    },
    template: `
        <label class="block w-full space-y-1">
            <span v-if="label" class="text-sm text-gray-600">
               {{ label }}
            </span>
            <input
                v-bind="$attrs"
                class="w-full block outline-none bg-white bg-opacity-5 border border-opacity-40 px-2 py-1"
                :type="type"
                :placeholder="placeholder"
                :value="modelValue"
                @input="(event) => $emit('update:modelValue', event.target.value)"
            />
        </label>
    `
}
// basic component end



const Header = {
    props: [
      'mouseDown',
      'mouseMove',
      'mouseUp',
      'activeLayout'
    ],
    setup(){
        return {
            handleCollapse,
            handleShowForActiveLayout,
            handleInvertImageForActiveLayout,
            handleLockForActiveLayout,
            layoutData
        }
    },
    template: `
        <div class="bg-red-500 grid grid-cols-4">
            <button
                @click="handleCollapse"
                title="Collapse"
                class="p-2 flex justify-center text-white border-r border-white border-opacity-30 hover:bg-white/10 duration-300"
                :class="!layoutData?.isCollapsed ? 'bg-white text-red-500' : 'text-white'"
            >
                <svg
                    class="w-4 h-4 transform"
                    :class="layoutData?.isCollapsed ? 'rotate-0' : 'rotate-180'"
                    width="800"
                    height="800"
                    viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" class="clr-i-outline clr-i-outline-path-1" d="M29.52 22.52 18 10.6 6.48 22.52a1.7 1.7 0 0 0 2.45 2.36L18 15.49l9.08 9.39a1.7 1.7 0 0 0 2.45-2.36Z"/><path fill="none" d="M0 0h36v36H0z"
                /></svg>
            </button>
            <button
                :title="activeLayout?.isShow ? 'Hide Image' : 'Show Image'"
                @click="handleShowForActiveLayout"
                class="p-2 flex justify-center  border-r border-white border-opacity-30 hover:bg-white/10 duration-300"
                :class="!activeLayout?.isShow ? 'bg-white text-red-500' : 'text-white'"
            >
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="currentColor" viewBox="0 0 52 52" xml:space="preserve"><path d="M51.8 25.1c-1.6-3.2-3.7-6.1-6.3-8.4L37 25.1v.9c0 6.1-4.9 11-11 11h-.9l-5.4 5.4c2 .4 4.1.7 6.2.7 11.3 0 21.1-6.6 25.8-16.1.4-.7.4-1.3.1-1.9zM48.5 5.6l-2.1-2.1c-.6-.6-1.7-.5-2.4.3l-7.3 7.3C33.4 9.7 29.8 9 26 9 14.7 9 4.9 15.6.2 25.1c-.3.6-.3 1.3 0 1.8 2.2 4.5 5.5 8.2 9.6 11l-6 6.1c-.7.7-.8 1.8-.3 2.4l2.1 2.1c.6.6 1.7.5 2.4-.3L48.2 8c.8-.7.9-1.8.3-2.4zM15 26c0-6.1 4.9-11 11-11 2 0 3.8.5 5.4 1.4l-3 3c-.8-.2-1.6-.4-2.4-.4-3.9 0-7 3.1-7 7 0 .8.2 1.6.4 2.4l-3 3C15.5 29.8 15 28 15 26z"/></svg>
            </button>
            <button
                @click="handleLockForActiveLayout"
                :title="activeLayout?.isLock ? 'Unlock Move' : 'Lock Move'"
                class="p-2 flex justify-center text-white border-r border-white border-opacity-30 hover:bg-white/10 duration-300"
                :class="activeLayout?.isLock ? 'bg-white text-red-500' : 'text-white'"
            >
                <svg class="w-4 h-4" width="800" height="800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 9V7c0-2.8-2.2-5-5-5S7 4.2 7 7v2c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3v-7c0-1.7-1.3-3-3-3zM9 7c0-1.7 1.3-3 3-3s3 1.3 3 3v2H9V7z"/></svg>
            </button>
            <button
                @click="handleInvertImageForActiveLayout"
                :title="activeLayout?.invertImage ? 'Revert Image' : 'Invert Image'"
                class="p-2 flex justify-center text-white hover:bg-white/10 duration-300"
                :class="activeLayout?.invertImage ? 'bg-white text-red-500' : 'text-white'"
            >
                <svg class="w-4 h-4" width="800" height="800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v18H3V3zm16 4h-2v2h-2v2h-2v2h-2v2H9v2H7v2h12V7z" fill="currentColor"/></svg>
            </button>
        </div>
    `
}

const LayoutImages = {
    components: {
        TemplatePreview
    },
    setup(){
        return {
            config: layoutData.value.config
        }
    },
    props: ['layoutData'],
    template:`
        <TemplatePreview
            v-for="(item, index) in layoutData.config"
            :key="index"
            :item="item"
            :isActive="index == layoutData.activeIndex"
        />
    `
}
const FileUpload = {
    props: [],
    setup(){
        const handleImage = (e, item) => 
        {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                item.src = reader.result
            }
        }
        return {
            handleImage,
            layoutData,
            deleteLayout,
            addNewLayout,
            setActiveIndex
        }
    },
    template: `
        <div 
            class="grid gap-2"
            :class="layoutData.config.length ? 'grid-cols-3' : ''"
        >
            <label
                @click="addNewLayout()"
                class="bg-gray-400/50 aspect-square border border-dashed text-white py-4 cursor-pointer rounded flex items-center justify-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
            </label>

            <div
                v-for="(item, index) in layoutData.config"
                :key="index"
                class="relative bg-white border-2 rounded aspect-square"
                :class="index == layoutData.activeIndex ? 'border-red-500' : 'border-gray-200'"
                style="height: 83px;"
                @click="setActiveIndex(index)"
            >
                <button 
                    class="absolute top-1 right-1  bg-red-500 text-white p-1 rounded-full shadow z-10"
                    @click="deleteLayout(index, layoutData)"
                >
                    <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
                </button>
                
                <div 
                    class="border h-full overflow-hidden flex items-center justify-center cursor-pointer relative"
                >
                    <img
                        v-if="item?.src"
                        :src="item.src"
                        class="w-full h-full object-cover object-left-top block rounded"
                    />
                    <label 
                        class="cursor-pointer absolute z-10 bg-blue-500 text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 duration-300 w-12 h-12 flex items-center justify-center"
                        title="Upload design"
                    >
                        <svg
                            class="pointer-events-none w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"
                        >
                            <path d="M248,128a87.34,87.34,0,0,1-17.6,52.81,8,8,0,1,1-12.8-9.62A71.34,71.34,0,0,0,232,128a72,72,0,0,0-144,0,8,8,0,0,1-16,0,88,88,0,0,1,3.29-23.88C74.2,104,73.1,104,72,104a48,48,0,0,0,0,96H96a8,8,0,0,1,0,16H72A64,64,0,1,1,81.29,88.68,88,88,0,0,1,248,128Zm-90.34-5.66a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L144,147.31V208a8,8,0,0,0,16,0V147.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z"></path>
                        </svg>
                        <input
                            ref="inputField"
                            type="file"
                            accept="image/*"
                            hidden
                            @change="handleImage($event,item)"
                        />
                    </label>
                </div>
            </div>
        </div>
    `
}
const WidthHeight = {
    props: ['activeLayout'],
    components: {
        Input
    },
    template: `
        <div
            class="grid grid-cols-2 gap-3 bg-green"
        >
            <Input
                placeholder="Width"
                type="number"
                label="Width"
                min="0"
                v-model="activeLayout.width"
            />
            <Input
                placeholder="Height"
                type="number"
                label="Height"
                min="0"
                v-model="activeLayout.height"
            />
        </div>
    `
}

const OpacityAndZIndex = {
    components: {
        Input
    },
    props: ['activeLayout'],
    template: `
        <div
            class="grid grid-cols-2 gap-3 bg-green"
        >
            <Input
                placeholder="Opacity"
                type="number"
                label="Opacity"
                min="0"
                max="1"
                step="0.01"
                value="0.5"
                v-model="activeLayout.opacity"
            />
            <Input
                placeholder="ZIndex"
                type="number"
                label="ZIndex"
                v-model="activeLayout.zIndex"
            />
        </div>
    `
}

const Position = {
    components: {
        Input
    },
    props: ['activeLayout'],
    template: `
        <div
            class="grid grid-cols-2 gap-3 bg-green"
        >
            <Input
                placeholder="Left"
                type="number"
                label="Left"
                v-model="activeLayout.left"
            />
            <Input
                placeholder="Top"
                type="number"
                label="Top"
                v-model="activeLayout.top"
            />
        </div>
    `
}

const AdBanner = {
    template: `
        <a href="/" _target="blank" class="sticky bottom-0 z-10">
            <img 
                class="w-full block"
                src="https://placehold.co/600x60/167492/FFF"
            />
        </a>
    `
}