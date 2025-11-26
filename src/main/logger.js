/**
 * Sistema de logging em arquivo para capturar erros mesmo quando o app fecha imediatamente
 * Este módulo deve ser carregado ANTES de qualquer outro código que possa falhar
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Diretório de logs
const LOG_DIR = path.join(os.homedir(), 'AppData', 'Local', 'Y20Booster', 'logs');
const LOG_FILE = path.join(LOG_DIR, `y20booster-${new Date().toISOString().split('T')[0]}.log`);

// Garantir que o diretório existe
try {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
} catch (error) {
  // Se não conseguir criar o diretório, usar temp
  console.error('[Logger] Erro ao criar diretório de logs:', error.message);
}

// Função para escrever no arquivo de log
function writeToFile(level, message, ...args) {
  try {
    const timestamp = new Date().toISOString();
    const formattedMessage = args.length > 0 
      ? `${message} ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ')}`
      : message;
    
    const logEntry = `[${timestamp}] [${level}] ${formattedMessage}\n`;
    
    // Escrever de forma síncrona para garantir que seja salvo mesmo se o processo crashar
    fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
  } catch (error) {
    // Se não conseguir escrever no arquivo, pelo menos tentar no console
    console.error('[Logger] Erro ao escrever no arquivo de log:', error.message);
  }
}

// Interceptar console.log, console.error, etc ANTES de qualquer outro código
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleInfo = console.info;

console.log = function(...args) {
  writeToFile('LOG', ...args);
  originalConsoleLog.apply(console, args);
};

console.error = function(...args) {
  writeToFile('ERROR', ...args);
  originalConsoleError.apply(console, args);
};

console.warn = function(...args) {
  writeToFile('WARN', ...args);
  originalConsoleWarn.apply(console, args);
};

console.info = function(...args) {
  writeToFile('INFO', ...args);
  originalConsoleInfo.apply(console, args);
};

// Capturar erros não tratados
process.on('uncaughtException', (error) => {
  writeToFile('FATAL', 'Uncaught Exception:', error.message, error.stack);
  originalConsoleError('[FATAL] Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  writeToFile('FATAL', 'Unhandled Rejection:', reason, promise);
  originalConsoleError('[FATAL] Unhandled Rejection:', reason);
});

// Log inicial
writeToFile('INFO', '=== Y20 BOOSTER Iniciado ===');
writeToFile('INFO', `Versão do Node: ${process.version}`);
writeToFile('INFO', `Sistema Operacional: ${os.platform()} ${os.release()}`);
writeToFile('INFO', `Arquitetura: ${os.arch()}`);
writeToFile('INFO', `Diretório de logs: ${LOG_DIR}`);

module.exports = {
  LOG_DIR,
  LOG_FILE,
  writeToFile
};

