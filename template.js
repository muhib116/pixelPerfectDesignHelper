// basic component start
const Input = (props) => {
    const {
        placeholder,
        type,
        label,
        min,
        id,
        max
    } = props
    
    return `
        <label class="block w-full space-y-1">
            <span
                class="text-gray-400"
                style="
                    margin-right: auto;
                    display: block;
                    text-align: left;
                "
            >
               ${ label }
            </span>
            <input
                class="w-full block outline-none bg-white dark:bg-gray-400 dark:bg-opacity-10 text-gray-800 dark:text-white border border-gray-500 border-opacity-40 px-2 py-1 rounded"
                type="${type}"
                placeholder="${placeholder}"
                id="${id}"
                min="${min}"
                max="${max}"
                step="any"
            />
        </label>
    `
}
const ColorBox = ({color, index}) => {
    return`
        <div
            class="_pp_colorBox flex gap-1 items-center relative"
            style="font-size: 12px"
        >
            <span
                class="absolute _pphCopyStatus -ml-1 inset-0 bg-green-500 rounded font-bold pointer-events-none opacity-0 z-10 text-center"
            >
                Copied
            </span>
            <label 
                title="Click to modify the color"
                class="w-3 h-3 flex-shrink-0 cursor-pointer block border border-opacity-50"
                style="background-color: ${color}; border-radius: 2px;"
                data-identity="_pph_color_picker"
                data-content="${index}"
            >
                <input 
                    type="color" 
                    class="opacity-0 pointer-events-none" 
                    value="${color}"
                />
            </label>
            <span 
                title="Click to copy"
                data-identity="_pph_copy_color_btn"
                class="cursor-pointer text-gray-800 dark:text-white"
                data-content="${index}"
            >
                ${ color }
            </span>
            <button
                title="Click to delete"
                class="absolute _pp_colorBoxClose right-0 w-4 h-4 bg-red-500 text-white rounded-full"
                style="padding-left: 2px; padding-top: 0px;"
                data-identity="_pph_color_delete_btn"
                data-content="${index}"
            >
                <svg class="w-3 h-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>
        </div>
    `
}
const ImageBoxForUpload = (layout, index) => {
    return `
        <div
            class="
                relative bg-white border-2 rounded aspect-square cursor-pointer 
                ${index == layoutData.activeIndex ? 'border-red-500' : 'border-gray-200'}
            "
            style="height: 83px;"
            data-content="${index}"
            data-_identity="_pph_image_wrapper"
        >
            <button 
                data-_identity="_pph_delete_layout_btn"
                data-content="${index}"
                class="absolute top-1 right-1 pointer-events-auto bg-red-500 text-white p-1 rounded-full shadow z-10"
            >
                <svg class="w-3 h-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>

            <div 
                class="border h-full overflow-hidden flex items-center justify-center cursor-pointer relative pointer-events-none"
            >
                <img
                    src="${layout.src}"
                    class="
                        w-full h-full object-cover object-left-top block rounded pointer-events-none 
                        ${ layout.src ? 'block' : 'hidden' }
                    "
                />
                <label 
                    class="cursor-pointer pointer-events-auto absolute z-10 bg-blue-500 text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 duration-300 w-12 h-12 flex items-center justify-center"
                    title="Upload design"
                >
                    <svg class="pointer-events w-8 h-8" width="800" height="800" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><style>.st0{fill:currentColor}</style><g id="Layer_1"/><g id="Layer_2"><path class="st0" d="M307.81 212.18c-3.24 0-6.07-2.17-6.91-5.3L296.08 189a7.169 7.169 0 0 0-6.91-5.3H220.8c-3.24 0-6.07 2.17-6.91 5.3l-4.82 17.88a7.169 7.169 0 0 1-6.91 5.3H169.5a7.16 7.16 0 0 0-7.16 7.16v101.78a7.16 7.16 0 0 0 7.16 7.16h170.95a7.16 7.16 0 0 0 7.16-7.16V219.35a7.16 7.16 0 0 0-7.16-7.16h-32.64zm-25.48 52.76c-.86 13.64-11.93 24.71-25.58 25.58-16.54 1.05-30.18-12.59-29.14-29.14.86-13.64 11.93-24.71 25.58-25.58 16.55-1.04 30.19 12.6 29.14 29.14z"/><path class="st0" d="M82.95 272.41c3.82 0 7.53-1.53 10.23-4.23l21.23-21.23c4.74-4.74 6.4-11.92 3.73-18.06-2.73-6.29-8.88-8.95-18.84-7.57l-.27.27c15.78-71.56 79.7-125.27 155.94-125.27 60.72 0 115.41 33.72 142.73 87.99 3.58 7.11 12.24 9.97 19.34 6.39 7.11-3.58 9.97-12.24 6.39-19.34a189.048 189.048 0 0 0-68.22-75.01C325.23 77.47 290.57 67.5 254.98 67.5c-93 0-170.48 67.71-185.75 156.41-5.38-4.77-13.59-5.18-19.13-.44-6.3 5.39-6.75 14.88-1.13 20.84.23.24 5.69 6.03 11.41 11.93 3.41 3.51 6.2 6.33 8.3 8.38 4.23 4.13 7.88 7.69 14.07 7.78.06.01.13.01.2.01zm381.33-24.59-26.5-26.5c-2.75-2.75-6.57-4.3-10.44-4.23-2.33.03-4.29.56-6.07 1.42-.26.12-.51.26-.76.4l-.12.06c-.59.33-1.16.68-1.69 1.08-1.88 1.34-3.6 3.03-5.44 4.82-2.1 2.05-4.89 4.87-8.3 8.38-5.72 5.9-11.18 11.68-11.41 11.93-5.46 5.79-5.19 14.91.6 20.36 5.75 5.42 14.77 5.18 20.24-.48-4.72 83.85-74.42 150.62-159.43 150.62-70.52 0-131.86-45.23-152.62-112.55-2.35-7.6-10.41-11.86-18.01-9.52-7.6 2.34-11.86 10.41-9.52 18.01 11.62 37.68 35.48 71.52 67.19 95.28 32.8 24.59 71.86 37.58 112.96 37.58 100.11 0 182.23-78.45 188.14-177.1l.79.79c2.81 2.81 6.5 4.22 10.18 4.22 3.69 0 7.37-1.41 10.18-4.22 5.66-5.6 5.66-14.72.03-20.35z"/></g></svg>
                    <input
                        data-_identity="_pph_image_upload_input"
                        data-content="${index}"
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        hidden
                    />
                </label>
            </div>
        </div>
    `
}
// basic component end

