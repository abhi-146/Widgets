import { combineReducers } from "redux";
import overlayReducer from "./overlayReducer";
import currentUserReducer from "./currentUserReducer";
import widgetTypesReducer from "./widgetTypesReducer";

const rootReducer = combineReducers({
    overlay: overlayReducer,
    currentUser: currentUserReducer,
    widgetTypes: widgetTypesReducer,
  });
  export default rootReducer;