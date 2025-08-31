# ForexSignal Pro - Content Creator

A clean, simple, and smooth web application for creating professional forex content for Telegram channels with **AI-powered risk analysis**, **writing advice**, **favorites management**, and **recurring posts**.

## Features

### 🎯 **Three Content Types**

1. **Signal** - Create trading signals with entry/exit points, analysis, and risk management
2. **Analysis** - Share market analysis and insights
3. **Education** - Create educational content for your audience

### ✨ **Key Features**

- **Clean Interface** - Simple, intuitive design that's easy to use
- **Real-time Preview** - See exactly how your content will look before sending
- **Image Upload** - Attach charts and images to your messages (drag & drop supported)
- **AI Risk Analysis** - Automatic detection of high-risk content and compliance issues
- **Writing Advice** - AI-powered suggestions to improve your content quality
- **Copy to Clipboard** - One-click copy with perfect Telegram formatting
- **Favorites System** - Save and reuse your best content
- **Recurring Posts** - Schedule posts to repeat automatically
- **Backend Integration** - Connects to your Telegram backend at `localhost:3002/telegram/makePost`
- **Responsive Design** - Works on desktop and mobile devices
- **Professional Formatting** - Automatically formats content for Telegram

## Setup

### Prerequisites

- Your backend server running on `localhost:3002`
- Backend endpoint: `POST /telegram/makePost`

### Installation

1. **Clone or download** the files to your project directory
2. **Ensure your backend** is running on `localhost:3002`
3. **Open `index.html`** in your web browser

### Backend Integration

The application sends data to your backend in this format:

```json
{
  "message": "Your formatted content here...",
  "image": "base64_encoded_image_data",
  "imageName": "filename.jpg",
  "imageType": "image/jpeg"
}
```

Your backend should expect this structure and handle both the `message` field and optional `image` data:

```javascript
const { message, image, imageName, imageType } = req.body;

if (image) {
    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image, 'base64');
    
    // Save image or send to Telegram
    console.log('Received image:', imageName, imageType, imageBuffer.length);
}

// Always handle the message
console.log('Received message:', message);
```

## Usage

### 1. **Select Content Type**
- Click on Signal, Analysis, or Education tabs
- Each type has its own specialized form

### 2. **Fill in the Form**
- **Signal**: Instrument, timeframe, direction, entry/exit points, analysis
- **Analysis**: Market analysis with title, content, and conclusion
- **Education**: Educational content with topic, level, and key points

### 3. **Attach Images (Optional)**
- **Drag & Drop**: Simply drag an image file onto the upload area
- **Click to Upload**: Click the upload area to select an image file
- **Supported Formats**: JPG, PNG, GIF (Max: 5MB)
- **Remove**: Click the X button to remove attached images

### 4. **Preview & Analyze**
- Click "Preview" to see how your content will look
- **Risk Analysis**: Automatically detects compliance issues and risk factors
- **Writing Tips**: Get AI-powered suggestions to improve your content

### 5. **Copy to Clipboard**
- Click "Copy to Clipboard" to copy content with perfect Telegram formatting
- Ready to paste directly into Telegram
- No need to reformat or adjust spacing

### 6. **Save as Favorite**
- Click "Save as Favorite" to store your content
- Give it a memorable name
- Access it later from the Favorites panel

### 7. **Schedule Recurring Post**
- Click "Schedule Recurring" to set up automatic posting
- Choose frequency (daily/weekly/monthly)
- Set specific time for posting
- Perfect for daily market updates

### 8. **Send to Telegram**
- Click "Send to Telegram" to post to your channel
- Content and images are sent to your backend at `localhost:3002/telegram/makePost`

### 9. **Clear Forms**
- Use "Clear" to reset all forms and start fresh

## AI-Powered Features

### 🛡️ **Risk Analysis**

The application automatically analyzes your content for:

- **High Risk**: Promises/guarantees, get-rich-quick schemes, risk-free claims
- **Medium Risk**: High leverage recommendations, all-in mentality
- **Low Risk**: Risk management concepts, educational content

**Risk Score**: 0-100 scale with color-coded indicators
- 🟢 **Low Risk** (0-30): Content is compliant and professional
- 🟡 **Medium Risk** (31-60): Some concerns, review recommended
- 🔴 **High Risk** (61-100): Significant compliance issues, rewrite needed

### 💡 **Writing Advice**

AI-powered suggestions for:

- **Content Length**: Optimal length for engagement
- **Visual Structure**: Use of emojis and formatting
- **Risk Disclaimers**: Compliance requirements
- **Professional Tone**: Language and credibility
- **Technical Analysis**: Proper terminology usage
- **Entry/Exit Clarity**: Actionable signal structure

