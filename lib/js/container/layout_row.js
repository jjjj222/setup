import { set_row_container, set_main_section } from "./style.js"

//------------------------------------------------------------------------------
//   LayoutRow
//------------------------------------------------------------------------------
export function LayoutRow(parent) {
    this.root = document.createElement("div");
    if (parent) {
        parent.appendChild(this.root);
    }

    this.root.className = "layout-row";

    set_row_container(this.root)

    const main_section = document.createElement("div")
    set_row_container(main_section)
    set_main_section(main_section)
    this.root.appendChild(main_section)

    this.body = document.createElement("div")
    set_main_section(this.body)
    main_section.appendChild(this.body)
}

//------------------------------------------------------------------------------
LayoutRow.prototype.addFront = function(dom) {
    if (!dom) {
        dom = document.createElement("div")
    }

    this.root.insertBefore(dom, this.root.firstChild)

    return dom
}

//------------------------------------------------------------------------------
LayoutRow.prototype.addBack = function(dom) {
    if (!dom) {
        dom = document.createElement("div")
    }

    this.root.appendChild(dom)

    return dom
}
