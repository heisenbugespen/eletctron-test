import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const MT166 = require('mt166-js');

const isProd = process.env.NODE_ENV === 'production';
const dispenser = new MT166({ port: 3, debug: true }); // COM4

const test = (e, type) => {
  console.log(type);
  if (type === 'ping') {
    dispenser.ping();
    return 'Dispenser Pinged';
  } else if (type === 'dispense') {
    dispenser.checkStock();
    return 'Dispenser Checked';
  } else {
    return 'No action';
  }
};

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();
  ipcMain.handle('test', test);

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
