/**
 * Optimizes an image URL for performance.
 * Currently supports Unsplash URLs by modifying width and quality parameters.
 * 
 * @param {string} url - The original image URL
 * @param {Object} options - Optimization options
 * @param {number} options.width - Desired width (default: 600)
 * @param {number} options.quality - Desired quality (default: 80)
 * @returns {string} - The optimized URL
 */
export const optimizeImage = (url, { width = 600, quality = 80 } = {}) => {
    // If no URL or not a string, return as is
    if (!url || typeof url !== 'string') return url || '';

    // Ported from production pattern: check if it's an Unsplash URL
    if (url.includes('images.unsplash.com')) {
        try {
            // Use a regex-based approach for maximum compatibility with relative or complex URLs
            // but for Unsplash absolute URLs, it's safe to use URL object if it's strictly absolute.
            if (url.startsWith('http')) {
                const urlObj = new URL(url);
                urlObj.searchParams.set('w', width);
                urlObj.searchParams.set('q', quality);
                urlObj.searchParams.set('auto', 'format');
                urlObj.searchParams.set('fit', 'crop');
                return urlObj.toString();
            }

            // Fallback for tricky strings
            return url.replace(/w=\d+/, `w=${width}`).replace(/q=\d+/, `q=${quality}`);
        } catch (e) {
            console.error('Error optimizing image URL:', e);
            return url;
        }
    }

    // Default return for other URLs (local or other hosts)
    return url;
};
