/**
 * Converts a File object to a Base64 string with optional resizing and compression.
 * @param {File} file - The file to convert.
 * @param {Object} options - Resizing options (maxWidth, maxHeight, quality).
 * @returns {Promise<string>} - A promise that resolves to the Base64 string.
 */
export const convertFileToBase64 = (file, options = {}) => {
    return new Promise((resolve, reject) => {
        const { maxWidth = 800, maxHeight = 800, quality = 0.7 } = options;
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Provide a basic aspect ratio preservation logic
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert canvas to Base64 string (JPEG for better compression)
                // Use 'image/jpeg' to enable quality parameter
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedBase64);
            };

            img.onerror = (error) => {
                reject(error);
            };
        };

        reader.onerror = (error) => {
            reject(error);
        };
    });
};