## Content Management

### ⭐ **Favorites System**

- **Save Content**: Store your best signals, analysis, and educational posts
- **Quick Access**: Load favorites with one click
- **Copy & Paste**: Copy favorite content directly to clipboard
- **Organize**: Name and categorize your favorites
- **Persistent**: Favorites are saved locally and persist between sessions

### 🕐 **Recurring Posts**

- **Daily Updates**: Perfect for morning market summaries
- **Weekly Analysis**: Schedule weekly technical reviews
- **Monthly Education**: Regular educational content
- **Flexible Timing**: Set specific times for posting
- **Active/Inactive**: Toggle posts on and off as needed

## Image Support

### **Telegram Compatibility**
- ✅ **Images display beautifully** in Telegram messages
- ✅ **Charts and screenshots** enhance your analysis
- ✅ **Professional appearance** with proper formatting
- ✅ **Mobile-friendly** viewing experience

### **Upload Features**
- **Drag & Drop**: Intuitive file upload
- **File Validation**: Type and size checking
- **Preview**: See exactly what will be sent
- **Easy Removal**: One-click image removal

## Backend Testing

### **Debugging Tools**
Use `backend-test.html` to test your backend connection:

1. **Test Connection**: Verify backend is reachable
2. **Send Text Only**: Test basic message handling
3. **Send with Image**: Test image upload functionality
4. **View Logs**: See detailed request/response information

### **Common Issues**
- **Connection Refused**: Backend not running on port 3002
- **CORS Error**: Backend needs CORS headers
- **404 Error**: Endpoint path incorrect
- **Image Not Received**: Check backend image handling

## Content Examples

### Signal Example
```
📊 FOREX SIGNAL
═══════════════════

🎯 EURUSD (1H)
🟢 LONG / BUY
🟡 Medium Confidence
🟡 Moderate Risk

📈 ENTRY & EXIT:
Entry: 1.0850
Stop Loss: 1.0820
Take Profit 1: 1.0880
Take Profit 2: 1.0900

📋 MARKET ANALYSIS:
EURUSD showing bullish momentum on H1 timeframe...

👤 Hans from TradeTab
═══════════════════
⚠️ Educational purposes only. Not financial advice.
```

### Analysis Example
```
📊 MARKET ANALYSIS
═══════════════════

🎯 GBPUSD (4H)
📋 Technical Analysis

📝 GBPUSD Technical Breakdown - Key Support/Resistance Levels
═══════════════════

GBPUSD is currently trading within a well-defined range...

🔍 CONCLUSION:
Expect continued range-bound trading...

👤 Hans from TradeTab
═══════════════════
📚 Educational content
```

## Customization

### Backend URL
To change the backend URL, edit the `backendUrl` in `app.js`:

```javascript
this.backendUrl = 'http://localhost:3002/telegram/makePost';
```

### Risk Analysis Rules
Modify the `analyzeRisk()` function in `app.js` to customize risk detection:

```javascript
// Add custom risk indicators
if (text.includes('your_custom_phrase')) {
  riskScore += 20;
  riskFactors.push({ 
    factor: 'Custom Factor', 
    level: 'medium', 
    description: 'Your description here' 
  });
}
```

### Writing Advice
Customize the `generateWritingAdvice()` function for your specific needs.

### Styling
Edit `style.css` to customize colors, fonts, and layout.

## File Structure

```
├── index.html              # Main HTML file with all features
├── style.css               # Styling, layout, and responsive design
├── app.js                  # JavaScript with AI features and management
├── backend-test.html       # Backend testing and debugging tool
├── test-image.html         # Image upload testing demo
└── README.md               # This documentation
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Content Not Sending
- Check that your backend is running on `localhost:3002`
- Verify the endpoint `/telegram/makePost` exists
- Check browser console for error messages
- Use `backend-test.html` to debug connection issues

### Images Not Working
- Ensure image file is under 5MB
- Check file format (JPG, PNG, GIF)
- Verify backend can handle base64 image data
- Test with `backend-test.html` to isolate issues

### Preview Not Working
- Ensure all required fields are filled
- Check browser console for JavaScript errors

### Risk Analysis Issues
- Generate preview first to trigger analysis
- Check that content contains text for analysis

### Favorites Not Saving
- Check browser localStorage support
- Ensure JavaScript is enabled
- Check console for errors

### Styling Issues
- Clear browser cache
- Ensure all CSS and JavaScript files are loaded

## Support

For issues or questions:
1. Check the browser console for error messages
2. Use `backend-test.html` to test backend connectivity
3. Verify your backend is running and accessible
4. Ensure all required fields are completed before previewing
5. Check image file size and format requirements

## License

This project is open source and available under the MIT License.
