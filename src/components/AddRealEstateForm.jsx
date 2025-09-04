import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRealEstateListing } from "@/service/realEstateApi";

const AddRealEstateForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userEmail: "",
    address: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    price: "",
    description: "",
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  const totalSteps = 6; // 5 form steps + 1 success step

  // Helper function to get input classes with validation styling
  const getInputClasses = (isValid = true) => {
    const baseClasses = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";
    const validClasses = "border-gray-300";
    const invalidClasses = "border-red-300 bg-red-50";
    
    return `${baseClasses} ${isValid ? validClasses : invalidClasses}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Please select files smaller than 10MB.`);
        return false;
      }
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image. Please select image files only.`);
        return false;
      }
      return true;
    });
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Please select files smaller than 10MB.`);
        return false;
      }
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image. Please select image files only.`);
        return false;
      }
      return true;
    });
    
    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Validation functions for each step
  const validateStep = (step) => {
    setValidationError("");
    
    switch (step) {
      case 1: { // Email step
        if (!formData.userEmail.trim()) {
          setValidationError("Please enter your email address to continue.");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.userEmail)) {
          setValidationError("Please enter a valid email address.");
          return false;
        }
        return true;
      }

      case 2: // Address step
        if (!formData.address.trim()) {
          setValidationError("Please enter the property address to continue.");
          return false;
        }
        return true;

      case 3: // Property details step
        if (!formData.propertyType) {
          setValidationError("Please select a property type.");
          return false;
        }
        if (!formData.bedrooms || formData.bedrooms <= 0) {
          setValidationError("Please enter a valid number of bedrooms.");
          return false;
        }
        if (!formData.bathrooms || formData.bathrooms <= 0) {
          setValidationError("Please enter a valid number of bathrooms.");
          return false;
        }
        if (!formData.squareFootage || formData.squareFootage <= 0) {
          setValidationError("Please enter a valid square footage.");
          return false;
        }
        return true;

      case 4: // Pricing & description step
        if (!formData.price || formData.price <= 0) {
          setValidationError("Please enter a valid price for the property.");
          return false;
        }
        if (!formData.description.trim()) {
          setValidationError("Please enter a description for the property.");
          return false;
        }
        if (formData.description.trim().length < 20) {
          setValidationError("Please enter a more detailed description (at least 20 characters).");
          return false;
        }
        return true;

      case 5: // Photos step (optional)
        // Photos are optional, so always allow proceeding
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      if (validateStep(currentStep)) {
        // If we're on step 5 (Photos), submit the form directly
        if (currentStep === 5) {
          handleSubmit();
        } else {
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      // Validate required fields
      if (!formData.userEmail || !formData.address || !formData.propertyType || !formData.bedrooms || 
          !formData.bathrooms || !formData.squareFootage || !formData.price || !formData.description) {
        throw new Error("Please fill in all required fields");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.userEmail)) {
        throw new Error("Please enter a valid email address");
      }

      // Call the service to create the listing
      const result = await createRealEstateListing(formData);
      
      if (result.success) {
        // Move to success step (step 6)
        setCurrentStep(6);
      } else {
        throw new Error(result.message || "Failed to create listing");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message || "An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Let&apos;s get started
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              First, we need your email address to create your property listing and keep you updated on inquiries.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-gray-800 font-semibold mb-4">
                Enter your email address to continue.
              </p>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className={getInputClasses(validationError === "" || !validationError.includes("email"))}
                required
              />
            </div>

            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-6xl">📧</div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Tell us a bit about your home
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find out how much your home could sell for with a Showcase listing in as little as <strong>3 minutes</strong>.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-gray-800 font-semibold mb-4">
                First, enter the address of the home you&apos;re looking to sell.
              </p>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-6xl">🏠</div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Property Details
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Let&apos;s get some basic information about your property.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    min="0"
                    step="0.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Square Footage</label>
                  <input
                    type="number"
                    name="squareFootage"
                    value={formData.squareFootage}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Pricing & Description
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Help potential buyers understand your property better.
            </p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your property's features, amenities, and what makes it special..."
                  required
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Add Photos
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Upload photos to showcase your property. Good photos can significantly increase interest.
            </p>
            
            <div className="space-y-6">
              {/* Custom File Upload Area */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-colors duration-200"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                </label>
              </div>
              
              {formData.images.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Uploaded Images ({formData.images.length})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-4xl text-green-600">✓</div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Property Added Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your property has been added to our listings. Potential buyers can now view and contact you about your property.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate("/")}
                className="w-full px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Go to Homepage
              </button>
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setFormData({
                    userEmail: "",
                    address: "",
                    propertyType: "",
                    bedrooms: "",
                    bathrooms: "",
                    squareFootage: "",
                    price: "",
                    description: "",
                    images: []
                  });
                  setValidationError("");
                  setError("");
                }}
                className="w-full px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Add Another Property
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Don't show navigation buttons on success step
  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-end p-4">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Exit
          </Link>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          {renderStepContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Exit button */}
      <div className="flex justify-end p-4">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Exit
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 mb-8">
        <div
          className="bg-blue-600 h-2 transition-all duration-300"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        ></div>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Please complete this step
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{validationError}</p>
              </div>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => setValidationError("")}
                  className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4">
        {renderStepContent()}
        
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
            >
              Back
            </button>
          )}
          
          <div className="ml-auto flex gap-3">            
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={nextStep}
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 5 ? (isSubmitting ? "Submitting..." : "Submit Property") : "Next"}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRealEstateForm;
