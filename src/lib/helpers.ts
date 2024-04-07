import sharp from "sharp";


export const checkIfhavePhoto = (initial: string | undefined, final: string) => {
    if (initial?.length) return initial;
    return final;
}

export const formatDate = (dateVal: string) => {
    const parsedDate = new Date(dateVal);

    const months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${months[parsedDate.getMonth()]} ${parsedDate.getDate()} ${parsedDate.getFullYear()} @ ${formattedHours}:${formattedMinutes} ${ampm}`;
}


export const compressImage = async (fileObject: File, targetSizeKB = 300) => {
    const maxQuality = 100; // Maximum JPEG/PNG quality (for resizing)
    const inputImageBuffer = await fileObject.arrayBuffer();

    let quality = maxQuality;
    let outputBuffer = null;

    // Adjust image quality dynamically to achieve target size
    while (quality > 0) {
        try {
            // Resize and compress the image with the current quality setting
            outputBuffer = await sharp(Buffer.from(inputImageBuffer))
                .resize({ width: 800, height: 600 }) // Resize if needed
                .png({ quality: quality }) // Set PNG quality
                .toBuffer();

            // Check the size of the output image
            const outputSizeKB = outputBuffer.length / 1024;

            // Check if the output size is within the target range
            if (outputSizeKB <= targetSizeKB) {
                break; // Stop compression if target size is achieved
            }

            // Reduce quality for the next iteration
            quality -= 5; // Adjust quality reduction step
        } catch (error) {
            console.error('Error compressing image:', error);
            return null; // Return null on error
        }
    }

    return outputBuffer; // Return the compressed image buffer
}