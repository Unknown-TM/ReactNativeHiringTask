import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { CameraView, Camera } from 'expo-camera';

// Get device dimensions for responsive design
const { width, height } = Dimensions.get('window');

/**
 * ScanScreen Component
 * 
 * Main screen for QR code and barcode scanning functionality.
 * Handles camera permissions, scanning logic, and result display.
 * 
 * @param {Object} navigation - React Navigation object
 */
const ScanScreen = ({ navigation }) => {
  // State management for camera and scanning
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  // Request camera permissions on component mount
  useEffect(() => {
    getCameraPermissions();
  }, []);

  // Set up header navigation button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Text style={styles.headerButtonText}>👤</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  /**
   * Requests camera permissions from the user
   */
  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  /**
   * Handles successful barcode/QR code scanning
   * @param {Object} result - Scanning result containing type and data
   */
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    setIsScanning(false);
    
    // Show success alert with options
    Alert.alert(
      'Scan Successful!',
      `Scanned data: ${data}`,
      [
        {
          text: 'Scan Again',
          onPress: () => {
            setScanned(false);
            setScannedData(null);
            setIsScanning(true);
          },
        },
        {
          text: 'Go to Location',
          onPress: () => navigation.navigate('LocationScreen', { scannedData: data }),
        },
      ]
    );
  };

  /**
   * Resets the scanning state to allow new scans
   */
  const resetScan = () => {
    setScanned(false);
    setScannedData(null);
    setIsScanning(true);
  };


  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission is required to scan boarding pass barcodes</Text>
        <TouchableOpacity style={styles.button} onPress={getCameraPermissions}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScanning ? (
        <View style={styles.cameraContainer}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
            barcodeScannerSettings={{
              barcodeTypes: [
                'qr',
                'pdf417',
                'aztec',
                'code128',
                'code39',
                'ean13',
                'ean8',
              ],
            }}
          />
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
              <View style={styles.corner} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Scan Result</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{scannedData}</Text>
          </View>
        </View>
      )}

      <View style={styles.controls}>
        <Text style={styles.instruction}>
          {isScanning
            ? 'Position the boarding pass barcode (QR, PDF417, Aztec) or any barcode within the frame'
            : 'Scan completed successfully!'}
        </Text>

        <View style={styles.buttonContainer}>
          {!isScanning && (
            <TouchableOpacity style={styles.button} onPress={resetScan}>
              <Text style={styles.buttonText}>Scan Again</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.button, 
              styles.secondaryButton,
              !scannedData && styles.disabledButton
            ]}
            onPress={() => scannedData && navigation.navigate('LocationScreen', { scannedData: scannedData })}
            disabled={!scannedData}
          >
            <Text style={[
              styles.buttonText, 
              styles.secondaryButtonText,
              !scannedData && styles.disabledButtonText
            ]}>
              Check Location
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
    width: width,
    height: height * 0.6,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#2196F3',
    borderWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    top: 'auto',
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    maxWidth: 300,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  controls: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 10,
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#2196F3',
  },
  disabledButton: {
    opacity: 0.5,
    borderColor: '#ccc',
  },
  disabledButtonText: {
    color: '#ccc',
  },
  message: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerButton: {
    marginRight: 10,
    padding: 8,
  },
  headerButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default ScanScreen;
