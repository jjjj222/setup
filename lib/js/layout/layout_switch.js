import { set_fullsize_container } from "./style.js";

//------------------------------------------------------------------------------
//   LayoutSwitch
//------------------------------------------------------------------------------
export function LayoutSwitch(parent, binded_nav) {
    this.root = document.createElement("div");
    if (parent) {
        parent.appendChild(this.root);
    }

    this.root.className = "layout-switch";

    set_fullsize_container(this.root);

    this.binded_nav = binded_nav;

    //if (this.binded_nav) {
    //    this.add = this._addWithNav;
    //} else {
    //    this.add = this._add;
    //}
}

//------------------------------------------------------------------------------
//LayoutSwitch.prototype._add = function(dom) {
//    const div = this._createDiv(dom);
//
//    const show_div = () => {
//        this.root.insertBefore(div, this.root.firstChild)
//    }
//
//    return show_div;
//}

//LayoutSwitch.prototype._addWithNav = function(dom, label) {
LayoutSwitch.prototype.add = function(dom, label) {
    const div = this._createDiv(dom);

    const show_div_and_active_nav = (nav_item) => {
        //this.root.insertBefore(div, this.root.firstChild);
        this.root.childNodes.forEach(n => {
            n.style.display = "none";
        });
        div.style.display = "";

        nav_item.setSingleActive();
    }

    const remove_div = (li) => {
        //console.log(li);
        //console.log(div.style.display);

        this.root.removeChild(div);
    }

    const item = this.binded_nav.add(label, show_div_and_active_nav, remove_div);
    if (this.root.childNodes.length == 1) {
        item.setActive();
    }

    return show_div_and_active_nav.bind(this, item);
}

LayoutSwitch.prototype._createDiv = function(dom) {
    const div = document.createElement("div");
    //div.className = "fullsize-container";
    set_fullsize_container(div);
    div.appendChild(dom);

    this.root.appendChild(div);
    return div;
}
