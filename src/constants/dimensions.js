/**
 * Dimension constants for the CheckIn360 app
 * Centralized sizing for consistent UI across components
 */

import { Dimensions } from 'react-native';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const DIMENSIONS = {
  // Screen dimensions
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  
  // Spacing
  SPACING_XS: 4,
  SPACING_SM: 8,
  SPACING_MD: 12,
  SPACING_LG: 16,
  SPACING_XL: 20,
  SPACING_XXL: 24,
  SPACING_XXXL: 32,
  
  // Border radius
  RADIUS_SM: 4,
  RADIUS_MD: 8,
  RADIUS_LG: 12,
  RADIUS_XL: 16,
  RADIUS_CIRCLE: 50,
  
  // Font sizes
  FONT_SIZE_XS: 12,
  FONT_SIZE_SM: 14,
  FONT_SIZE_MD: 16,
  FONT_SIZE_LG: 18,
  FONT_SIZE_XL: 20,
  FONT_SIZE_XXL: 24,
  FONT_SIZE_XXXL: 28,
  FONT_SIZE_HEADER: 32,
  
  // Button dimensions
  BUTTON_HEIGHT: 48,
  BUTTON_HEIGHT_SM: 36,
  BUTTON_HEIGHT_LG: 56,
  BUTTON_PADDING_HORIZONTAL: 20,
  BUTTON_PADDING_VERTICAL: 12,
  
  // Input dimensions
  INPUT_HEIGHT: 48,
  INPUT_PADDING_HORIZONTAL: 15,
  INPUT_PADDING_VERTICAL: 12,
  
  // Icon sizes
  ICON_SIZE_SM: 16,
  ICON_SIZE_MD: 24,
  ICON_SIZE_LG: 32,
  ICON_SIZE_XL: 48,
  
  // Avatar sizes
  AVATAR_SIZE_SM: 32,
  AVATAR_SIZE_MD: 48,
  AVATAR_SIZE_LG: 64,
  AVATAR_SIZE_XL: 80,
  
  // Shadow
  SHADOW_OFFSET: {
    width: 0,
    height: 2,
  },
  SHADOW_OPACITY: 0.1,
  SHADOW_RADIUS: 3.84,
  ELEVATION: 5,
};
