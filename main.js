// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, MenuItem} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    const menu = new Menu();

    menu.append(new MenuItem({
        label: 'Reload', click() {
            mainWindow.reload();
        }
    }));

    menu.append(new MenuItem({type: 'separator'}));
    menu.append(new MenuItem({
        label: 'File',
        submenu: [
            {
                label: 'Open File', accelerator: 'Ctrl+o', click() {
                mainWindow.webContents.send('open_file');
            }
            },
            {
                label: 'Open Folder', accelerator: 'Ctrl+Shift+o', click() {
                mainWindow.webContents.send('openFolder');
            }
            },
            {
                label: 'Create File', accelerator: 'Ctrl+n', click() {
                mainWindow.webContents.send('create_file');
            }
            },
            {
                label: 'Save File', accelerator: 'Ctrl+s', click() {
                mainWindow.webContents.send('save_file')
				}
            }
        ]
    }))

    menu.append(new MenuItem({type: 'separator'}));
    menu.append(new MenuItem({
		label: 'Run',
        submenu: [
			{
				label: 'Debug', accelerator: 'F5', click() {
					console.log("deeeebug");
					mainWindow.webContents.send('debug');
				}
			},
			{
				label: 'Compile', accelerator: 'F9', click() {
					mainWindow.webContents.send('compile');
				}
			}
        ]
		
		
    }));


    menu.append(new MenuItem({
        label: 'Templates',
        submenu: [
            {
                label: 'Create API template', accelerator: 'Shift+A', click() {
                mainWindow.webContents.send('createApiTemplate')
            }
            },
            {
                label: 'Create Step Template', accelerator: 'Shift+S', click() {
                mainWindow.webContents.send('createStepTemplate')
            }
            }
        ]
    }))

    Menu.setApplicationMenu(menu)

    mainWindow.webContents.openDevTools();

// and load the index.html of the app.
    mainWindow.loadFile('templates/main.html')

// Open the DevTools.
// mainWindow.webContents.openDevTools()


// Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    require('remote').getCurrentWindow().toggleDevTools();

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


