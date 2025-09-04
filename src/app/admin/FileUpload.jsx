import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const FileUpload = ({ setHouseImages }) => {
  const [images, setImages] = useState([]);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const inputRef = useRef(null);
  
  const handleFileSelect = () => {
    inputRef.current.click();
  };

  const handleImageUpload = (event) => {
    setIsImageUploading(true);
    const selectedImages = event.target.files;
    const imageArray = [];
    const imageUrls = [];

    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
      const imageUrl = URL.createObjectURL(file);
      imageArray.push(imageUrl);
      
      // For demo purposes, we'll use placeholder images instead of actual file uploads
      // In a real app, you'd upload to a server and get back URLs
      const demoImageUrl = `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop&v=${Date.now() + i}`;
      imageUrls.push(demoImageUrl);
    }
    
    setImages(imageArray);
    setHouseImages(imageUrls);
    setIsImageUploading(false);
  };

  return (
    <div className="bg-muted h-32 flex flex-col sm:flex-row sm:py-0 py-3 rounded items-center justify-between px-5">
      <div className="flex gap-3">
        {images.length > 0 &&
          images.map((url, index) => {
            return <img src={url} key={index} className="h-20 w-20 rounded object-cover" />;
          })}
      </div>

      <h1 className="text-xl font-space">
        Upload Your Image <br />
        <span className="text-muted-foreground text-sm text-center">
          You can upload multiple images
        </span>
      </h1>
      <div className="flex flex-col max-w-fit justify-evenly h-full">
        <Button onClick={handleFileSelect} disabled={isImageUploading}>
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            multiple={true}
            onChange={handleImageUpload}
            className="hidden"
          />
          {isImageUploading ? "Uploading..." : "Select Image"}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
