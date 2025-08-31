// ForexSignal Pro - Content Creator
class ContentCreator {
  constructor() {
    this.currentType = 'signal';
    this.backendUrl = 'http://localhost:3002/telegram/makePost';
    this.uploadedImage = null;
    this.favorites = JSON.parse(localStorage.getItem('forexFavorites') || '[]');
    this.recurringPosts = JSON.parse(localStorage.getItem('forexRecurringPosts') || '[]');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showForm('signal');
    this.loadFavorites();
    this.loadRecurringPosts();
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
    document.getElementById('btnCopy').addEventListener('click', () => this.copyToClipboard());
    document.getElementById('btnSend').addEventListener('click', () => this.sendToBackend());
    document.getElementById('btnClear').addEventListener('click', () => this.clearForms());
    document.getElementById('btnFavorite').addEventListener('click', () => this.saveAsFavorite());
    document.getElementById('btnSchedule').addEventListener('click', () => this.scheduleRecurringPost());

    // Image upload
    this.setupImageUpload();
  }

  setupImageUpload() {
    const uploadArea = document.getElementById('imageUploadArea');
    const fileInput = document.getElementById('imageUpload');
    const removeBtn = document.getElementById('removeImage');

    // Click to upload
    uploadArea.addEventListener('click', () => fileInput.click());

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '#3b82f6';
      uploadArea.style.background = '#334155';
    });

    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '#334155';
      uploadArea.style.background = '#1e293b';
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '#334155';
      uploadArea.style.background = '#1e293b';
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleImageUpload(files[0]);
      }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleImageUpload(e.target.files[0]);
      }
    });

    // Remove image
    removeBtn.addEventListener('click', () => this.removeImage());
  }

  handleImageUpload(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      this.showToast('Please select an image file', 'error');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      this.showToast('Image size must be less than 5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedImage = {
        file: file,
        dataUrl: e.target.result,
        base64: e.target.result.split(',')[1]
      };
      this.displayImagePreview();
    };
    reader.readAsDataURL(file);
  }

  displayImagePreview() {
    const uploadArea = document.getElementById('imageUploadArea');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImage');

    uploadArea.style.display = 'none';
    imagePreview.style.display = 'block';
    previewImg.src = this.uploadedImage.dataUrl;
  }

  removeImage() {
    this.uploadedImage = null;
    document.getElementById('imageUploadArea').style.display = 'block';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imageUpload').value = '';
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

    // Clear preview and analysis
    this.clearPreview();
    this.clearRiskAnalysis();
    this.clearWritingAdvice();
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

    if (previewContent) {
      this.displayPreview(previewContent);
      this.analyzeRisk(previewContent);
      this.generateWritingAdvice(previewContent);
    }
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

  // Copy to Clipboard with Telegram Formatting
  async copyToClipboard() {
    let content = '';
    
    switch (this.currentType) {
      case 'signal':
        content = this.generateSignalPreview();
        break;
      case 'analysis':
        content = this.generateAnalysisPreview();
        break;
      case 'education':
        content = this.generateEducationPreview();
        break;
    }

    if (!content) {
      this.showToast('Please generate a preview first', 'warning');
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      this.showToast('✅ Content copied to clipboard! Ready to paste in Telegram', 'success');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showToast('✅ Content copied to clipboard! Ready to paste in Telegram', 'success');
    }
  }

  // AI-Powered Risk Analysis
  analyzeRisk(content) {
    let riskScore = 0;
    let riskFactors = [];

    // Analyze content for risk indicators
    const text = content.toLowerCase();

    // High-risk indicators
    if (text.includes('guarantee') || text.includes('100%') || text.includes('sure thing')) {
      riskScore += 30;
      riskFactors.push({ factor: 'Promises/Guarantees', level: 'high', description: 'Avoid absolute promises or guarantees' });
    }

    if (text.includes('get rich') || text.includes('quick money') || text.includes('easy profit')) {
      riskScore += 25;
      riskFactors.push({ factor: 'Get Rich Quick', level: 'high', description: 'Avoid suggesting quick wealth accumulation' });
    }

    if (text.includes('no risk') || text.includes('risk-free') || text.includes('safe bet')) {
      riskScore += 25;
      riskFactors.push({ factor: 'Risk-Free Claims', level: 'high', description: 'Never claim trading is risk-free' });
    }

    // Medium-risk indicators
    if (text.includes('high leverage') || text.includes('100x') || text.includes('500x')) {
      riskScore += 20;
      riskFactors.push({ factor: 'High Leverage', level: 'medium', description: 'Be cautious with leverage recommendations' });
    }

    if (text.includes('all in') || text.includes('yolo') || text.includes('bet everything')) {
      riskScore += 20;
      riskFactors.push({ factor: 'All-In Mentality', level: 'medium', description: 'Discourage reckless position sizing' });
    }

    // Low-risk indicators
    if (text.includes('risk management') || text.includes('stop loss') || text.includes('position sizing')) {
      riskScore -= 10;
      riskFactors.push({ factor: 'Risk Management', level: 'low', description: 'Good: Includes risk management concepts' });
    }

    if (text.includes('educational') || text.includes('learning') || text.includes('study')) {
      riskScore -= 5;
      riskFactors.push({ factor: 'Educational Content', level: 'low', description: 'Good: Clearly educational in nature' });
    }

    // Ensure risk score is within bounds
    riskScore = Math.max(0, Math.min(100, riskScore));

    // Determine risk level
    let riskLevel = 'low';
    let riskColor = 'low';
    if (riskScore > 60) {
      riskLevel = 'high';
      riskColor = 'high';
    } else if (riskScore > 30) {
      riskLevel = 'medium';
      riskColor = 'medium';
    }

    this.displayRiskAnalysis(riskScore, riskLevel, riskColor, riskFactors);
  }

  displayRiskAnalysis(score, level, color, factors) {
    const riskContent = document.getElementById('riskContent');
    
    let factorsHtml = '';
    factors.forEach(factor => {
      factorsHtml += `
        <div class="risk-factor">
          <div class="icon ${factor.level}">${factor.level === 'high' ? '⚠️' : factor.level === 'medium' ? '⚡' : '✅'}</div>
          <div>
            <strong>${factor.factor}</strong>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${factor.description}</div>
          </div>
        </div>
      `;
    });

    riskContent.innerHTML = `
      <div class="risk-analysis">
        <div class="risk-score">
          <div class="score ${color}">${score}</div>
          <div>
            <div style="font-weight: 600; font-size: 1.1rem;">Risk Score</div>
            <div style="color: var(--text-muted);">${level.toUpperCase()} RISK</div>
          </div>
        </div>
        <div class="risk-factors">
          ${factorsHtml}
        </div>
      </div>
    `;
  }

  clearRiskAnalysis() {
    const riskContent = document.getElementById('riskContent');
    riskContent.innerHTML = `
      <div class="risk-placeholder">
        <i class="fas fa-chart-line"></i>
        <p>Generate preview to analyze risk level</p>
      </div>
    `;
  }

  // AI-Powered Writing Advice
  generateWritingAdvice(content) {
    const advice = [];

    // Content length analysis
    if (content.length < 100) {
      advice.push({
        title: 'Content Length',
        description: 'Consider adding more detail to make your analysis more comprehensive and valuable to readers.'
      });
    } else if (content.length > 500) {
      advice.push({
        title: 'Content Length',
        description: 'Your content is quite detailed. Consider breaking it into shorter, digestible sections for better engagement.'
      });
    }

    // Structure analysis
    if (!content.includes('📊') && !content.includes('📈') && !content.includes('📋')) {
      advice.push({
        title: 'Visual Structure',
        description: 'Great use of emojis and visual separators! This makes your content more engaging and easier to read.'
      });
    }

    // Risk disclaimer check
    if (!content.toLowerCase().includes('educational') && !content.toLowerCase().includes('not financial advice')) {
      advice.push({
        title: 'Risk Disclaimer',
        description: 'Always include a clear disclaimer that content is for educational purposes only, not financial advice.'
      });
    }

    // Professional tone
    if (content.toLowerCase().includes('awesome') || content.toLowerCase().includes('amazing') || content.toLowerCase().includes('incredible')) {
      advice.push({
        title: 'Professional Tone',
        description: 'Consider using more professional language. Words like "promising," "favorable," or "positive" maintain credibility.'
      });
    }

    // Technical analysis
    if (content.toLowerCase().includes('support') || content.toLowerCase().includes('resistance') || content.toLowerCase().includes('trend')) {
      advice.push({
        title: 'Technical Analysis',
        description: 'Excellent use of technical analysis terms. This adds credibility and helps traders understand your reasoning.'
      });
    }

    // Entry/exit clarity
    if (content.includes('Entry:') && content.includes('Stop Loss:')) {
      advice.push({
        title: 'Clear Entry/Exit',
        description: 'Perfect! Clear entry and exit points make your signal actionable and professional.'
      });
    }

    // If no specific advice, provide general tips
    if (advice.length === 0) {
      advice.push({
        title: 'Well Done!',
        description: 'Your content looks professional and well-structured. Keep up the great work!'
      });
    }

    this.displayWritingAdvice(advice);
  }

  displayWritingAdvice(advice) {
    const adviceContent = document.getElementById('adviceContent');
    
    let adviceHtml = '';
    advice.forEach(item => {
      adviceHtml += `
        <div class="advice-item">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `;
    });

    adviceContent.innerHTML = `
      <div class="writing-advice">
        ${adviceHtml}
      </div>
    `;
  }

  clearWritingAdvice() {
    const adviceContent = document.getElementById('adviceContent');
    adviceContent.innerHTML = `
      <div class="advice-placeholder">
        <i class="fas fa-pen-fancy"></i>
        <p>Get AI-powered writing suggestions</p>
      </div>
    `;
  }

  // Favorites Management
  saveAsFavorite() {
    let content = '';
    
    switch (this.currentType) {
      case 'signal':
        content = this.generateSignalPreview();
        break;
      case 'analysis':
        content = this.generateAnalysisPreview();
        break;
      case 'education':
        content = this.generateEducationPreview();
        break;
    }

    if (!content) {
      this.showToast('Please generate a preview first', 'warning');
      return;
    }

    const favorite = {
      id: Date.now(),
      type: this.currentType,
      content: content,
      timestamp: new Date().toISOString(),
      name: prompt('Give this favorite a name (e.g., "Daily EURUSD Signal"):') || 'Unnamed Favorite'
    };

    this.favorites.push(favorite);
    localStorage.setItem('forexFavorites', JSON.stringify(this.favorites));
    this.loadFavorites();
    this.showToast('✅ Saved to favorites!', 'success');
  }

  loadFavorites() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    if (!favoritesContainer) return;

    if (this.favorites.length === 0) {
      favoritesContainer.innerHTML = '<p class="no-favorites">No favorites saved yet. Create content and save it!</p>';
      return;
    }

    let favoritesHtml = '<h3>⭐ Your Favorites</h3>';
    this.favorites.forEach(fav => {
      favoritesHtml += `
        <div class="favorite-item">
          <div class="favorite-header">
            <span class="favorite-name">${fav.name}</span>
            <span class="favorite-type">${fav.type}</span>
            <span class="favorite-date">${new Date(fav.timestamp).toLocaleDateString()}</span>
          </div>
          <div class="favorite-content">${fav.content.substring(0, 100)}...</div>
          <div class="favorite-actions">
            <button onclick="contentCreator.loadFavorite(${fav.id})" class="btn-small">Load</button>
            <button onclick="contentCreator.copyFavorite(${fav.id})" class="btn-small">Copy</button>
            <button onclick="contentCreator.deleteFavorite(${fav.id})" class="btn-small btn-danger">Delete</button>
          </div>
        </div>
      `;
    });

    favoritesContainer.innerHTML = favoritesHtml;
  }

  loadFavorite(id) {
    const favorite = this.favorites.find(f => f.id === id);
    if (!favorite) return;

    // Switch to the correct content type
    this.switchContentType(favorite.type);
    
    // Load the content into the form
    // This would need to be implemented based on your form structure
    this.showToast('✅ Favorite loaded!', 'success');
  }

  copyFavorite(id) {
    const favorite = this.favorites.find(f => f.id === id);
    if (!favorite) return;

    navigator.clipboard.writeText(favorite.content);
    this.showToast('✅ Favorite copied to clipboard!', 'success');
  }

  deleteFavorite(id) {
    if (confirm('Are you sure you want to delete this favorite?')) {
      this.favorites = this.favorites.filter(f => f.id !== id);
      localStorage.setItem('forexFavorites', JSON.stringify(this.favorites));
      this.loadFavorites();
      this.showToast('✅ Favorite deleted!', 'success');
    }
  }

  // Recurring Posts Management
  scheduleRecurringPost() {
    let content = '';
    
    switch (this.currentType) {
      case 'signal':
        content = this.generateSignalPreview();
        break;
      case 'analysis':
        content = this.generateAnalysisPreview();
        break;
      case 'education':
        content = this.generateEducationPreview();
        break;
    }

    if (!content) {
      this.showToast('Please generate a preview first', 'warning');
      return;
    }

    const schedule = {
      id: Date.now(),
      type: this.currentType,
      content: content,
      name: prompt('Give this scheduled post a name:') || 'Scheduled Post',
      frequency: prompt('Frequency (daily/weekly/monthly):') || 'daily',
      time: prompt('Time (HH:MM, 24h format):') || '09:00',
      active: true
    };

    this.recurringPosts.push(schedule);
    localStorage.setItem('forexRecurringPosts', JSON.stringify(this.recurringPosts));
    this.loadRecurringPosts();
    this.showToast('✅ Post scheduled!', 'success');
  }

  loadRecurringPosts() {
    const recurringContainer = document.getElementById('recurringContainer');
    if (!recurringContainer) return;

    if (this.recurringPosts.length === 0) {
      recurringContainer.innerHTML = '<p class="no-recurring">No recurring posts scheduled yet.</p>';
      return;
    }

    let recurringHtml = '<h3>🕐 Scheduled Posts</h3>';
    this.recurringPosts.forEach(post => {
      recurringHtml += `
        <div class="recurring-item">
          <div class="recurring-header">
            <span class="recurring-name">${post.name}</span>
            <span class="recurring-frequency">${post.frequency}</span>
            <span class="recurring-time">${post.time}</span>
          </div>
          <div class="recurring-content">${post.content.substring(0, 100)}...</div>
          <div class="recurring-actions">
            <button onclick="contentCreator.toggleRecurring(${post.id})" class="btn-small ${post.active ? 'btn-success' : 'btn-secondary'}">
              ${post.active ? 'Active' : 'Inactive'}
            </button>
            <button onclick="contentCreator.editRecurring(${post.id})" class="btn-small">Edit</button>
            <button onclick="contentCreator.deleteRecurring(${post.id})" class="btn-small btn-danger">Delete</button>
          </div>
        </div>
      `;
    });

    recurringContainer.innerHTML = recurringHtml;
  }

  toggleRecurring(id) {
    const post = this.recurringPosts.find(p => p.id === id);
    if (post) {
      post.active = !post.active;
      localStorage.setItem('forexRecurringPosts', JSON.stringify(this.recurringPosts));
      this.loadRecurringPosts();
      this.showToast(`✅ Post ${post.active ? 'activated' : 'deactivated'}!`, 'success');
    }
  }

  editRecurring(id) {
    const post = this.recurringPosts.find(p => p.id === id);
    if (!post) return;

    post.name = prompt('New name:', post.name) || post.name;
    post.frequency = prompt('New frequency (daily/weekly/monthly):', post.frequency) || post.frequency;
    post.time = prompt('New time (HH:MM):', post.time) || post.time;

    localStorage.setItem('forexRecurringPosts', JSON.stringify(this.recurringPosts));
    this.loadRecurringPosts();
    this.showToast('✅ Post updated!', 'success');
  }

  deleteRecurring(id) {
    if (confirm('Are you sure you want to delete this scheduled post?')) {
      this.recurringPosts = this.recurringPosts.filter(p => p.id !== id);
      localStorage.setItem('forexRecurringPosts', JSON.stringify(this.recurringPosts));
      this.loadRecurringPosts();
      this.showToast('✅ Scheduled post deleted!', 'success');
    }
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
      
      // Prepare payload with image if available
      const payload = {
        message: message
      };

      if (this.uploadedImage) {
        payload.image = this.uploadedImage.base64;
        payload.imageName = this.uploadedImage.file.name;
        payload.imageType = this.uploadedImage.file.type;
      }

      console.log('Sending payload:', payload);

      const response = await fetch(this.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
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

    // Clear image
    this.removeImage();

    // Clear preview and analysis
    this.clearPreview();
    this.clearRiskAnalysis();
    this.clearWritingAdvice();

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
let contentCreator;
document.addEventListener('DOMContentLoaded', () => {
  contentCreator = new ContentCreator();
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
