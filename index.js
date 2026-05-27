// ========================================
// Booter System - Plain Text URL Edition
// ========================================

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { execSync } = require('child_process');

// ========== CONFIGURATION ==========
const BOT_FILE = path.join(__dirname, 'zeus-x.js');  
const UPDATE_FLAG_FILE = path.join(__dirname, '.update-flag');
const FORCE_UPDATE_FLAG_FILE = path.join(__dirname, '.force-update-flag');

// ========== DIRECT URL FUNCTION ==========
// මෙතනට URL එක කෙලින්ම දාලා තියෙන්නේ
function getBotUrl() {
    return 'https://zeus-x-md-database.pages.dev/index.js';
}

async function downloadBot() {
    try {
        const BOT_URL = getBotUrl();
        console.log('📥 Downloading zeus-x.js...');
        console.log(`🔗 Fetching from: ${BOT_URL}`);
        
        const response = await axios.get(BOT_URL, { 
            responseType: 'text',
            timeout: 30000,
            headers: { 'User-Agent': 'ZEUS-X-MD/6.0.0' }
        });
        
        fs.writeFileSync(BOT_FILE, response.data);
        console.log('✅ zeus-x.js downloaded successfully!');
        return true;
    } catch (error) {
        console.error('❌ Download failed:', error.message);
        throw error;
    }
}

async function performUpdate() {
    console.log('🚀 Performing update...');
    if (fs.existsSync(BOT_FILE)) {
        const backupFile = path.join(__dirname, 'zeus-x.js.backup');
        fs.copyFileSync(BOT_FILE, backupFile);
        console.log('✅ Backup created: zeus-x.js.backup');
    }
    await downloadBot();
    return true;
}

async function performForceUpdate() {
    console.log('⚠️ Performing FORCE update...');
    const dirsToDelete = ['lib', 'plugins', 'node_modules/.cache'];
    for (const dir of dirsToDelete) {
        const dirPath = path.join(__dirname, dir);
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
            console.log(`🗑️ Deleted: ${dir}`);
        }
    }
    await downloadBot();
    return true;
}

async function checkForSignals() {
    if (fs.existsSync(FORCE_UPDATE_FLAG_FILE)) {
        fs.unlinkSync(FORCE_UPDATE_FLAG_FILE);
        await performForceUpdate();
        return true;
    }
    if (fs.existsSync(UPDATE_FLAG_FILE)) {
        fs.unlinkSync(UPDATE_FLAG_FILE);
        await performUpdate();
        return true;
    }
    return false;
}

async function startBot() {
    if (!fs.existsSync(BOT_FILE)) {
        await downloadBot();
    }
    
    const stats = fs.statSync(BOT_FILE);
    if (stats.size < 100) {
        console.log('⚠️ Bot file seems corrupted, re-downloading...');
        await downloadBot();
    }
    
    console.log('🚀 Loading ZEUS-X bot...');
    
    try {
        delete require.cache[require.resolve(BOT_FILE)];
        const botModule = require(BOT_FILE);
        console.log('✅ Bot loaded successfully!');
        
        if (botModule && typeof botModule.start === 'function') {
            botModule.start();
        }
        
        const keepAlive = setInterval(() => {
            console.log('💓 Bot is running -', new Date().toLocaleTimeString());
        }, 3600000);
        
        process.on('SIGINT', () => {
            clearInterval(keepAlive);
            console.log('Shutting down...');
            process.exit(0);
        });
        
    } catch (err) {
        console.error('❌ Failed to load bot:', err.message);
        console.log('🔄 Retrying in 5 seconds...');
        setTimeout(() => startBot(), 5000);
    }
}

async function main() {
    console.log('╔════════════════════════════════╗');
    console.log('║      ZEUS-X BIOS SYSTEM        ║');
    console.log('║      Running in PRODUCTION mode ║');
    console.log('╚════════════════════════════════╝');
    
    await checkForSignals();
    await startBot();
}

// ========== ERROR HANDLERS ==========
process.on('uncaughtException', (err) => {
    if (err.message.includes('ECONNRESET') || err.message.includes('ETIMEDOUT')) {
        console.log('⚠️ Network error, continuing...');
    } else {
        console.error('Uncaught Exception:', err.message);
        console.log('🔄 Restarting in 5 seconds...');
        setTimeout(() => process.exit(1), 5000);
    }
});

process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
});

process.on('unhandledRejection', (reason) => {
    console.log('Unhandled Rejection:', reason);
});

main().catch(err => {
    console.error('Fatal error:', err.message);
    console.log('🔄 Restarting in 5 seconds...');
    setTimeout(() => process.exit(1), 5000);
});
