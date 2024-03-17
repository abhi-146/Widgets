window.onload = function () {
    // localStorage.removeItem('widgetPasswords')
    // let a = []
    // a.push({ id: '65debfebef08c5b994b07092', password: "a" });
    // localStorage.setItem('widgetPasswords', JSON.stringify(a));

    window.serverUrl = 'http://localhost:3001/';

    // Append style
    var styleElement = document.createElement("style");

    styleElement.innerHTML = `
        .mjwi-password-popup {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 25%;
            text-align: center;
        }

        .mjwi-password-input {
            padding: 10px;
            margin-bottom: 10px;
            width: 100%;
            box-sizing: border-box;
        }

        .mjwi-submit-button {
            padding: 10px;
            background-color: #4caf50;
            color: #ffffff;
            border: none;
            cursor: pointer;
        }

        .mjwi-submit-button:hover {
            background-color: #45a049;
        }
        .mjwi-err {
            color: red;
        }
    `;

    document.head.appendChild(styleElement);

    async function isWidgetPublished(widgetId) {
        return new Promise((resolve, reject) => {

            var xhr = new XMLHttpRequest();
            xhr.open("POST", serverUrl + "widget/publishStatus/" + widgetId, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let responseData = JSON.parse(xhr.responseText);
                        if(responseData.publish) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };

            xhr.onerror = function () {
                console.error("Network error occurred");
                reject(false)
            };

            xhr.send();

        });
    }

    async function isWidgetLocked(widgetId, password) {
        return new Promise((resolve, reject) => {

            var xhr = new XMLHttpRequest();
            xhr.open("POST", serverUrl + "widget/validate/" + widgetId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("password", password);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(false);
                    } else if (xhr.status === 403) {
                        resolve(true);
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };

            xhr.onerror = function () {
                console.error("Network error occurred");
                reject(false)
            };

            xhr.send();

        });
    }

    async function fetchData(widget) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const widgetId = widget.id;
            xhr.open('GET', `http://localhost:3001/widget/serve/${widgetId}`, true);

            const existingWidgets = JSON.parse(localStorage.getItem('widgetPasswords')) || [];

            const widgetObj = existingWidgets.find(widget => widget.id === widgetId);

            xhr.setRequestHeader('password', widgetObj.password);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const responseData = JSON.parse(xhr.responseText);
                        resolve(responseData);
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };

            xhr.onerror = function () {
                reject('Request failed');
            };

            xhr.send();
        });
    }

    async function loadWidget(widget) {

        var widgetId = widget.attributes.id.value;

        const existingWidgets = JSON.parse(localStorage.getItem('widgetPasswords')) || [];

        const widgetObj = existingWidgets.find(widget => widget.id === widgetId);

        if (widgetObj && widgetObj.password) {
            const responseData = await fetchData(widget);

            const data = responseData.data;

            // Store widget data in global scope
            mjWidgetsData[widgetId] = data;

            // Set html
            widget.innerHTML = `<div class="mj-${data.widgetData.widgetType.name}">Loading...</div>`;

        } else {

            widget.innerHTML = `<div id="mjwi-password-popup" class="mjwi-password-popup" widget-id="${widgetId}">
                <input type="password" id="mjwi-password-input" class="mjwi-password-input" placeholder="Enter Password">
                <button id="mjwi-submit-button" class="mjwi-submit-button">Submit</button>
                <div class="mjwi-err"></div>
            </div>`;
            addPasswordEventListener(widget);
        }
    }

    function isScriptLoaded(scriptId) {
        return document.getElementById(scriptId) !== null;
    }

    function loadScript(scriptUrl, scriptId) {

        if (!isScriptLoaded(scriptId)) {
            var script = document.createElement('script');
            script.src = scriptUrl;
            script.id = scriptId;
            document.head.appendChild(script);
        }
    }

    async function prepareWidgets() {
        try {

            // Load widgets
            for (const widget of mjWidgets) {

                let widgetPublished = await isWidgetPublished(widget.id);

                if(widgetPublished) {
                    // Validate widget
                    let existingWidgets = JSON.parse(localStorage.getItem('widgetPasswords')) || [];
                    const index = existingWidgets.findIndex(elem => elem.id === widget.id);

                    let password = "";
                    if (index !== -1) {

                        password = existingWidgets[index].password
                        let isLocked = await isWidgetLocked(widget.id, password)
                        existingWidgets[index].password = isLocked ? false : password;
                        
                    } else {
                        password = "";
                        let isLocked = await isWidgetLocked(widget.id, password)
                        existingWidgets.push({ id: widget.id, password: isLocked ? false : true });
                    }
                    localStorage.setItem('widgetPasswords', JSON.stringify(existingWidgets));

                    await loadWidget(widget);
                } else {
                    widget.innerHTML = `<div>Please publish the widget to load the content</div>`;
                }
            }

            // Load scripts
            for (var key in mjWidgetsData) {
                loadScript(mjWidgetsData[key].script, `mjwi-script-${mjWidgetsData[key].widgetData.widgetType.name}`);
            };

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function addPasswordEventListener(widget) {
        const widgetId = widget.id;

        var passwordPopup = document.getElementById(widget.id).querySelector("#mjwi-password-popup");
        var passwordInput = document.getElementById(widget.id).querySelector("#mjwi-password-input");
        var submitButton = document.getElementById(widget.id).querySelector("#mjwi-submit-button");

        submitButton.addEventListener("click", function (event) {
            event.preventDefault();

            var password = passwordInput.value;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", serverUrl + "widget/validate/" + widgetId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("password", password);


            xhr.onload = async function () {
                if (xhr.status === 200) {

                    let existingWidgets = JSON.parse(localStorage.getItem('widgetPasswords')) || [];

                    const index = existingWidgets.findIndex(widget => widget.id === widgetId);
                    if (index !== -1) {
                        existingWidgets[index].password = password;
                    } else {
                        existingWidgets.push({ id: widgetId, password: password });
                    }

                    localStorage.setItem('widgetPasswords', JSON.stringify(existingWidgets));

                    await loadWidget(widget);

                    const widgetObj = mjWidgetsData[widgetId];
                    if (isScriptLoaded(`mjwi-script-${widgetObj.widgetData.widgetType.name}`)) {
                        var widgetType = widgetObj.widgetData.widgetType.name;
                        const fname = `prepare${widgetType.charAt(0).toUpperCase() + widgetType.slice(1)}Widget`;
                        const selector = `.mj-${widgetType}`
                        window[fname](widget.querySelector(selector));
                    } else {
                        loadScript(widgetObj.script, `mjwi-script-${widgetObj.widgetData.widgetType.name}`);
                    }


                } else if (xhr.status === 403) {
                    passwordPopup.querySelector(".mjwi-err").innerHTML = xhr.responseText
                } else {
                    console.error("Verification failed. Status:", xhr.status);

                }
            };

            xhr.onerror = function () {
                console.error("Network error occurred");
                passwordPopup.querySelector(".mjwi-err").innerHTML = "Network error occurred"
            };

            xhr.send();
        });


    }

    const mjWidgets = document.querySelectorAll('.mj-widget');
    window.mjWidgetsData = [];
    prepareWidgets();

};
