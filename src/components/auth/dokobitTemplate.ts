import { Asset } from 'expo-asset';

export const getDokobitHtml = async (sessionToken: string, locale: string = 'en'): Promise<string> => {
    try {
        // Load the HTML template file
        const asset = Asset.fromModule(require('./html/dokobit-template.html'));
        await asset.downloadAsync();

        // Fetch the HTML content
        const response = await fetch(asset.localUri || asset.uri);
        let html = await response.text();

        // Replace placeholders with actual values
        html = html.replace('{{SESSION_TOKEN}}', sessionToken);
        html = html.replace('{{LOCALE}}', locale);

        return html;
    } catch (error) {
        console.error('Error loading Dokobit template:', error);
        throw error;
    }
};
