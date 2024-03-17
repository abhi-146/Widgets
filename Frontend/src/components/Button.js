import React, {Component} from 'react'
export default class Button extends Component {
    render() {
        let {name, eventHandler, href, download, styleClass} = this.props;
        if(href == undefined) {
            href = "javascript:void(0);";
        }
        if(download == '') {
            download = false
        }
        if(!styleClass) {
            styleClass = '';
        }
        return (
            <a download={download} onClick= {eventHandler} href={href} className={`${styleClass} mjwi-btn`} id={'mjwi-btn-' + name.replace(' ', '-')}>
                {name}
            </a>
      )
    }
}