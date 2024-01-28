const ref = (obj) => new Proxy(obj, {
    get: {},
    set: (target, key, value) => {
        target[key] = value
        runChromeScript()
    }
})
const imageData = {
    img: null,
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    opacity: 0.5,
    showImage: true,
    fileInput: null,
    zIndex: 1000
}



const saveBtn = document.getElementById('saveBtn')
const elements = [
    {
        key: 'fileInput',
        element: document.getElementById('fileInput')
    },
    {
        key: 'width',
        element: document.getElementById('width')
    },
    {
        key: 'height',
        element: document.getElementById('height')
    },
    {
        key: 'left',
        element: document.getElementById('left')
    },
    {
        key: 'top',
        element: document.getElementById('top')
    },
    {
        key: 'opacity',
        element: document.getElementById('opacity')
    },
    {
        key: 'zIndex',
        element: document.getElementById('zIndex')
    },
]

elements.forEach((data) => {
    if(data.element){
        data.element.addEventListener('input', () => {
            if(data.key == 'fileInput'){
                const reader = new FileReader()
                reader.readAsDataURL(data.element.files[0])
                reader.onload = (e) => {
                    imageData.fileInput = e.target.result
                    runChromeScript()
                }
                return
            }
            imageData[data.key] = data.element.value
            runChromeScript()
        })
    }
})

saveBtn.addEventListener("click", runChromeScript)
function runChromeScript () { 
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func: runScript,
                    args: [imageData]
                },
                onResult
            )
        } else {
            alert("There are no active tabs")
        }
    })
}

function onResult(frames) {
    console.log({frames})
}

function runScript (imageData) 
{
    function handleImage(imageData)
    {
        imageData.img = document.getElementById('_overlayImage_pixelPerfect')
        if(!imageData.img){
            imageData.img = document.createElement('img')
            if(!imageData.fileInput) return
            imageData.img.src = imageData.fileInput
            imageData.img.setAttribute('id', '_overlayImage_pixelPerfect')
            document.body.appendChild(imageData.img)
        }
    }
    handleImage(imageData)

    function renderNewData(imageData) {
        imageData.img.style.cssText = `
            width: ${imageData.width};
            height: ${imageData.height};
            left: ${imageData.left};
            top: ${imageData.top};
            opacity: ${imageData.opacity};
            z-index: ${imageData.zIndex};
            position: fixed;
            pointer-events: none;
        `
    }
    renderNewData(imageData)
}