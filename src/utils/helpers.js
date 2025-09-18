// Utility functions for the React Native Hiring Task app

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Format coordinates for display
 * @param {number} coordinate - Coordinate to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted coordinate
 */
export const formatCoordinate = (coordinate, decimals = 6) => {
  return coordinate.toFixed(decimals);
};

/**
 * Constants for the app
 */
export const CONSTANTS = {
  DELHI_AIRPORT: {
    latitude: 28.5562,
    longitude: 77.1000,
  },
  GEOFENCE_RADIUS: 2, // kilometers
  STORAGE_KEYS: {
    USER_DATA: 'userData',
  },
};
