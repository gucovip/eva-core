const electron = require('electron')
const {BrowserWindow} = electron

const path = require('path')
const url = require('url')

function createMainWindow () {
  return new BrowserWindow({
    x: 0, y: 0, width: 0, height: 0, show: false, focusable: false, frame: false,
    titleBarStyle: 'customButtonsOnHover',
    transparent: true
  })
}

function createEvaWindow (width = 500, height = 60) {
  // Create the browser window.
  const x = (electron.screen.getPrimaryDisplay().workAreaSize.width / 2 - 250).toFixed(0)
  const y = 90

  const evaWindow = new BrowserWindow({
    alwaysOnTop: true,
    x: +x,
    y: +y,
    width,
    height,
    frame: false,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    backgroundColor: '#232323',
    show: false,
    webPreferences: {
      devTools: true,
      nodeIntegrationInWorker: true
    }
    // parent: mainWindow
  })

  // 全屏代码
  if (process.platform === 'darwin') electron.app.dock.hide()
  evaWindow.setAlwaysOnTop(true, "floating")
  evaWindow.setVisibleOnAllWorkspaces(true)
  evaWindow.setFullScreenable(false)

// and load the index.html of the app.
  evaWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/main.html'),
    protocol: 'file:',
    slashes: true
  }))

  return evaWindow
}

module.exports = {
  createMainWindow,
  createEvaWindow
}
