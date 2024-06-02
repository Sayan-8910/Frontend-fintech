const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { BlobServiceClient } = require('@azure/storage-blob');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const connectionString = 'YOUR_AZURE_BLOB_STORAGE_CONNECTION_STRING';
const containerName = 'financial-documents';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const fileContent = fs.readFileSync(req.file.path);
        const blobName = req.file.filename;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(fileContent, fileContent.length);
        fs.unlinkSync(req.file.path);
        res.status(200).send('Document uploaded successfully');
    } catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).send('Failed to upload document');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
