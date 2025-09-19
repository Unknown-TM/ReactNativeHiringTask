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

### Key Libraries Used
- **@expo/vector-icons**: Icon components
- **expo-camera**: Camera access and barcode scanning
- **expo-location**: GPS location services and geofencing
- **@react-navigation/stack**: Screen navigation
- **@react-native-async-storage/async-storage**: Local data persistence
- **expo-status-bar**: Status bar management
- **react-native-safe-area-context**: Safe area handling

## Download & Installation

### Direct APK Download
📱 **[Download APK from Releases](https://github.com/Unknown-TM/Sherlock_Studio-React-Native/releases/latest)**

### Android Installation Instructions
1. **Download the APK** from the releases link above
2. **Enable Unknown Sources**:
   - Go to Settings → Security → Install unknown apps
   - Select your file manager/browser → Allow from this source
   - Or Settings → Apps → Special access → Install unknown apps
3. **Install the APK**:
   - Open the downloaded APK file
   - Tap "Install" when prompted
   - Grant camera and location permissions when requested

### Android Version Compatibility
- **Minimum**: Android 6.0 (API level 23)
- **Recommended**: Android 8.0+ (API level 26+)
- **Tested on**: Android 10, 11, 12, 13, 14

## Feature Testing Guide

### 1. Login Screen
- **Test**: Enter your name and email address
- **Expected**: Data persists when you close and reopen the app
- **Verification**: Navigate away and return to see saved information

### 2. QR/Barcode Scanning
- **Test**: Tap the scan button and point camera at any QR code or barcode
- **Expected**: App displays the decoded text content
- **Tips**: Try scanning QR codes from websites, product barcodes, or generate test codes online

### 3. Location Check
- **Test**: Navigate to the location screen
- **Expected**: 
  - If you're inside Delhi Airport geofence: Shows "Inside Delhi Airport"
  - If you're outside: Shows "Outside Delhi Airport" with distance
- **Note**: Requires location permission and GPS to be enabled

## Development Setup

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

---

**Note**: This app requires camera and location permissions to function properly. Grant these permissions when prompted for the best experience.