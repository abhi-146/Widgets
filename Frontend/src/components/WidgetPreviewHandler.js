import apiInstance from "./apiInstance";
import store from "../state/store"
const handlePreviewHTML = async (widget, password) => {
    console.log(widget)
    var scriptId = ""; 
    var data = {
        error: '',
        fieldErrors: '',
        serveData: {},
        previewHtml: ''
    }
    const { widgetTypes } = store.getState();

    let type = '';
    for(const item of widgetTypes) {
        if (item.id === widget.widgetType) {
            type = item.name;
            break; 
        }
    }


    if (type == "appfolio") {
        if (!widget.htmlData.appfolio.appfolioUrl) {
            data.error= "Empty url";
            return data;
        }
        scriptId = 'mjwi-apfl-script';
    }

    if (type == "threadsFeeds") {
        if (!widget.htmlData.threadsFeeds.threadsUrl) {
            data.error= "Empty url";
            return data;
        }
        scriptId = 'mjwi-feeds-script';
    }


    var request_body = { widget };

    return apiInstance.post('/widget/preview/', request_body, {
        headers: {
            "password": password
        }
    })
    .then(response => {

        let resData = response.data.data;
        let script = resData.script;

        data.previewHtml = `<div class='mj-${type}'>Loading...</div>`;
        // Return serveData : data.serveData
        if (type == "threadsFeeds") {
            data.serveData = resData.serveData;
        }

        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.parentNode.removeChild(existingScript);
        }

        if (script) {
            const scriptElement = document.createElement('script');
            scriptElement.type = 'text/javascript';
            scriptElement.src = script;
            scriptElement.id = scriptId;
            document.head.appendChild(scriptElement);
        }
        return data;
    })
    .catch(error => {
        console.log(error)
        data.error = error;
        return data;
    });

};

export default handlePreviewHTML;
