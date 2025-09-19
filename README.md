# CheckIn360 - Boarding Pass Scanner & Location Tracker


![Login Screen](https://github.com/Unknown-TM/Sherlock_Studio-React-Native/blob/features/assets/login-screen.png)

![Barcode Scanner](https://github.com/Unknown-TM/Sherlock_Studio-React-Native/blob/features/assets/scan-screen.png)

![Scan Success](https://github.com/Unknown-TM/Sherlock_Studio-React-Native/blob/features/assets/scan-success-screen.png)

![Location Check](https://github.com/Unknown-TM/Sherlock_Studio-React-Native/blob/features/assets/location-check-screen.png)

# Overview
A comprehensive React Native application demonstrating advanced mobile development skills including UI design, barcode scanning, location services, and state management. Built with Expo and modern React Native best practices.

## Technology Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation Stack
- **State Management**: React Hooks with AsyncStorage
- **Camera**: Expo Camera with barcode scanning
- **Location**: Expo Location with geofencing
- **Storage**: AsyncStorage for local data persistence
- **UI**: Custom components with responsive design

## Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **Expo CLI**: `npm install -g @expo/cli`
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation & Setup
```bash
# Clone and navigate to project
cd CheckIn360

# Install dependencies
npm install

# Start Expo development server
npm start
```

### Running the Application
```bash
# Android (recommended for testing)
npm run android
# Alternative: Press 'a' in the terminal

# iOS (macOS only)
npm run ios  
# Alternative: Press 'i' in the terminal

# Web (limited functionality)
npm run web
```

### Permission Management
- **Android**: Settings → Apps → CheckIn360 → Permissions
- **iOS**: Settings → Privacy → Camera/Location → CheckIn360

## Architecture & Code Quality

### Project Structure
```
src/
├── screens/           # Screen components
│   ├── LoginScreen.js
│   ├── ScanScreen.js
│   ├── LocationScreen.js
│   ├── ProfileScreen.js
│   └── SplashScreen.js
├── utils/            # Utility functions
│   └── helpers.js
├── constants/        # App constants
│   ├── colors.js
│   └── dimensions.js
└── components/       # Reusable components
```

## 📱 APK Installation & Testing

### Download APK
**Direct Download**: [Download APK from Releases](https://github.com/Unknown-TM/Sherlock_Studio-React-Native/releases)

### Android Installation Instructions
1. **Enable Unknown Sources**:
   - Go to `Settings` → `Security` → `Install unknown apps`
   - Select your browser/file manager and enable "Allow from this source"
   - Or go to `Settings` → `Privacy` → `Install unknown apps` (Android 8+)

2. **Install APK**:
   - Download the APK file from the releases page
   - Open the downloaded file and tap "Install"
   - Grant required permissions when prompted

### Feature Testing Guide

#### 🔐 Login Screen
- **Test**: Enter any name and email address
- **Expected**: Data persists locally and displays on Profile screen
- **Validation**: Close and reopen app - login data should remain

#### 📷 QR/Barcode Scanning
- **Test**: Point camera at any QR code or barcode
- **Expected**: Shows decoded text in a success screen
- **Validation**: Try different types of codes (QR, UPC, EAN, etc.)

#### 📍 Location Check
- **Test**: Check current location status
- **Expected**: Shows "Inside" or "Outside" Delhi Airport geofence
- **Validation**: 
  - Inside Delhi Airport: Should show "Inside" status
  - Outside Delhi Airport: Should show "Outside" status
  - Location accuracy may vary based on GPS signal

### Android Compatibility
- **Minimum Android Version**: Android 6.0 (API level 23)
- **Recommended**: Android 8.0+ for optimal performance
- **Permissions Required**: Camera, Location (Fine & Coarse)

## Production Build

### Android APK
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### iOS Build
```bash
# Build for iOS (requires macOS)
eas build --platform ios --profile preview
```

## 📚 Libraries & Dependencies

### Core Libraries
- **Expo SDK 54**: Development platform and tools
- **React Native 0.81.4**: Mobile framework
- **React Navigation 6**: Screen navigation
- **AsyncStorage 2.2.0**: Local data persistence

### Feature-Specific Libraries
- **Expo Camera 17.0.8**: Barcode/QR code scanning
- **Expo Location 19.0.7**: GPS and geofencing
- **React Native Gesture Handler**: Touch interactions
- **React Native Reanimated**: Smooth animations
- **Expo Linear Gradient**: UI gradients

---

**Note**: This app requires camera and location permissions to function properly. Grant these permissions when prompted for the best experience.