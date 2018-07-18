// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const {ipcRenderer} = require('electron')
const remote = require('electron').remote
const dialog = require('electron').remote.dialog
const fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
var file_data = "";


ipcRenderer.on('open_file', (event, arg) => {

    dialog.showOpenDialog((fileNames) => {
        // fileNames is an array that contains all the selected
        if (fileNames === undefined) {
            console.log("No file selected");
            return;
        }

        var fileName = fileNames[0];

        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                dialog.showErrorBox("File Save Error", err.message);
                return;
            }

            file_data = data;

            $chromeTabs._.addTab({
                title: fileName,
                url: './new_tab.html'
            });
        });
    });


    setTimeout(function () {
        var y = document.getElementsByClassName("-view -current");
        if (y != null) {

            var beautify = require('js-beautify').js_beautify,
                fs = require('fs');
            console.log(beautify(file_data, {indent_size: 4}));
            y["0"].contentDocument.all["main-text"].value = beautify(file_data, {indent_size: 4});
            beautify(y["0"].contentDocument.all["main-text"].value, {
                indent_size: 4
            });
            //console.log(y["0"].contentDocument.all["main-text"].value);
        }
        else {
            alert("nooot");
        }

    }, 4000);

});

ipcRenderer.on('create_file', (event, arg) => {
    create_file2()
});

ipcRenderer.on('save_file', (event, arg) => {
    save_file2();
});


function open_file() {
    dialog.showOpenDialog((fileNames) => {
        // fileNames is an array that contains all the selected
        if (fileNames === undefined) {
            console.log("No file selected");
            return;
        }
        var fileName = fileNames[0];


        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                dialog.showErrorBox("File Save Error", err.message);
                return;
            }
            document.getElementById("open_file_path").value = fileName;

            alert("The file has been succesfully opened" + document.getElementById("open_file_path").value);
            // Change how to handle the file content
            document.getElementById("main-text").value = data;
        });
    });

}

function create_file() {
    dialog.showSaveDialog(function (fileName) {

        if (fileName === undefined) {
            console.log("No file name entered");
            return;
        }

        fs.writeFile(fileName, "", function (err) {
            if (err) {
                dialog.showErrorBox("File Save Error", err.message);
                return;
            }
            document.getElementById("open_file_path").value = fileName;
            alert("The file has been succesfully saved" + document.getElementById("open_file_path").value);

        });

    });

    document.getElementById("main-text").value = ""
}

function save_file() {
    var filepath = document.getElementById("open_file_path").value
    if (!filepath) {
        alert("no opened file to update");
        console.log(err);
        return;
    }
    var content = document.getElementById("main-text").value

    fs.writeFile(filepath, content, (err) => {
        if (err) {
            alert("An error ocurred updating the file" + err.message);
            console.log(err);
            return;
        }

        alert("The file has been succesfully saved");
    });

}

function open_tab2() {
    const {BrowserWindow} = require('electron').remote
    let win = new BrowserWindow({width: 800, height: 600})
    win.on('closed', () => {
        win = null
    })
    win.loadURL('./new_tab.html')

}

function open_tab() {

    //var iFrameDOM = $("iframe.-view -current").contents();


}

function save_file2() {


    //var content = document.getElementById("tab_file_path").value
    //element = document.getElementById("tab_file_path").;

    var iFrameDOM = $("iframe.-view -current").contents();

    //.prevObject.prevObject.prevObject["0"].all[6].innerText
    //var x = iFrameDOM.find("#tab_file_path");
    var y = document.getElementsByClassName("-view -current");
    //console.log(y);

    /*$('.-view -current').find('div').each(function(){
     $('#sums_area').append('<h2>' + $(this).find('dd').text() + '</h2>');
     });

     element = document.querySelectorAll("main-text");

     element = document.getElementById("tab_file_path");*/
    if (y != null) {
        //console.log(y);
        //console.log(y["0"].contentDocument.all[4].innerHTML);

        var filepath = y["0"].contentDocument.all[4].innerHTML;

        if (!filepath) {
            alert("no opened file to update");
            console.log(err);
            return;
        }
        var content = y["0"].contentDocument.all["main-text"].value;

        fs.writeFile(filepath, content, (err) => {
            if (err) {
                alert("An error ocurred updating the file" + err.message);
                console.log(err);
                return;
            }

            alert("The file has been succesfully saved");
        });

        //alert(file_data);
        console.log(y["0"].contentDocument.all["main-text"].value);
    }
    else {
        alert("nooot");
    }

    /*$.get('new_tab.html', null, function(text){
     alert(document.getElementById("tab_file_path").value);
     });*/
}


function create_file2() {
    dialog.showSaveDialog(function (fileName) {

        if (fileName === undefined) {
            console.log("No file name entered");
            return;
        }

        fs.writeFile(fileName, "", function (err) {
            if (err) {
                dialog.showErrorBox("File Save Error", err.message);
                return;
            }
            alert("The file has been succesfully created");

        });

        $('.chrome-tabs').chromeTabs(settings).each((i, obj) => {
            let $chromeTabs = $(obj); // jQuery & class.
            $chromeTabs._ = $chromeTabs.data('chromeTabs');
            let $tabs = $chromeTabs._.addTabs([
                {
                    title: fileName,
                    favicon: 'https://duckduckgo.com/favicon.ico',
                    url: './new_tab.html?data=' + "" + "&file_name=" + fileName
                }
            ]);

            //document.getElementById("open_file_path").innerHTML = fileName;
            //$('#open_file_path').text(fileName);

        })

    });

}