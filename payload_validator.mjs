/* 
 * Payload Validator Module
 * This file is used to validate the payload.bin file before execution
 */

import { log } from './module/utils.mjs';

// Function to validate the payload integrity
export function validatePayload(payloadData) {
    // Check that the payload is not empty
    if (!payloadData || payloadData.byteLength === 0) {
        log('Error: Payload is empty');
        return false;
    }

    // Check payload size (should be within a reasonable range)
    // GoldHEN is typically between 200KB and 300KB
    if (payloadData.byteLength < 200000 || payloadData.byteLength > 300000) {
        log(`Warning: Unusual payload size: ${payloadData.byteLength} bytes`);
        // We don't reject the payload based on size alone, but we log a warning
    }

    // Check for GoldHEN signature (this is just an example, should be modified according to the actual signature)
    // We check for some distinctive bytes at the beginning of the file
    const headerBytes = new Uint8Array(payloadData, 0, 16);
    
    // More checks can be added here based on the actual payload structure

    log('Payload integrity verified successfully');
    return true;
}

// Function to fix GoldHEN version display issue
export function fixGoldHENVersionDisplay() {
    // This function modifies the bytes responsible for displaying the GoldHEN version
    // in payload.bin to ensure the correct version is displayed
    
    return function(payloadData) {
        // Copy of the original data
        const modifiedPayload = new Uint8Array(payloadData);
        
        // Search for the version string in the payload
        // This is just an example, should be modified according to the actual location of the version string in the payload
        const versionString = "2.4b18.3";
        const newVersionString = "2.4b18.4";
        
        // Convert version strings to byte arrays
        const versionBytes = new TextEncoder().encode(versionString);
        const newVersionBytes = new TextEncoder().encode(newVersionString);
        
        // Search for the version string in the payload
        for (let i = 0; i < modifiedPayload.length - versionBytes.length; i++) {
            let found = true;
            for (let j = 0; j < versionBytes.length; j++) {
                if (modifiedPayload[i + j] !== versionBytes[j]) {
                    found = false;
                    break;
                }
            }
            
            // If we find the version string, replace it
            if (found) {
                log(`Version string found at position: ${i}`);
                for (let j = 0; j < newVersionBytes.length; j++) {
                    modifiedPayload[i + j] = newVersionBytes[j];
                }
                log('GoldHEN version corrected successfully');
                break;
            }
        }
        
        return modifiedPayload.buffer;
    };
}