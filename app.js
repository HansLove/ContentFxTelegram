// ForexSignal Pro - Content Creator
class ContentCreator {
  constructor() {
    this.currentType = 'signal';
    this.backendUrl = 'http://localhost:3002/telegram/makePost';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showForm('signal');
  }

  setupEventListeners() {
    // Content type switching
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.currentTarget.dataset.type;
        this.switchContentType(type);
      });
    });

    // Action buttons
    document.getElementById('btnPreview').addEventListener('click', () => this.generatePreview());
    document.getElementById('btnSend').addEventListener('click', () => this.sendToBackend());
    document.getElementById('btnClear').addEventListener('click', () => this.clearForms());
  }

  switchContentType(type) {
    // Update active button
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');

    // Update preview type
    document.getElementById('previewType').textContent = type.charAt(0).toUpperCase() + type.slice(1);

    // Show/hide forms
    this.showForm(type);
    this.currentType = type;

    // Clear preview
    this.clearPreview();
  }

  showForm(type) {
    // Hide all forms
    document.querySelectorAll('.content-form').forEach(form => {
      form.classList.remove('active');
    });

    // Show selected form
    const form = document.getElementById(`${type}Form`);
    if (form) {
      form.classList.add('active');
    }
  }

  generatePreview() {
    let previewContent = '';
    
    switch (this.currentType) {
      case 'signal':
        previewContent = this.generateSignalPreview();
        break;
      case 'analysis':
        previewContent = this.generateAnalysisPreview();
        break;
      case 'education':
        previewContent = this.generateEducationPreview();
        break;
    }

    this.displayPreview(previewContent);
  }

  generateSignalPreview() {
    const symbol = document.getElementById('signalSymbol').value;
    const timeframe = document.getElementById('signalTimeframe').value;
    const direction = document.getElementById('signalDirection').value;
    const confidence = document.getElementById('signalConfidence').value;
    const entry = document.getElementById('signalEntry').value;
    const stopLoss = document.getElementById('signalStopLoss').value;
    const tp1 = document.getElementById('signalTP1').value;
    const tp2 = document.getElementById('signalTP2').value;
    const analysis = document.getElementById('signalAnalysis').value;
    const risk = document.getElementById('signalRisk').value;
    const author = document.getElementById('signalAuthor').value;
    const validUntil = document.getElementById('signalValidUntil').value;

    if (!symbol || !timeframe || !direction || !confidence || !entry || !stopLoss || !analysis || !risk || !author) {
      this.showToast('Please fill in all required fields', 'warning');
      return '';
    }

    const directionText = direction === 'BUY' ? '🟢 LONG / BUY' : direction === 'SELL' ? '🔴 SHORT / SELL' : '🟡 NEUTRAL / WAIT';
    const confidenceEmoji = confidence === 'High' ? '🟢' : confidence === 'Medium' ? '🟡' : '🔴';
    const riskEmoji = risk === 'Conservative' ? '🟢' : risk === 'Moderate' ? '🟡' : '🔴';

    let preview = `📊 FOREX SIGNAL\n`;
    preview += `═══════════════════\n\n`;
    preview += `🎯 ${symbol} (${timeframe})\n`;
    preview += `${directionText}\n`;
    preview += `${confidenceEmoji} ${confidence} Confidence\n`;
    preview += `${riskEmoji} ${risk} Risk\n\n`;

    preview += `📈 ENTRY & EXIT:\n`;
    preview += `Entry: ${entry}\n`;
    preview += `Stop Loss: ${stopLoss}\n`;
    if (tp1) preview += `Take Profit 1: ${tp1}\n`;
    if (tp2) preview += `Take Profit 2: ${tp2}\n\n`;

    preview += `📋 MARKET ANALYSIS:\n`;
    preview += `${analysis}\n\n`;

    if (validUntil) {
      const validDate = new Date(validUntil).toLocaleString();
      preview += `⏰ Valid until: ${validDate}\n\n`;
    }

    preview += `👤 ${author}\n`;
    preview += `═══════════════════\n`;
    preview += `⚠️ Educational purposes only. Not financial advice.`;

    return preview;
  }

  generateAnalysisPreview() {
    const symbol = document.getElementById('analysisSymbol').value;
    const timeframe = document.getElementById('analysisTimeframe').value;
    const type = document.getElementById('analysisType').value;
    const title = document.getElementById('analysisTitle').value;
    const content = document.getElementById('analysisContent').value;
    const conclusion = document.getElementById('analysisConclusion').value;
    const author = document.getElementById('analysisAuthor').value;

    if (!symbol || !timeframe || !type || !title || !content || !conclusion || !author) {
      this.showToast('Please fill in all required fields', 'warning');
      return '';
    }

    let preview = `📊 MARKET ANALYSIS\n`;
    preview += `═══════════════════\n\n`;
    preview += `🎯 ${symbol} (${timeframe})\n`;
    preview += `📋 ${type}\n\n`;
    preview += `📝 ${title}\n`;
    preview += `═══════════════════\n\n`;
    preview += `${content}\n\n`;
    preview += `🔍 CONCLUSION:\n`;
    preview += `${conclusion}\n\n`;
    preview += `👤 ${author}\n`;
    preview += `═══════════════════\n`;
    preview += `📚 Educational content`;

    return preview;
  }

  generateEducationPreview() {
    const topic = document.getElementById('educationTopic').value;
    const level = document.getElementById('educationLevel').value;
    const title = document.getElementById('educationTitle').value;
    const content = document.getElementById('educationContent').value;
    const keyPoints = document.getElementById('educationKeyPoints').value;
    const author = document.getElementById('educationAuthor').value;

    if (!topic || !level || !title || !content || !keyPoints || !author) {
      this.showToast('Please fill in all required fields', 'warning');
      return '';
    }

    const levelEmoji = level === 'Beginner' ? '🟢' : level === 'Intermediate' ? '🟡' : '🔴';

    let preview = `📚 EDUCATIONAL CONTENT\n`;
    preview += `═══════════════════\n\n`;
    preview += `🎓 ${topic}\n`;
    preview += `${levelEmoji} ${level} Level\n\n`;
    preview += `📝 ${title}\n`;
    preview += `═══════════════════\n\n`;
    preview += `${content}\n\n`;
    preview += `🔑 KEY POINTS:\n`;
    preview += `${keyPoints}\n\n`;
    preview += `👤 ${author}\n`;
    preview += `═══════════════════\n`;
    preview += `📖 Learning material`;

    return preview;
  }

  displayPreview(content) {
    if (!content) return;

    const previewContent = document.getElementById('previewContent');
    previewContent.innerHTML = `
      <div class="preview-message">
        <pre>${content}</pre>
      </div>
    `;
  }

  clearPreview() {
    const previewContent = document.getElementById('previewContent');
    previewContent.innerHTML = `
      <div class="preview-placeholder">
        <i class="fas fa-eye"></i>
        <p>Click "Preview" to see how your content will look</p>
      </div>
    `;
  }

  async sendToBackend() {
    let message = '';
    
    switch (this.currentType) {
      case 'signal':
        message = this.generateSignalPreview();
        break;
      case 'analysis':
        message = this.generateAnalysisPreview();
        break;
      case 'education':
        message = this.generateEducationPreview();
        break;
    }

    if (!message) {
      this.showToast('Please generate a preview first', 'warning');
      return;
    }

    try {
      this.showToast('Sending to Telegram...', 'info');
      
      const response = await fetch(this.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (response.ok) {
        const result = await response.json();
        this.showToast('✅ Successfully sent to Telegram!', 'success');
        console.log('Backend response:', result);
      } else {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        this.showToast('❌ Error sending to Telegram', 'error');
      }
    } catch (error) {
      console.error('Network error:', error);
      this.showToast('❌ Network error - check console', 'error');
    }
  }

  clearForms() {
    // Clear all forms
    document.querySelectorAll('.content-form').forEach(form => {
      form.reset();
    });

    // Clear preview
    this.clearPreview();

    // Show success message
    this.showToast('✅ All forms cleared', 'success');
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    // Remove existing classes
    toast.className = 'toast';
    
    // Add type-specific styling
    switch (type) {
      case 'success':
        toast.style.borderColor = 'var(--success)';
        toast.style.color = 'var(--success)';
        break;
      case 'warning':
        toast.style.borderColor = 'var(--warning)';
        toast.style.color = 'var(--warning)';
        break;
      case 'error':
        toast.style.borderColor = 'var(--danger)';
        toast.style.color = 'var(--danger)';
        break;
      default:
        toast.style.borderColor = 'var(--primary)';
        toast.style.color = 'var(--primary)';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContentCreator();
});

// Add some sample data for testing (optional)
function populateSampleData() {
  // Sample signal data
  document.getElementById('signalSymbol').value = 'EURUSD';
  document.getElementById('signalTimeframe').value = '1H';
  document.getElementById('signalDirection').value = 'BUY';
  document.getElementById('signalConfidence').value = 'Medium';
  document.getElementById('signalEntry').value = '1.0850';
  document.getElementById('signalStopLoss').value = '1.0820';
  document.getElementById('signalTP1').value = '1.0880';
  document.getElementById('signalTP2').value = '1.0900';
  document.getElementById('signalAnalysis').value = 'EURUSD showing bullish momentum on H1 timeframe. Price is respecting the ascending trendline and finding support at key levels. RSI indicates oversold conditions with potential for reversal.';
  document.getElementById('signalRisk').value = 'Moderate';
  document.getElementById('signalAuthor').value = 'Hans from TradeTab';
  
  // Sample analysis data
  document.getElementById('analysisSymbol').value = 'GBPUSD';
  document.getElementById('analysisTimeframe').value = '4H';
  document.getElementById('analysisType').value = 'Technical';
  document.getElementById('analysisTitle').value = 'GBPUSD Technical Breakdown - Key Support/Resistance Levels';
  document.getElementById('analysisContent').value = 'GBPUSD is currently trading within a well-defined range between 1.2600 and 1.2800. The pair has been respecting these key psychological levels for the past week. Technical indicators show mixed signals with RSI hovering around 50 and MACD showing minimal momentum.';
  document.getElementById('analysisConclusion').value = 'Expect continued range-bound trading with potential breakout above 1.2800 or below 1.2600. Monitor volume for confirmation of directional moves.';
  document.getElementById('analysisAuthor').value = 'Hans from TradeTab';
  
  // Sample education data
  document.getElementById('educationTopic').value = 'Risk Management';
  document.getElementById('educationLevel').value = 'Beginner';
  document.getElementById('educationTitle').value = 'Essential Risk Management Principles for Forex Traders';
  document.getElementById('educationContent').value = 'Risk management is the cornerstone of successful forex trading. This fundamental concept involves protecting your capital while maximizing potential returns. The key principle is to never risk more than you can afford to lose on any single trade.';
  document.getElementById('educationKeyPoints').value = '1. Never risk more than 1-2% per trade\n2. Always use stop losses\n3. Maintain proper position sizing\n4. Diversify your portfolio\n5. Keep emotions in check';
  document.getElementById('educationAuthor').value = 'Hans from TradeTab';
}

// Uncomment the line below to populate sample data for testing
// populateSampleData();
