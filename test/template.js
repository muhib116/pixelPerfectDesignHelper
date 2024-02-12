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

const Input = (props) => {
    const {
        placeholder,
        type,
        label,
        min,
        id,
    } = props
    
    return `
        <label class="block w-full space-y-1">
            <span class="text-sm text-gray-400 italic">
               ${ label }
            </span>
            <input
                class="w-full block outline-none bg-white bg-opacity-5 border border-gray-500 px-2 py-1 rounded"
                type="${type}"
                placeholder="${placeholder}"
                id="${id}"
                min="${min}"
            />
        </label>
    `
}
const ColorBox = ({color}) =>{
    return`
        <button
            class="colorBox flex gap-1 items-center relative"
            style="font-size: 12px"
        >
            <span
                class="absolute -ml-1 inset-0 bg-red-500 rounded-lg duration-200 pointer-events-none"
                :class="isCopied ? 'opacity-100' : 'opacity-0'"
            >
                Copied
            </span>
            <label 
                title="Click to modify the color"
                class="w-3 h-3 flex-shrink-0 cursor-pointer block border border-opacity-50"
                style="background-color: ${color}, borderRadius: '2px' }"
            >
                <input 
                    data-_pph_color_picker
                    type="color" 
                    hidden 
                    value="${color}" class="pointer-events-none"
                />
            </label>
            <span 
                title="Click to copy"
                @click="copyColorToClipBoard(color, handleCopyStatus)"
            >
                ${ color }
            </span>
            <button
                title="Click to delete"
                class="absolute colorBoxClose right-0 w-4 h-4 bg-red-500 text-white rounded-full"
                style="padding-left: 2px; padding-top: 0px;"
                data-_pph_color_delete_btn
            >
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>
        </button>
    `
}
// basic component end

