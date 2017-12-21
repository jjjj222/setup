
import * as d3 from "d3";
import { set_row_container, set_main_section } from "./layout_style.js"

//------------------------------------------------------------------------------
//   LayoutRow
//------------------------------------------------------------------------------
export function LayoutRow(parent) {
    this.root = document.createElement("div");
    if (parent) {
        parent.appendChild(this.root);
    }

    const container = d3.select(this.root)
    set_row_container(this.root)

    const main_section = document.createElement("div")
    this.root.appendChild(main_section)
    set_main_section(main_section)
    set_row_container(main_section)

    this.body = document.createElement("div")
    main_section.appendChild(this.body)
    set_main_section(this.body)
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
