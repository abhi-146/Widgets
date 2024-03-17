import { WIDGET_TYPES } from "../actionCreators/actionTypes";
let initState = [];
export default function changeWidgetTypes(state = initState, action) {
    if(action.type === WIDGET_TYPES) {
        return action.payload;
    } else {
        return state;
    }
}