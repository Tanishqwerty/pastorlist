import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Define the form data interface
export interface FormSubmissionData {
  name: string;
  address: string;
  email: string;
  phone?: string;
  timestamp?: string;
  source?: string;
}

class GoogleSheetsService {
  private doc: GoogleSpreadsheet | null = null;
  private isInitialized = false;

  private async initialize() {
    if (this.isInitialized) return;

    try {
      // Get environment variables
      const serviceAccountEmail = import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = import.meta.env.VITE_GOOGLE_PRIVATE_KEY;
      const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

      if (!serviceAccountEmail || !privateKey || !sheetId) {
        throw new Error('Missing required Google Sheets environment variables');
      }

      // Create JWT client
      const jwt = new JWT({
        email: serviceAccountEmail,
        key: privateKey.replace(/\\n/g, '\n'),
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file'
        ],
      });

      // Initialize the document
      this.doc = new GoogleSpreadsheet(sheetId, jwt);
      await this.doc.loadInfo();

      this.isInitialized = true;
      console.log('Google Sheets service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Sheets service:', error);
      throw error;
    }
  }

  async submitFormData(data: FormSubmissionData): Promise<void> {
    try {
      await this.initialize();

      if (!this.doc) {
        throw new Error('Google Sheets document not initialized');
      }

      // Get the first sheet or create one with headers
      let sheet = this.doc.sheetsByIndex[0];
      
      if (!sheet) {
        // Create a new sheet with headers
        sheet = await this.doc.addSheet({
          headerValues: ['Name', 'Address', 'Email', 'Phone', 'Timestamp', 'Source']
        });
      } else {
        // Check if headers exist, if not set them
        const rows = await sheet.getRows({ limit: 1 });
        if (rows.length === 0) {
          await sheet.setHeaderRow(['Name', 'Address', 'Email', 'Phone', 'Timestamp', 'Source']);
        }
      }

      // Prepare the row data
      const rowData = {
        Name: data.name,
        Address: data.address,
        Email: data.email,
        Phone: data.phone || '',
        Timestamp: data.timestamp || new Date().toISOString(),
        Source: data.source || 'Tampa Landing Page'
      };

      // Add the row to the sheet
      await sheet.addRow(rowData);
      
      console.log('Form data successfully submitted to Google Sheets');
    } catch (error) {
      console.error('Failed to submit form data to Google Sheets:', error);
      throw error;
    }
  }

  // Method to test the connection
  async testConnection(): Promise<boolean> {
    try {
      await this.initialize();
      return this.doc !== null;
    } catch (error) {
      console.error('Google Sheets connection test failed:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const googleSheetsService = new GoogleSheetsService();
