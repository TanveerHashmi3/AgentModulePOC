import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'your-client-id', // Replace with your Azure AD app client ID
    authority: 'https://login.microsoftonline.com/your-tenant-id', // Replace with your tenant ID
    redirectUri: 'http://localhost:4200', // Adjust for your environment
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

export const loginRequest = {
  scopes: ['user.read'], // Add your API scopes here
};