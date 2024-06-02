const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const keyVaultName = 'YOUR_KEY_VAULT_NAME';
const vaultUrl = `https://${keyVaultName}.vault.azure.net`;
const credential = new DefaultAzureCredential();

const secretClient = new SecretClient(vaultUrl, credential);

// Function to get encryption key from Azure Key Vault
async function getEncryptionKey(secretName) {
    const secret = await secretClient.getSecret(secretName);
    return secret.value;
}

// Example usage:
// const encryptionKey = await getEncryptionKey('encryption-key');
