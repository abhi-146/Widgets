import { OVERLAY_STATUS } from "../actionCreators/actionTypes";
let initState = 'false';
export default function changeOverlayStatus(state = initState, action) {
    if(action.type === OVERLAY_STATUS) {
        return action.payload;
    } else {
        return state;
    }
}