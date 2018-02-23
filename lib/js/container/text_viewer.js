import { set_fullsize_container } from "../layout/style.js";
//import * as d3 from "d3";

//------------------------------------------------------------------------------
//   TextViewer
//------------------------------------------------------------------------------
export function TextViewer(parent) {
    this.root = document.createElement("div");
    if (parent) {
        parent.appendChild(this.root);
    }

    this.root.classList.add("text-viewer");
    set_fullsize_container(this.root)
    this.root.style.overflow = "auto";

    //d3.select(this.root)
    //    .classed("fullsize-container", true)
    //    .style("overflow", "auto")
}

TextViewer.prototype.setText = function(text) {
    this.root.innerHTML = "";
    const pre = document.createElement("pre");
    pre.textContent = text;
    this.root.append(pre);
    //const container = d3.select(this.root);

    ////container.html("");
    //container.append("pre")
    //    .text(text)
}
