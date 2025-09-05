// Enhanced image upload utility for Firebase Storage
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';
import { toast } from 'react-toastify';

export class ImageUploader {
  constructor() {
    this.maxFileSize = 5 * 1024 * 1024; // 5MB
    this.allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  }

  // Validate image file
  validateImage(file) {
    if (!file) {
      throw new Error('No file provided');
    }

    if (file.size > this.maxFileSize) {
      throw new Error('Image size must be less than 5MB');
    }

    if (!this.allowedTypes.includes(file.type)) {
      throw new Error('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
    }

    return true;
  }

  // Generate unique filename
  generateFileName(userId, originalName) {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop();
    return `profileImages/${userId}_${timestamp}.${extension}`;
  }

  // Compress image if needed (optional)
  async compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          resolve(blob || file);
        }, file.type, quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // Upload image to Firebase Storage
  async uploadImage(file, userId) {
    try {
      // Validate file
      this.validateImage(file);
      
      // Generate unique filename
      const fileName = this.generateFileName(userId, file.name);
      
      // Compress image if it's large
      const compressedFile = file.size > 1024 * 1024 ? 
        await this.compressImage(file) : file;
      
      // Create storage reference
      const storageRef = ref(storage, fileName);
      
      // Upload file with metadata
      const metadata = {
        contentType: file.type,
        customMetadata: {
          uploadedBy: userId,
          originalName: file.name,
          uploadDate: new Date().toISOString()
        }
      };
      
      console.log('🔄 Uploading image to:', fileName);
      
      // Upload bytes
      const snapshot = await uploadBytes(storageRef, compressedFile, metadata);
      console.log('✅ Upload completed:', snapshot);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log('✅ Download URL obtained:', downloadURL);
      
      return {
        url: downloadURL,
        fileName: fileName,
        size: compressedFile.size || file.size,
        type: file.type
      };
      
    } catch (error) {
      console.error('❌ Image upload error:', error);
      
      // User-friendly error messages
      if (error.code === 'storage/unauthorized') {
        throw new Error('Permission denied. Please make sure you are logged in.');
      } else if (error.code === 'storage/canceled') {
        throw new Error('Upload was canceled');
      } else if (error.code === 'storage/unknown') {
        throw new Error('An unknown error occurred during upload');
      } else if (error.code === 'storage/invalid-format') {
        throw new Error('Invalid file format');
      } else if (error.code === 'storage/invalid-argument') {
        throw new Error('Invalid file data');
      } else {
        throw new Error(error.message || 'Failed to upload image');
      }
    }
  }

  // Delete image from Firebase Storage
  async deleteImage(fileName) {
    try {
      if (!fileName) return;
      
      const storageRef = ref(storage, fileName);
      await deleteObject(storageRef);
      console.log('✅ Image deleted:', fileName);
      
    } catch (error) {
      console.error('❌ Image deletion error:', error);
      // Don't throw error for deletion failures
    }
  }

  // Get image URL by user ID (for retrieval)
  async getImageByUserId(userId) {
    try {
      // This would require listing files, which is not directly supported
      // Instead, we'll store the image URL in Firestore user profile
      console.log('Getting image for user:', userId);
      return null; // Will be handled by Firestore profile data
    } catch (error) {
      console.error('❌ Error getting image:', error);
      return null;
    }
  }

  // Create preview URL for local display
  createPreviewURL(file) {
    return URL.createObjectURL(file);
  }

  // Clean up preview URL
  revokePreviewURL(url) {
    URL.revokeObjectURL(url);
  }
}

// Export singleton instance
export const imageUploader = new ImageUploader();
