const handleColorGenerating = (layoutData) => {
    const activeLayout = getActiveLayout(layoutData)
    if(!activeLayout.src) {
        alert('Please select a layout, that has image. or upload a new image')
        return
    }
    if(!confirm("Are you certain you wish to generate new colors? \nThis process will remove your existing colors.")) return
    generateColors(activeLayout, () => {
        storeInLocalStorage(layoutData)
        renderColor()
    })
}

const _handleColorCopy = ({activeLayout, index}) => {
    if(!activeLayout) {
        alert('Please select a layout, that has image. or upload a new image')
        return
    }
    navigator.clipboard.writeText(activeLayout.colors[index])
    const _pphCopyStatus = document.querySelectorAll('._pphCopyStatus')
    if(!_pphCopyStatus) return
    
    _pphCopyStatus[index].classList.remove('opacity-0')
    _pphCopyStatus[index].classList.add('animate-bounce')
    setTimeout(() => {
        _pphCopyStatus[index].classList.remove('animate-bounce')
        _pphCopyStatus[index].classList.add('opacity-0')
    }, 500)
}
const _handleColorDelete = ({index}) => 
{
    const activeLayout = getActiveLayout(layoutData)

    if(!confirm('Are you sure delete this color?')) return
    activeLayout.colors.splice(index, 1)
    renderColor()
}
const _handleColorChange = ({activeLayout, index, element}) => {
    element.firstElementChild.oninput = (e) => {
        activeLayout.colors[index] = e.target.value
        element.style.backgroundColor = activeLayout.colors[index]
        element.nextElementSibling.innerHTML = activeLayout.colors[index]
        storeInLocalStorage(layoutData)
    }
}
const handleColorItem = (e, layoutData) => {
    const {identity, content: index} = e.target.dataset
    const activeLayout = getActiveLayout(layoutData)

    const fnRegistry = {
        _pph_color_delete_btn: _handleColorDelete,
        _pph_copy_color_btn: _handleColorCopy,
        _pph_color_picker: _handleColorChange
    }
    fnRegistry[identity] && fnRegistry[identity]({activeLayout, index, element: e.target})
}
const handleColorClear = (layoutData) => 
{
    if(!confirm('Are you sure you want to clear?')) return
    layoutData.config[layoutData.activeIndex].colors = []
    renderColor()
}
const handleColorPicking = async (layoutData) => 
{
    const activeLayout = getActiveLayout(layoutData)
    if(!activeLayout) {
        alert('Please select a layout.')
        return
    }
    try {
        const eyeDropper = new EyeDropper()
        const { sRGBHex } = await eyeDropper.open()
        activeLayout.colors.unshift(sRGBHex)
        renderColor()
    } catch (e) {
        console.warn(e)
    }
}