// Mock data for the Rent Estate project
export const mockHouses = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    description: "Beautiful 2-bedroom apartment in the heart of downtown with stunning city views.",
    price: 2500,
    location: "Downtown",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    features: ["Balcony", "Gym Access", "Parking"],
    houseImages: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&h=300&fit=crop"
    ],
    owner: "admin@demo.com",
    createdAt: "2024-01-15",
    status: "available"
  },
  {
    id: "2",
    title: "Cozy Suburban House",
    description: "Family-friendly 3-bedroom house with a large backyard and modern amenities.",
    price: 3200,
    location: "Suburbs",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    features: ["Backyard", "Garage", "Fireplace"],
    houseImages: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop"
    ],
    owner: "admin@demo.com",
    createdAt: "2024-01-10",
    status: "available"
  },
  {
    id: "3",
    title: "Luxury Penthouse Suite",
    description: "Exclusive penthouse with panoramic views, premium finishes, and top-tier amenities.",
    price: 8500,
    location: "Uptown",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    features: ["Rooftop Terrace", "Concierge", "Wine Cellar"],
    houseImages: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&h=300&fit=crop"
    ],
    owner: "admin@demo.com",
    createdAt: "2024-01-05",
    status: "available"
  },
  {
    id: "4",
    title: "Studio Loft",
    description: "Modern studio loft perfect for young professionals, featuring open concept design.",
    price: 1800,
    location: "Arts District",
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    features: ["High Ceilings", "Exposed Brick", "Walk-in Closet"],
    houseImages: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop"
    ],
    owner: "admin@demo.com",
    createdAt: "2024-01-20",
    status: "available"
  },
  {
    id: "5",
    title: "Waterfront Condo",
    description: "Stunning waterfront condo with private balcony and marina access.",
    price: 4200,
    location: "Harbor District",
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    features: ["Water View", "Marina Access", "Pool"],
    houseImages: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&h=300&fit=crop"
    ],
    owner: "admin@demo.com",
    createdAt: "2024-01-12",
    status: "available"
  }
];

export const mockUsers = [
  {
    uid: "admin123",
    email: "admin@demo.com",
    role: "admin",
    name: "Demo Admin"
  },
  {
    uid: "user123",
    email: "user@demo.com",
    role: "user",
    name: "Demo User"
  }
];

// Demo credentials for testing
export const demoCredentials = {
  admin: {
    email: "admin@demo.com",
    password: "admin123"
  },
  user: {
    email: "user@demo.com",
    password: "user123"
  }
};
