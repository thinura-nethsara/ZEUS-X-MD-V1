const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== MULTI-SESSION =====
    APP_ID: process.env.APP_ID || "1",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://Angle:99999978666@cluster0.ynt3dwp.mongodb.net/",

    // ===== BOT SETTINGS =====
    SESSION_ID: process.env.SESSION_ID || '',
    OWNER_NUMBER: process.env.OWNER_NUMBER || '947XXXXXXXXX',
    PREFIX: process.env.PREFIX || '.',
    NAME: process.env.NAME || 'ZEUS-X-MD',
    WORK_TYPE: process.env.WORK_TYPE || 'public',
    FOOTER: process.env.FOOTER || 'ZEUS-X-MD',
    SUDO: process.env.SUDO || '',
    
    // ===== SECURITY =====
    ANTI_DELETE: process.env.ANTI_DELETE || 'true',
    ANTI_LINK: process.env.ANTI_LINK || 'true',
    ANTI_BAD: process.env.ANTI_BAD || 'true',
    ANTI_BOT: process.env.ANTI_BOT || 'false',
    ANTI_CALL: process.env.ANTI_CALL || 'false',
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'false',
    
    // ===== AUTO FEATURES =====
    AUTO_REACT: process.env.AUTO_REACT || 'true',
    AUTO_MSG_READ: process.env.AUTO_MSG_READ || 'true',
    AUTO_TYPING: process.env.AUTO_TYPING || 'false',
    AUTO_RECORDING: process.env.AUTO_RECORDING || 'false',
    ALLWAYS_OFFLINE: process.env.ALLWAYS_OFFLINE || 'false',
    CMD_ONLY_READ: process.env.CMD_ONLY_READ || 'false',
    
    // ===== DATABASE =====
    DB_NAME: process.env.DB_NAME || 'zeus',
    LANG: process.env.LANG || 'SI',
    
    // ===== OTHER =====
    JID_BLOCK: process.env.JID_BLOCK || '',
    MAX_SIZE: process.env.MAX_SIZE || '100',
    ACTION: process.env.ACTION || 'delete',
    ANTILINK_ACTION: process.env.ANTILINK_ACTION || 'delete',
    VALUSE: process.env.VALUSE ? process.env.VALUSE.split(',') : [],
};
