const { BlobServiceClient } = require('@azure/storage-blob');

const connectionString = 'YOUR_AZURE_BLOB_STORAGE_CONNECTION_STRING';
const containerName = 'financial-documents';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Function to upload document to Azure Blob Storage
async function uploadDocument(fileContent, fileName) {
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.upload(fileContent, fileContent.length);
    console.log('Document uploaded successfully');
}

// Example usage:
// uploadDocument(fileContent, 'example-document.pdf');
