import { mockHouses } from "@/data/mockData";

// Simulate API delay
const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Get houses from localStorage or use mock data
const getHousesFromStorage = () => {
  const stored = localStorage.getItem('mockHouses');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with mock data
  localStorage.setItem('mockHouses', JSON.stringify(mockHouses));
  return mockHouses;
};

// Save houses to localStorage
const saveHousesToStorage = (houses) => {
  localStorage.setItem('mockHouses', JSON.stringify(houses));
};

export const fetchHouseList = async () => {
  try {
    await simulateDelay();
    const houses = getHousesFromStorage();
    return houses;
  } catch (error) {
    console.error('Error fetching houses:', error);
    return [];
  }
};

export const fetchHouseById = async (id) => {
  try {
    await simulateDelay();
    const houses = getHousesFromStorage();
    const house = houses.find(h => h.id === id);
    return house || null;
  } catch (error) {
    console.error('Error fetching house by ID:', error);
    return null;
  }
};

export const createNewHouse = async (houseData, houseImages) => {
  try {
    await simulateDelay();
    
    const houses = getHousesFromStorage();
    
    const newHouse = {
      id: `house_${Date.now()}`,
      ...houseData,
      features: [houseData.feature1, houseData.feature2, houseData.feature3].filter(Boolean),
      houseImages: houseImages || [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop"
      ],
      owner: "admin@demo.com",
      createdAt: new Date().toISOString().split('T')[0],
      status: "available"
    };
    
    houses.push(newHouse);
    saveHousesToStorage(houses);
    
    return { id: newHouse.id };
  } catch (error) {
    console.error('Error creating house:', error);
    throw error;
  }
};

export const deleteHouse = async (id) => {
  try {
    await simulateDelay();
    
    const houses = getHousesFromStorage();
    const filteredHouses = houses.filter(h => h.id !== id);
    saveHousesToStorage(filteredHouses);
    
    return true;
  } catch (error) {
    console.error('Error deleting house:', error);
    throw error;
  }
};

// Additional helper functions for demo purposes
export const searchHouses = async (query) => {
  try {
    await simulateDelay();
    
    const houses = getHousesFromStorage();
    if (!query) return houses;
    
    const searchTerm = query.toLowerCase();
    return houses.filter(house => 
      house.title.toLowerCase().includes(searchTerm) ||
      house.description.toLowerCase().includes(searchTerm) ||
      house.location.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error('Error searching houses:', error);
    return [];
  }
};

export const filterHousesByPrice = async (minPrice, maxPrice) => {
  try {
    await simulateDelay();
    
    const houses = getHousesFromStorage();
    return houses.filter(house => 
      house.price >= minPrice && house.price <= maxPrice
    );
  } catch (error) {
    console.error('Error filtering houses by price:', error);
    return [];
  }
};

export const filterHousesByLocation = async (location) => {
  try {
    await simulateDelay();
    
    const houses = getHousesFromStorage();
    if (!location) return houses;
    
    return houses.filter(house => 
      house.location.toLowerCase().includes(location.toLowerCase())
    );
  } catch (error) {
    console.error('Error filtering houses by location:', error);
    return [];
  }
};

export const createRealEstateListing = async (formData) => {
  try {
    await simulateDelay();
    
    const houses = getHousesFromStorage();
    
    // Convert form data to match existing house structure
    const newHouse = {
      id: `house_${Date.now()}`,
      title: `${formData.propertyType} for Sale`,
      description: formData.description,
      location: formData.address,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseFloat(formData.bathrooms),
      squareFootage: parseInt(formData.squareFootage),
      propertyType: formData.propertyType,
      features: [
        `${formData.bedrooms} Bedrooms`,
        `${formData.bathrooms} Bathrooms`,
        `${formData.squareFootage} sq ft`
      ],
      houseImages: formData.images.length > 0 
        ? formData.images.map((_, index) => `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop&v=${index}`)
        : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop"],
      owner: formData.userEmail, // Use the email provided by the user
      createdAt: new Date().toISOString().split('T')[0],
      status: "available",
      isNewListing: true
    };
    
    houses.push(newHouse);
    saveHousesToStorage(houses);
    
    return { 
      id: newHouse.id,
      success: true,
      message: "Property listed successfully!"
    };
  } catch (error) {
    console.error('Error creating real estate listing:', error);
    throw error;
  }
};