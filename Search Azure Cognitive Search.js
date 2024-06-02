const { SearchClient, AzureKeyCredential } = require('@azure/search-documents');

const searchServiceName = 'YOUR_SEARCH_SERVICE_NAME';
const indexName = 'financial-documents-index';
const apiKey = 'YOUR_SEARCH_SERVICE_API_KEY';

const searchClient = new SearchClient(searchServiceName, indexName, new AzureKeyCredential(apiKey));

// Function to search documents in Azure Cognitive Search
async function searchDocuments(query) {
    const results = await searchClient.search(query);
    return results;
}

// Example usage:
// const searchResults = await searchDocuments('financial report');
// console.log(searchResults);
