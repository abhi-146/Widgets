import { OVERLAY_STATUS } from "./actionTypes"
import { CURRENT_USER } from "./actionTypes"
import { WIDGET_TYPES } from "./actionTypes"

export function changeOverlayStatus(status) {
    return (
        {
            type: OVERLAY_STATUS,
            payload: status
        }
    )
}

export function changeCurrentUser(user) {
    return (
        {
            type: CURRENT_USER,
            payload: user
        }
    )
}


export function changeWidgetTypes(types) {
    return (
        {
            type: WIDGET_TYPES,
            payload: types
        }
    )
}