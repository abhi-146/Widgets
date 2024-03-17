
var mjFiles = document.querySelectorAll(".mj-files");

var commonStyleFiles = `
.mjwi-fls-file-previews {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
}

.mjwi-fls-file-preview {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

.mjwi-fls-file-preview img {
    max-width: 100px;
    max-height: 100px;
}
.mjwi-fls-file-preview span {
    word-wrap: break-word

}
`;

var styleElementFiles = document.createElement('style');
styleElementFiles.innerHTML = commonStyleFiles;
document.head.appendChild(styleElementFiles);

async function prepareFilesWidget(fileWidget) {
    var parentWidget = fileWidget.closest('.mj-widget');

    // Get widget data
    var widgetId = "";
    let data = JSON.parse(parentWidget.getAttribute("data-widget"));
    if (!data) {
        widgetId = parentWidget.attributes.id.value
        data = mjWidgetsData[widgetId];
    }


    let serveData = data.widgetData.serveData;
    let htmlData = data.widgetData.htmlData;

    let filesData = htmlData.files;
    let filesHtml = "<h1>Files:</h1>";

    let displayFiles = [];
    let docs = filesData.docs;
    if (docs && docs.length > 0 && widgetId) {

        const existingWidgets = JSON.parse(localStorage.getItem('widgetPasswords')) || [];
        const widgetObj = existingWidgets.find(widget => widget.id === widgetId);

        const headers = [
            ['password', widgetObj.password]
        ];
        displayFiles = await fetchData('http://localhost:3001/widget/file/all/' + widgetId, headers)
    }

    filesHtml += `<div class="mjwi-fls-file-previews"></div>`;
    displayFiles && displayFiles.map((file, index) => {
        filesHtml += `<div key=${index} class="mjwi-fls-file-preview">
                ${this.renderFileThumbnail(file)}
                <span>${file.displayName}</span>
            </div>`
    })
    filesHtml += `</div>`;



    if (widgetId != "mjwi-preview") {
        document.getElementById(widgetId).querySelector(".mj-files").innerHTML = filesHtml;
    } else {
        document.querySelector(".mj-files").innerHTML = filesHtml;
    }


}
async function processFilesWidgets() {
    for (let index = 0; index < mjFiles.length; index++) {
        await prepareFilesWidget(mjFiles[index]);
    }
}
window[prepareFilesWidget] = prepareFilesWidget;
processFilesWidgets();

// Other functions or event handlers
function fetchData(url, headers) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        if (headers && Array.isArray(headers)) {
            headers.forEach(header => {
                const [key, value] = header;
                xhr.setRequestHeader(key, value);
            });
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const responseData = JSON.parse(xhr.responseText);
                    resolve(responseData);
                } else {
                    reject(new Error('Error fetching data:', xhr.statusText));
                }
            }
        };
        xhr.onerror = function () {
            reject(new Error('Request failed'));
        };
        xhr.send();
    });
}

renderFileThumbnail = (file) => {

    let { name, thumbnailUrl } = file;
    const fileExtension = name.split('.').pop().toLowerCase();
    if (!thumbnailUrl) {
        switch (fileExtension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                thumbnailUrl = URL.createObjectURL(file);
                break;
            case 'pdf':
                thumbnailUrl = serverUrl + '/uploads/thumbnails/pdf-thumbnail.png';
                break;
            case 'mp3':
                thumbnailUrl = serverUrl + '/uploads/thumbnails/audio-thumbnail.png';
                break;
            case 'mp4':
                thumbnailUrl = serverUrl + '/uploads/thumbnails/video-thumbnail.png';
                break;
            default:
                thumbnailUrl = serverUrl + '/uploads/thumbnails/file-thumbnail.png';
                break;
        }

    } else {
        thumbnailUrl = decodeURIComponent(thumbnailUrl)
    }

    return `<img src=${thumbnailUrl} alt="Image Preview" />`;
};

handleFilePreview = (file) => {
    let { name, url } = file;

    if (!thumbnailUrl) {
        thumbnailUrl = URL.createObjectURL(file);
    } else {
        thumbnailUrl = decodeURIComponent(thumbnailUrl)
    }

    switch (fileExtension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return `<img src=${url} alt="Image Preview" />`;
        case 'pdf':
            return `<iframe src=${`https://documentcloud.adobe.com/viewer?url=${encodeURIComponent(url)}&embedded=true`} width="100%" height="600px"></iframe>`;
        case 'mp3':
            return `<audio controls><source src=${url} type="audio/mp3" /></audio>`;
        case 'mp4':
            return `<video controls width="320" height="240"><source src=${url} type="video/mp4" /></video>`;
        default:
            return `<p>Unsupported file type</p>`;
    }
};

