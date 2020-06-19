import { sidebarContent } from "../../constants/dataTables";

const intialState = {
  sidebar: sidebarContent,
  submenuIndex: 0
};
const SideBarReducer = (state = intialState, action) => {
  return state;
};
export default SideBarReducer;
