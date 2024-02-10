const Input = (props={}) => 
{
    const { label, ...rest } = props
    const input = document.createElement('input')
    for(const key in rest) {
        if(key !== '_class'){
            input.setAttribute(key, props[key])
        }
        input.setAttribute('class', `${props[key] ? props[key] : ''} w-full block outline-none bg-white bg-opacity-5 border border-opacity-40 px-2 py-1`)
    }
    
    return `
        <label class="block w-full space-y-1">
            ${
                label ? `<span class="text-sm text-gray-600">${label}</span>` : ''
            }
            ${input.outerHTML}
        </label>
    `
}

const TemplatePreview = (props={}) => {
    const { item } = props
    return `
        <div class="aspect-squire border border-black shadow cursor-pointer bg-white rounded overflow-hidden">
            <img
                class="block w-full"
                src="${item.src}"
            />
        </div>
    `
}