# Apps Script Debug Version

Replace your current Apps Script code with this debug version to see exactly what's happening:

```javascript
function doPost(e) {
  console.log('doPost called');
  console.log('Full event object:', JSON.stringify(e, null, 2));
  
  try {
    // Log the raw request data
    var body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    console.log('Raw body:', body);
    
    var data = JSON.parse(body);
    console.log('Parsed data:', JSON.stringify(data, null, 2));
    
    // Open the spreadsheet
    console.log('Opening spreadsheet with ID: 1KFMJO51rQQ9qNLxgZF6qlJBm9xIxHnJaxYsSJUpW8pc');
    var ss = SpreadsheetApp.openById('1KFMJO51rQQ9qNLxgZF6qlJBm9xIxHnJaxYsSJUpW8pc');
    console.log('Spreadsheet opened successfully');
    
    var sheet = ss.getSheets()[0];
    console.log('Got first sheet:', sheet.getName());
    console.log('Current row count:', sheet.getLastRow());
    
    // Prepare the row data
    var rowData = [
      data.name || '',
      data.address || '',
      data.email || '',
      data.phone || '',
      new Date(),
      data.source || 'Tampa Landing Page'
    ];
    console.log('Row data to append:', JSON.stringify(rowData));
    
    // Append the row
    sheet.appendRow(rowData);
    SpreadsheetApp.flush();
    console.log('Row appended successfully');
    console.log('New row count:', sheet.getLastRow());
    
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    console.error('Error in doPost:', err);
    console.error('Error stack:', err.stack);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err), stack: err.stack }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Steps to debug:

1. **Replace your Apps Script code** with the debug version above
2. **Deploy** → Manage deployments → Edit → Deploy (keeps same URL)
3. **Submit the form** from your website
4. **Check the execution log**:
   - Apps Script → Left sidebar → Executions
   - Click on the latest execution
   - Look at the console logs to see exactly what happened

## What to look for:

- **If you see logs**: The script is running, check what the logs show
- **If no logs appear**: The script isn't receiving the request
- **If you see an error**: The error message will tell us exactly what's wrong
- **If logs show "Row appended successfully"**: Check if you're looking at the right sheet/tab

## Quick test:

You can also test directly with curl to isolate the issue:

```bash
curl -X POST -H "Content-Type: text/plain" -d "{\"name\":\"Debug Test\",\"address\":\"123 Test St\",\"email\":\"test@example.com\",\"phone\":\"555-1234\"}" "https://script.google.com/macros/s/AKfycbzCpp2A04lgEbuVs65_rCngIGFew_W9TE7Nx6BMQgWWsLBbZEmnRvDIouZ9vkwdBYaBEQ/exec"
```

This will help us see exactly where the issue is!


