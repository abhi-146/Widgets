import { CURRENT_USER } from "../actionCreators/actionTypes";
let initState = {};
export default function changeCurrentUser(state = initState, action) {
    if(action.type === CURRENT_USER) {
        return action.payload;
    } else {
        return state;
    }
}