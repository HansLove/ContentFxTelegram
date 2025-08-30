# ForexSignal Pro - Content Creator

A clean, simple, and smooth web application for creating professional forex content for Telegram channels.

## Features

### 🎯 **Three Content Types**

1. **Signal** - Create trading signals with entry/exit points, analysis, and risk management
2. **Analysis** - Share market analysis and insights
3. **Education** - Create educational content for your audience

### ✨ **Key Features**

- **Clean Interface** - Simple, intuitive design that's easy to use
- **Real-time Preview** - See exactly how your content will look before sending
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
  "message": "Your formatted content here..."
}
```

Your backend should expect this structure and handle the `message` field as shown in your code:

```javascript
const { message } = req.body;
// Process and send to Telegram
```

## Usage

### 1. **Select Content Type**
- Click on Signal, Analysis, or Education tabs
- Each type has its own specialized form

### 2. **Fill in the Form**
- **Signal**: Instrument, timeframe, direction, entry/exit points, analysis
- **Analysis**: Market analysis with title, content, and conclusion
- **Education**: Educational content with topic, level, and key points

### 3. **Preview Your Content**
- Click "Preview" to see how your content will look
- Review the formatting and content

### 4. **Send to Telegram**
- Click "Send to Telegram" to post to your channel
- The content is sent to your backend at `localhost:3002/telegram/makePost`

### 5. **Clear Forms**
- Use "Clear" to reset all forms and start fresh

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

### Content Formatting
Modify the preview generation functions in `app.js` to change how content is formatted.

### Styling
Edit `style.css` to customize colors, fonts, and layout.

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # Styling and layout
├── app.js             # JavaScript functionality
└── README.md          # This file
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

### Preview Not Working
- Ensure all required fields are filled
- Check browser console for JavaScript errors

### Styling Issues
- Clear browser cache
- Ensure all CSS and JavaScript files are loaded

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify your backend is running and accessible
3. Ensure all required fields are completed before previewing

## License

This project is open source and available under the MIT License.
