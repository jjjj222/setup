import * as d3 from "d3";

//------------------------------------------------------------------------------
//   LayoutColumn
//------------------------------------------------------------------------------
export function LayoutColumn(parent) {
    this.root = document.createElement("div");
    if (parent) {
        parent.appendChild(this.root);
    }

    const container = d3.select(this.root)
        .classed("fullsize-container", true)
        .classed("h-container", true)
        //.style("overflow", "hidden")


    this.left_div = container.append("div")

    this.body = container.append("div")
        .classed("main-section", true)
        .style("overflow", "auto")

    this.right_div = container.append("div")

    this.setupLeftColumn()
    this.setupRightColumn()
}

LayoutColumn.prototype.setupLeftColumn = function() {
    const column = this.left_div;
    this.left_column = column.append("div")
        .classed("fullsize-container", true)
        .style("overflow", "auto")

    const drag_left = d3.drag()
        .on('drag', function() {
            const x = d3.mouse(this.parentNode)[0];

            // Avoid negative or really small widths
            const w = Math.max(5, x);

            column.style('width', w + 'px');
        })


    column.style("position", "relative")
        .style("box-sizing", "border-box")
        .style("flex-shrink", 0)

    column.append("div")
        .classed("resizer", true)
        .style("right", 0)
        .call(drag_left)
}

LayoutColumn.prototype.setupRightColumn = function() {
    this.right_column = this.right_div.append("div")
        .classed("fullsize-container", true)
        //.style("background", "red")
        .style("overflow", "auto")

    const column = this.right_div;
    var drag_right = d3.drag()
        .on('drag', function() {
            const x = d3.mouse(this.parentNode)[0];

            // Avoid negative or really small widths
            let w = this.parentNode.getBoundingClientRect().width - x;
            w = Math.max(5, w);

            column.style('width', w + 'px');
        })


    column.style("position", "relative")
        .style("box-sizing", "border-box")
        .style("flex-shrink", 0)

    column.append("div")
        .classed("resizer", true)
        .call(drag_right)
}

LayoutColumn.prototype.getLeftColumn = function(width = "10%") {
    this.left_div.style("width", width);

    return this.left_column;
}

LayoutColumn.prototype.getRightColumn = function(width = "10%", is_resizable = true) {
    this.right_div.style("width", width);
    return this.right_column;
}
