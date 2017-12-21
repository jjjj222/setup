
import * as d3 from "d3";
import { set_row_container } from "./layout_style.js"

//------------------------------------------------------------------------------
//   LayoutRow
//------------------------------------------------------------------------------
export function LayoutRow(parent) {
    this.root = document.createElement("div");
    if (parent) {
        parent.appendChild(this.root);
    }

    const container = d3.select(this.root)
        //.style("box-sizing", "border-box")
        //.style("height", "100%")
        //.style("width", "100%")
        //.style("margin", "0")
        //.style("overflow", "hidden")
        //.classed("fullsize-container", true)
        //.classed("v-container", true)

    //this.root.style.boxSizing = "border-box";
    //this.root.style.height = "100%";
    //this.root.style.width = "100%";
    //this.root.style.margin = "0";
    //this.root.style.overflow = "hidden";
    set_row_container(this.root)

    //this.root.style.display = "flex";
    //this.root.style.flexDirection = "column";
    //this.root.style.justifyContent = "flex-start";
    //this.root.style.alignItems = "stretch";
    //this.root.style.alignContent = "stretch";



    this.header = container.append("div")

    this.body = container.append("div")
        .classed("main-section", true)
        .classed("fullsize-container", true)
        .classed("v-container", true)
        .append("div")
            .classed("main-section", true)
            .style("overflow", "auto")

    this.footer = container.append("div")
}

//div.fullsize-container {
//    box-sizing: border-box;
//    height:100%;
//    width:100%;
//    margin: 0;
//    overflow: hidden;
//}
//
//div.v-container {
//    display: flex;
//    flex-direction: column;
//
//    justify-content: flex-start; /* align items in Main Axis */
//    align-items: stretch; /* align items in Cross Axis */
//    align-content: stretch; /* Extra space in Cross Axis */
//}
//
