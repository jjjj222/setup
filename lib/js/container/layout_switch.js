import * as d3 from "d3";

//------------------------------------------------------------------------------
//   LayoutSwitch
//------------------------------------------------------------------------------
export function LayoutSwitch(parent) {
    this.root = document.createElement("div");
    if (parent) {
        parent.appendChild(this.root);
    }

    this.body = d3.select(this.root)
        .classed("fullsize-container", true)

    this.current_div = null;
}

LayoutSwitch.prototype.add = function(div, is_set_display=true) {
    this.body.node().appendChild(div);
    if (is_set_display) {
        this.setDisplay(div)
    }

    return this.setDisplay.bind(this, div)
}

LayoutSwitch.prototype.setDisplay = function(div) {
    if (this.current_div == div) {
        return;
    }

    if (this.current_div) {
        d3.select(this.current_div).style("display", "none");
    }

    this.current_div = div;
    d3.select(this.current_div).style("display", null);
}
