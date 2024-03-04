const generateColors = (activeLayout, cb) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.src = activeLayout.src
    img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 300, Math.floor((300 * img.height) / img.width))

        const imageData = ctx.getImageData(0, 0, 300, Math.floor((300 * img.height) / img.width));
        const data = imageData.data
        const rgbValues = []
        
        for (let i = 0; i < data.length; i += 4) {
            const rgb = {
                r: data[i],
                g: data[i + 1],
                b: data[i + 2],
            }
            rgbValues.push(rgb)
        }

        // Convert the image data to RGB values so its much simpler
        const rgbArray = buildRgb(data);
        /**
         * Color quantization
         * A process that reduces the number of colors used in an image
         * while trying to visually maintin the original image as much as possible
         */
        const quantColors = quantization(rgbArray, 0);

        const {
            colors,
            complementary
        } = buildPalette(quantColors)

        activeLayout.colors = colors
        cb(activeLayout)
    }
}