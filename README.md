# React Native Intern Hiring Task

A mini React Native app demonstrating UI design, QR/Barcode scanning, and location access capabilities.

## Features

### ✅ Core Requirements
- **Login Screen**: Simple name + email input with local storage using AsyncStorage
- **Boarding Pass Scan Screen**: Camera QR/Barcode scanning with decoded text display
- **Location Check Screen**: GPS location fetch and geofence comparison (Delhi Airport: 28.5562, 77.1000)

### ✅ Bonus Features
- **Splash Screen**: Clean loading screen for better UX
- **Local Storage**: User login data persisted using AsyncStorage
- **Clean UI**: Modern, responsive design with proper navigation
- **Error Handling**: Comprehensive error handling for permissions and API calls
- **Smooth Navigation**: Stack navigation between screens

## Technology Stack

- **React Native** with Expo
- **@react-navigation/native** - Navigation
- **@react-navigation/stack** - Stack navigation
- **@react-native-async-storage/async-storage** - Local storage
- **expo-camera** - Camera access
- **expo-barcode-scanner** - QR/Barcode scanning
- **expo-location** - GPS location services

## Project Structure

```
ReactNativeHiringTask/
├── src/
│   ├── screens/
│   │   ├── SplashScreen.js      # Loading screen
│   │   ├── LoginScreen.js       # User login with validation
│   │   ├── ScanScreen.js        # QR/Barcode scanning
│   │   └── LocationScreen.js    # GPS location and geofence
│   ├── components/              # Reusable components
│   └── utils/
│       └── helpers.js           # Utility functions and constants
├── App.js                       # Main app with navigation
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Physical device or emulator

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ReactNativeHiringTask
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - For Android: `npm run android`
   - For iOS: `npm run ios` (macOS only)
   - For web: `npm run web`

## How to Test

### 1. Login Screen
- Enter your name and email
- Email validation is implemented
- Data is stored locally using AsyncStorage
- Successful login navigates to Scan Screen

### 2. Scan Screen
- **Camera Permission**: Grant camera permission when prompted
- **QR Code Scanning**: Point camera at any QR code
- **Barcode Scanning**: Supports various barcode formats (EAN13, EAN8, Code128, Code39)
- **Scan Result**: Displays decoded text after successful scan
- **Navigation**: Options to scan again or proceed to location check

### 3. Location Screen
- **Location Permission**: Grant location permission when prompted
- **Current Location**: Displays your current GPS coordinates
- **Geofence Check**: Compares your location with Delhi Airport (2km radius)
- **Status Display**: Shows "Inside Airport Zone" or "Outside Airport Zone"
- **Distance**: Shows exact distance to Delhi Airport

### 4. Navigation Flow
- **Splash Screen** → **Login Screen** → **Scan Screen** → **Location Screen**
- If user is already logged in, app starts directly at Scan Screen
- Back navigation available between screens

## Testing Scenarios

### QR Code Testing
- Use any QR code generator to create test codes
- Try different types of data (URLs, text, contact info)
- Test with various lighting conditions

### Location Testing
- **Inside Geofence**: Test near Delhi Airport (within 2km)
- **Outside Geofence**: Test from any other location
- **Permission Denied**: Test behavior when location permission is denied
- **GPS Disabled**: Test when device GPS is turned off

### Error Handling Testing
- Deny camera permission and verify error message
- Deny location permission and verify error message
- Test with invalid email format
- Test with empty form fields

## Build for Production

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

### Alternative: Local Build
```bash
# Generate APK locally (requires Android Studio)
npx expo run:android --variant release
```

## Key Features Implementation

### 1. AsyncStorage Integration
- User login data persists across app sessions
- Automatic login check on app startup
- Secure data storage with proper error handling

### 2. Camera & Scanning
- Multiple barcode format support
- Real-time scanning with visual feedback
- Permission handling with user-friendly messages
- Scan result display with navigation options

### 3. Location Services
- High-accuracy GPS location fetching
- Haversine formula for distance calculation
- Geofence comparison with Delhi Airport
- Real-time status updates

### 4. UI/UX Design
- Modern, clean interface
- Consistent color scheme (#2196F3 primary)
- Responsive design for different screen sizes
- Loading states and error messages
- Smooth navigation transitions

## Code Quality Features

- **Modular Architecture**: Separated screens, components, and utilities
- **Error Handling**: Comprehensive try-catch blocks and user feedback
- **Input Validation**: Email format validation and required field checks
- **Constants Management**: Centralized configuration in helpers.js
- **Clean Code**: Well-commented, readable code structure
- **Type Safety**: Proper prop validation and error boundaries

## Troubleshooting

### Common Issues

1. **Camera Permission Denied**
   - Go to device settings → Apps → [App Name] → Permissions
   - Enable Camera permission manually

2. **Location Permission Denied**
   - Go to device settings → Apps → [App Name] → Permissions
   - Enable Location permission manually

3. **Build Errors**
   - Clear cache: `npx expo start --clear`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

4. **Metro Bundler Issues**
   - Reset Metro cache: `npx expo start --clear`
   - Restart development server

## Performance Optimizations

- Lazy loading of screens
- Efficient camera usage with proper cleanup
- Optimized location requests with high accuracy
- Minimal re-renders with proper state management

## Future Enhancements

- [ ] Add biometric authentication
- [ ] Implement offline mode
- [ ] Add scan history
- [ ] Include multiple geofence locations
- [ ] Add push notifications
- [ ] Implement dark mode

## Contact

For any questions or issues, please refer to the code comments or create an issue in the repository.

---

**Note**: This app requires camera and location permissions to function properly. Make sure to grant these permissions when prompted for the best experience.
