import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { googleSheetsService } from '@/lib/googleSheets';

const GoogleSheetsTest: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  const testConnection = async () => {
    setIsTesting(true);
    setTestResult('');
    
    try {
      const isConnected = await googleSheetsService.testConnection();
      setTestResult(isConnected ? '✅ Connection successful!' : '❌ Connection failed');
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  const testFormSubmission = async () => {
    setIsTesting(true);
    setTestResult('');
    
    try {
      await googleSheetsService.submitFormData({
        name: 'Test User',
        address: '123 Test St, Tampa, FL 33601',
        email: 'test@example.com',
        phone: '555-1234',
        timestamp: new Date().toISOString(),
        source: 'Test Component'
      });
      setTestResult('✅ Test data submitted successfully!');
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Google Sheets Integration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button 
            onClick={testConnection} 
            disabled={isTesting}
            className="w-full"
          >
            {isTesting ? 'Testing...' : 'Test Connection'}
          </Button>
          
          <Button 
            onClick={testFormSubmission} 
            disabled={isTesting}
            variant="outline"
            className="w-full"
          >
            {isTesting ? 'Submitting...' : 'Test Form Submission'}
          </Button>
        </div>
        
        {testResult && (
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm">{testResult}</p>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>Make sure to set up your environment variables first!</p>
          <p>Check GOOGLE_SHEETS_SETUP.md for instructions.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleSheetsTest;