const Header = () => {
    return `
        <div class="sticky top-0 bg-red-500 grid grid-cols-6 z-10">
            <button
                id="_pph_move_btn"
                title="Collapse"
                class="p-2 flex justify-center text-white border-r border-white border-opacity-30 bg-gray-600 duration-300"
            >
                <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"
                >
                    <path d="M90.34,61.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32L136,43.31V96a8,8,0,0,1-16,0V43.31L101.66,61.66A8,8,0,0,1,90.34,61.66Zm64,132.68L136,212.69V160a8,8,0,0,0-16,0v52.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm83.32-72-32-32a8,8,0,0,0-11.32,11.32L212.69,120H160a8,8,0,0,0,0,16h52.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,237.66,122.34ZM43.31,136H96a8,8,0,0,0,0-16H43.31l18.35-18.34A8,8,0,0,0,50.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32Z"></path>
                </svg>
            </button>
            <button
                id="_pph_collapse_btn"
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
                id="_pph_image_show_btn"
                :title="activeLayout?.isShow ? 'Hide Image' : 'Show Image'"
                class="p-2 flex justify-center  border-r border-white border-opacity-30 hover:bg-white/10 duration-300"
                :class="!activeLayout?.isShow ? 'bg-white text-red-500' : 'text-white'"
            >
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="currentColor" viewBox="0 0 52 52" xml:space="preserve"><path d="M51.8 25.1c-1.6-3.2-3.7-6.1-6.3-8.4L37 25.1v.9c0 6.1-4.9 11-11 11h-.9l-5.4 5.4c2 .4 4.1.7 6.2.7 11.3 0 21.1-6.6 25.8-16.1.4-.7.4-1.3.1-1.9zM48.5 5.6l-2.1-2.1c-.6-.6-1.7-.5-2.4.3l-7.3 7.3C33.4 9.7 29.8 9 26 9 14.7 9 4.9 15.6.2 25.1c-.3.6-.3 1.3 0 1.8 2.2 4.5 5.5 8.2 9.6 11l-6 6.1c-.7.7-.8 1.8-.3 2.4l2.1 2.1c.6.6 1.7.5 2.4-.3L48.2 8c.8-.7.9-1.8.3-2.4zM15 26c0-6.1 4.9-11 11-11 2 0 3.8.5 5.4 1.4l-3 3c-.8-.2-1.6-.4-2.4-.4-3.9 0-7 3.1-7 7 0 .8.2 1.6.4 2.4l-3 3C15.5 29.8 15 28 15 26z"/></svg>
            </button>
            <button
                @click="handleLockForActiveLayout"
                id="_pph_image_lock_btn"
                :title="activeLayout?.isLock ? 'Unlock Move' : 'Lock Move'"
                class="p-2 flex justify-center text-white border-r border-white border-opacity-30 hover:bg-white/10 duration-300"
                :class="activeLayout?.isLock ? 'bg-white text-red-500' : 'text-white'"
            >
                <svg class="w-4 h-4" width="800" height="800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 9V7c0-2.8-2.2-5-5-5S7 4.2 7 7v2c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3v-7c0-1.7-1.3-3-3-3zM9 7c0-1.7 1.3-3 3-3s3 1.3 3 3v2H9V7z"/></svg>
            </button>
            <button
                @click="handleInvertImageForActiveLayout"
                id="_pph_image_invert_btn"
                :title="activeLayout?.invertImage ? 'Revert Image' : 'Invert Image'"
                class="p-2 flex justify-center text-white hover:bg-white/10 duration-300 border-r border-white border-opacity-30"
                :class="activeLayout?.invertImage ? 'bg-white text-red-500' : 'text-white'"
            >
                <svg class="w-4 h-4" width="800" height="800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v18H3V3zm16 4h-2v2h-2v2h-2v2h-2v2H9v2H7v2h12V7z" fill="currentColor"/></svg>
            </button>
            <button
                @click="openColorPicker(activeLayout)"
                id="_pph_color_picker_btn"
                :title="activeLayout?.invertImage ? 'Revert Image' : 'Invert Image'"
                class="p-2 flex justify-center text-white hover:bg-white/10 duration-300"
                :class="activeLayout?.invertImage ? 'bg-white text-red-500' : 'text-white'"
            >
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,67.3a35.79,35.79,0,0,0-11.26-25.66c-14-13.28-36.72-12.78-50.62,1.13L138.8,66.2a24,24,0,0,0-33.14.77l-5,5a16,16,0,0,0,0,22.64l2,2.06-51,51a39.75,39.75,0,0,0-10.53,38l-8,18.41A13.68,13.68,0,0,0,36,219.3a15.92,15.92,0,0,0,17.71,3.35L71.23,215a39.89,39.89,0,0,0,37.06-10.75l51-51,2.06,2.06a16,16,0,0,0,22.62,0l5-5a24,24,0,0,0,.74-33.18l23.75-23.87A35.75,35.75,0,0,0,224,67.3ZM97,193a24,24,0,0,1-24,6,8,8,0,0,0-5.55.31l-18.1,7.91L57,189.41a8,8,0,0,0,.25-5.75A23.88,23.88,0,0,1,63,159l51-51,33.94,34Z"></path></svg>
            </button>
        </div>
    `
}
const ColorsHistory = () => {
    return `
        <div
            id="_pph_color_history_wrapper"
            class="border-b border-opacity-10 pb-4"
        >
            <div class="flex justify-between items-center mb-3">
                Colors
                <button
                    class="text-red-400"
                    @click="clearColors(activeLayout)"
                    id="_pph_colors_clear_btn"
                >
                    Clear
                </button>
            </div>
            <div
                id="_pph_colors_wrapper"
                class="grid grid-cols-3 text-white text-opacity-70 gap-2"
            ></div>
        </div>
    `
}
const WidthHeight = () => {
    return `
        <div
            class="grid grid-cols-2 gap-3 bg-green"
        >
            ${Input({
                placeholder:"Width",
                type:"number",
                label:"Width",
                min:"0",
                id:"_pph_width_input"
            })}
            ${Input({
                placeholder:"Height",
                type:"number",
                label:"Height",
                min:"0",
                id:"_pph_height_input",
            })}
        </div>
    `
}
const Position = () => {
    return `
        <div
            class="grid grid-cols-2 gap-3 bg-green"
        >
            ${Input({
                placeholder:"Left",
                type:"number",
                label:"Left",
                id:"_pph_left_input",
            })}
            ${Input({
                placeholder:"Top",
                type:"number",
                label:"Top",
                id:"_pph_top_input",
            })}
        </div>
    `
}
const OpacityAndZIndex = () => {
    return `
    <div
        class="grid grid-cols-2 gap-3 bg-green"
    >
        ${Input({
            placeholder:"Opacity",
            type:"number",
            label:"Opacity",
            min:"0",
            max:"1",
            step:"0.01",
            value:"0.5",
            id:"_pph_opacity_input",
        })}
        ${Input({
            placeholder:"ZIndex",
            type:"number",
            label:"ZIndex",
            id:"_pph_zIndex_input",
        })}
    </div>
    `
}
const AdBanner = () => {
    return `
        <div
            class="sticky bottom-0 z-10"
            id="_pph_banner_container"
        ></div>
    `
}