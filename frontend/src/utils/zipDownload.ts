import JSZip from 'jszip';
import { FileItem } from '../types';

/**
 * Recursively adds files and folders from FileItem structure to JSZip
 */
function addToZip(zip: JSZip, files: FileItem[], basePath: string = ''): void {
  files.forEach((file) => {
    const filePath = basePath ? `${basePath}/${file.name}` : file.name;
    
    if (file.type === 'folder' && file.children) {
      // Create a folder in the zip (JSZip handles folders automatically)
      addToZip(zip, file.children, filePath);
    } else if (file.type === 'file' && file.content !== undefined) {
      // Add file content to zip
      zip.file(filePath, file.content);
    }
  });
}

/**
 * Creates a zip file from FileItem structure and triggers download
 */
export async function downloadCodeAsZip(
  files: FileItem[],
  filename: string = 'code.zip'
): Promise<void> {
  try {
    const zip = new JSZip();
    
    // Add all files and folders to the zip
    addToZip(zip, files);
    
    // Generate the zip file
    const blob = await zip.generateAsync({ type: 'blob' });
    
    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error creating zip file:', error);
    throw new Error('Failed to create zip file');
  }
}


