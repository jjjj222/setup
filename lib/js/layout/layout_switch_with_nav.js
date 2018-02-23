import { LayoutSwitch } from "./layout_switch.js";
import { Nav } from "../container/nav.js";
import { LayoutRow } from "./layout_row.js";

//------------------------------------------------------------------------------
//   
//------------------------------------------------------------------------------
export class LayoutSwitchWithNav {
    constructor(parent) {
        const row = new LayoutRow(parent);
        this.root = row.root;

        const nav = new Nav();
        row.addFront(nav.root)

        this.switch = new LayoutSwitch(row.body, nav);
    }
}

//------------------------------------------------------------------------------
LayoutSwitchWithNav.prototype.add = function(dom, label) {
    return this.switch.add(dom, label);
}