const Header = () => {
    return `
        <div class="sticky text-white top-0 bg-red-500 grid grid-cols-6 z-10 border-b border-gray-300 border-opacity-50">
            <button
                id="_pph_move_btn"
                title="Move Toolbox"
                class="cursor-move p-2 flex justify-center text-white border-r border-gray-300 border-opacity-50 bg-gray-600 duration-300"
            >
                <svg
                    class="w-4 h-4 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"
                >
                    <path d="M90.34,61.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32L136,43.31V96a8,8,0,0,1-16,0V43.31L101.66,61.66A8,8,0,0,1,90.34,61.66Zm64,132.68L136,212.69V160a8,8,0,0,0-16,0v52.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm83.32-72-32-32a8,8,0,0,0-11.32,11.32L212.69,120H160a8,8,0,0,0,0,16h52.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,237.66,122.34ZM43.31,136H96a8,8,0,0,0,0-16H43.31l18.35-18.34A8,8,0,0,0,50.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32Z"></path>
                </svg>
            </button>
            <button
                id="_pph_collapse_btn"
                title="Collapse (shift+T)"
                class="p-2 flex justify-center border-r border-gray-300 border-opacity-50 duration-300 bg-white text-red-500"
            >
                <svg
                    class="w-4 h-4 transform pointer-events-none"
                    :class="layoutData?.isCollapsed ? 'rotate-0' : 'rotate-180'"
                    width="800"
                    height="800"
                    viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" class="clr-i-outline clr-i-outline-path-1" d="M29.52 22.52 18 10.6 6.48 22.52a1.7 1.7 0 0 0 2.45 2.36L18 15.49l9.08 9.39a1.7 1.7 0 0 0 2.45-2.36Z"/><path fill="none" d="M0 0h36v36H0z"
                /></svg>
            </button>
            <button
                id="_pph_image_show_btn"
                title="Hide or Show overlay image (shift+E)"
                class="p-2 flex justify-center border-r border-gray-300 border-opacity-50 duration-300"
            >
                <svg class="w-4 h-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="currentColor" viewBox="0 0 52 52" xml:space="preserve"><path d="M51.8 25.1c-1.6-3.2-3.7-6.1-6.3-8.4L37 25.1v.9c0 6.1-4.9 11-11 11h-.9l-5.4 5.4c2 .4 4.1.7 6.2.7 11.3 0 21.1-6.6 25.8-16.1.4-.7.4-1.3.1-1.9zM48.5 5.6l-2.1-2.1c-.6-.6-1.7-.5-2.4.3l-7.3 7.3C33.4 9.7 29.8 9 26 9 14.7 9 4.9 15.6.2 25.1c-.3.6-.3 1.3 0 1.8 2.2 4.5 5.5 8.2 9.6 11l-6 6.1c-.7.7-.8 1.8-.3 2.4l2.1 2.1c.6.6 1.7.5 2.4-.3L48.2 8c.8-.7.9-1.8.3-2.4zM15 26c0-6.1 4.9-11 11-11 2 0 3.8.5 5.4 1.4l-3 3c-.8-.2-1.6-.4-2.4-.4-3.9 0-7 3.1-7 7 0 .8.2 1.6.4 2.4l-3 3C15.5 29.8 15 28 15 26z"/></svg>
            </button>
            <button
                id="_pph_image_lock_btn"
                title="Lock or Unlock overlay image (shift+L)"
                class="p-2 flex justify-center border-r border-gray-300 border-opacity-50 duration-300"
            >
                <svg class="w-4 h-4 pointer-events-none" width="800" height="800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 9V7c0-2.8-2.2-5-5-5S7 4.2 7 7v2c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3v-7c0-1.7-1.3-3-3-3zM9 7c0-1.7 1.3-3 3-3s3 1.3 3 3v2H9V7z"/></svg>
            </button>
            <button
                id="_pph_image_invert_btn"
                title="Invert overlay image (shift+I)"
                class="p-2 flex justify-center duration-300 border-r border-gray-300 border-opacity-50"
            >
                <svg class="w-4 h-4 pointer-events-none" width="800" height="800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v18H3V3zm16 4h-2v2h-2v2h-2v2h-2v2H9v2H7v2h12V7z" fill="currentColor"/></svg>
            </button>
            <button
                id="_pph_color_picker_btn"
                title="Open color picker (shift+C), Press esc key to close."
                class="p-2 flex justify-center duration-300"
            >
                <svg class="w-4 h-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,67.3a35.79,35.79,0,0,0-11.26-25.66c-14-13.28-36.72-12.78-50.62,1.13L138.8,66.2a24,24,0,0,0-33.14.77l-5,5a16,16,0,0,0,0,22.64l2,2.06-51,51a39.75,39.75,0,0,0-10.53,38l-8,18.41A13.68,13.68,0,0,0,36,219.3a15.92,15.92,0,0,0,17.71,3.35L71.23,215a39.89,39.89,0,0,0,37.06-10.75l51-51,2.06,2.06a16,16,0,0,0,22.62,0l5-5a24,24,0,0,0,.74-33.18l23.75-23.87A35.75,35.75,0,0,0,224,67.3ZM97,193a24,24,0,0,1-24,6,8,8,0,0,0-5.55.31l-18.1,7.91L57,189.41a8,8,0,0,0,.25-5.75A23.88,23.88,0,0,1,63,159l51-51,33.94,34Z"></path></svg>
            </button>
        </div>
    `
}
const ColorsHistory = () => {
    return `
        <div
            id="_pph_color_history_wrapper"
            class="border-b border-opacity-10 pb-4 hidden"
        >
            <div class="flex justify-between items-center mb-3 text-gray-800 dark:text-white">
                Colors
                <button
                    class="text-red-400"
                    id="_pph_colors_clear_btn"
                >
                    Delete all color
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
                type:"text",
                label:"Width",
                min:"0",
                id:"_pph_width_input"
            })}
            ${Input({
                placeholder:"Height",
                type:"text",
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
            type:"range",
            label:"Opacity",
            min:"0",
            max:"1",
            id:"_pph_opacity_input",
        })}
        ${Input({
            placeholder:"z-index",
            type:"number",
            label:"z-index",
            id:"_pph_zIndex_input",
        })}
    </div>
    `
}
const FileUpload = () => {
    return `
        <button
            class="bg-red-500 text-white rounded py-1 mt-2"
            id="_pph_add_layout_btn"
        >
            Add Layout +
        </button>
        <div 
            class="grid grid-cols-3 w-full gap-2 mt-4"
            :class="layoutData.config.length ? 'grid-cols-3' : ''"
            id="_pph_layouts_wrapper"
        ></div>
    `
}
const Banner = () => {
    fetch('https://configurations.devdeeper.com/api/v1/get-banner')
    .then(response => response.json())
    .then(json => {
        if(json.status && elements?.pph_banner_container){
            if(!json.data.length){
                elements.pph_banner_container.style.display = 'none'
                return
            }else{
                elements.pph_banner_container.style.display = ''
            }
            
            let index = 0
            let timeoutId
            function setBannerTimeout(json) 
            {
                if(!elements?.pph_banner_container) return
                clearTimeout(timeoutId)
                const currentTime = performance.now()
                time = currentTime
                index = index + 1 >= json.data.length ? 0 : index + 1
                elements.pph_banner_container.innerHTML = json.data[index].content

                timeoutId = setTimeout(() => {
                    setBannerTimeout(json)
                }, json.data[index-1]?.duration_ms || 5000)
            }

            // Call the function passing the JSON data
            setBannerTimeout(json)
        }
    })

    return `
        <div
            class="sticky bottom-0 z-10 bg-red-500 flex items-center justify-center"
            id="_pph_banner_container"
        ></div>
    `
}