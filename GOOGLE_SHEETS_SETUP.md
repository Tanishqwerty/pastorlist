# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your Tampa Landing Page form submissions.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- A Google Sheet where you want to store form submissions

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

## Step 2: Enable Google Sheets API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"
4. Also enable "Google Drive API" (for file permissions)

## Step 3: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `tampa-landing-page-service`
   - Description: `Service account for Tampa landing page form submissions`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file and keep it secure

## Step 5: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Tampa Landing Page Submissions" (or any name you prefer)
4. Note down the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
   ```

## Step 6: Share the Sheet with Service Account

1. In your Google Sheet, click "Share" (top right)
2. Add the service account email (from the JSON file) as an editor
3. The email will look like: `tampa-landing-page-service@your-project.iam.gserviceaccount.com`

## Step 7: Set Up Environment Variables

1. Copy the `env.example` file to `.env` in your project root
2. Fill in the values from your service account JSON file:

```env
# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id-here
GOOGLE_SHEET_NAME=Form Submissions
```

**Important Notes:**
- The `GOOGLE_PRIVATE_KEY` should include the `\n` characters as shown
- The `GOOGLE_SHEET_ID` is the long string in your Google Sheet URL
- Make sure to add `.env` to your `.gitignore` file to keep credentials secure

## Step 8: Test the Integration

1. Start your development server: `npm run dev`
2. Fill out the form on your landing page
3. Submit the form
4. Check your Google Sheet - you should see a new row with the form data

## Troubleshooting

### Common Issues:

1. **"Missing required Google Sheets environment variables"**
   - Check that your `.env` file is in the project root
   - Verify all environment variables are set correctly

2. **"The caller does not have permission"**
   - Make sure you've shared the Google Sheet with the service account email
   - Verify the service account has editor permissions

3. **"Invalid credentials"**
   - Double-check the service account email and private key
   - Ensure the private key includes the `\n` characters

4. **"Sheet not found"**
   - Verify the Google Sheet ID is correct
   - Make sure the sheet exists and is accessible

### Security Best Practices:

- Never commit your `.env` file to version control
- Keep your service account JSON file secure
- Regularly rotate your service account keys
- Use environment-specific sheets for development and production

## Data Structure

The form will create the following columns in your Google Sheet:

- **Name**: Full name from the form
- **Address**: Address from the form
- **Email**: Email address from the form
- **Phone**: Phone number (optional)
- **Timestamp**: When the form was submitted
- **Source**: "Tampa Landing Page"

## Support

If you encounter any issues, check the browser console for error messages and refer to the [Google Sheets API documentation](https://developers.google.com/sheets/api).
