const { ref } = Vue

const storageKey = '_pixelPerfectLayoutData'
const placeholderConfig = {
    img: null,
    fileInput: null,
    src: null,
    width: null,
    height: null,
    left: 0,
    top: 0,
    opacity: 0.5,
    showImage: true,
    zIndex: 1000,
    isLock: false,
    isShow: true,
    invertImage: false,
}

const layoutData = ref({
    activeIndex: 0,
    isCollapsed: false,
    config: []
})

const start = () => {
    loadFromLocalStorage()
}


// topBar action handler start
const handleCollapse = () => {
    layoutData.value.isCollapsed = !layoutData.value.isCollapsed
}

const handleShowForActiveLayout = () => {
    layoutData.value.config[layoutData.value.activeIndex].isShow = !layoutData.value.config[layoutData.value.activeIndex].isShow
}
const handleLockForActiveLayout = () => {
    layoutData.value.config[layoutData.value.activeIndex].isLock = !layoutData.value.config[layoutData.value.activeIndex].isLock
}
const handleInvertImageForActiveLayout = () => {
    layoutData.value.config[layoutData.value.activeIndex].invertImage = !layoutData.value.config[layoutData.value.activeIndex].invertImage
}
// topBar action handler end



const addNewLayout = () => {
    layoutData.value.config.unshift({...placeholderConfig})
}
const deleteLayout = (index, layoutData) => {
    if(!confirm('Are you sure you want to delete this layout?')) return
    layoutData.config.splice(index, 1)
}



// localStorage methods start
const storeInLocalStorage = (layoutData) => {
    localStorage.setItem(storageKey, JSON.stringify(layoutData))
}
const loadFromLocalStorage = () => {
    if(!localStorage.getItem(storageKey)) return
    let localStorageLayoutData = JSON.parse(localStorage.getItem(storageKey))
    layoutData.value = localStorageLayoutData ? localStorageLayoutData : layoutData.value
}
const deleteInLocalStorage = () => {
    localStorage.clear(storageKey)
}
// localStorage methods end