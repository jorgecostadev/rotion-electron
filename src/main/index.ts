import path, { join } from 'node:path';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { registerRoute, settings } from '../lib/electron-router-dom';

const APP_ICON = resolveAssetPath('icon.png');

function resolveAssetPath(filename: string) {
  if (is.dev) {
    return path.resolve(process.cwd(), 'resources', filename);
  } else {
    return path.join(__dirname, filename);
  }
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    autoHideMenuBar: true,
    backgroundColor: '#17141f',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 20, y: 20 },
    show: false,
    ...(process.platform === 'linux' ? { icon: APP_ICON } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  try {
    registerRoute({
      id: 'main',
      browserWindow: mainWindow,
      htmlFile: join(__dirname, '../renderer/index.html'),
    });
  } catch (err) {
    console.warn('registerRoute warning:', err);
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    const baseUrl = process.env.ELECTRON_RENDERER_URL.replace(/\/$/, '');
    const urlToLoad = `${baseUrl}/main/`;
    settings.devServerUrl = urlToLoad;
    mainWindow.loadURL(urlToLoad);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

if (process.platform === 'darwin' && app.dock) {
  app.dock.setIcon(path.resolve(__dirname, APP_ICON));
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
