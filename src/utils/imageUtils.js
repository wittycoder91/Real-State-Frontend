// Utility function to construct full image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path, construct full URL using VITE_APP_UPLOAD_URL
  const uploadUrl = import.meta.env.VITE_APP_UPLOAD_URL || 'http://localhost:5000';
  return `${uploadUrl}${imagePath}`;
};

// Utility function to get multiple image URLs (limited to 5)
export const getImageUrls = (imagePaths) => {
  if (!imagePaths || !Array.isArray(imagePaths)) return [];
  // Limit to maximum 5 images
  const limitedPaths = imagePaths.slice(0, 5);
  return limitedPaths.map(getImageUrl).filter(Boolean);
};
