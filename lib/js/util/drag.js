export function drag(dom, callback) {
    const disable_select_fn = (e) => {
        e.preventDefault();
    };

    const mousedown_fn = (e) => {
        const mousemove_fn = (e) => {
            callback(e);

            e.stopPropagation();
        };


        let mouseup_fn = function(e) {
            window.removeEventListener("mousemove", mousemove_fn);
            window.removeEventListener("mouseup", this);
            window.removeEventListener("selectstart", disable_select_fn);
            e.stopPropagation();
        };
        mouseup_fn = mouseup_fn.bind(mouseup_fn);

        window.addEventListener("mousemove", mousemove_fn);
        window.addEventListener("selectstart", disable_select_fn);
        window.addEventListener("mouseup", mouseup_fn);
        e.stopPropagation();
    };

    dom.addEventListener("mousedown", mousedown_fn);
}

//------------------------------------------------------------------------------
//   backup
//------------------------------------------------------------------------------
//const drag_left = d3.drag()
//    .on('drag', function() {
//        const x = d3.mouse(this.parentNode)[0];

//        // Avoid negative or really small widths
//        const w = Math.max(5, x);

//        //column.style('width', w + 'px');
//        d3.select(resizable_div).style('width', w + 'px');
//    })


//d3.select(resizer)
//    .classed("resizer", true)
//    .style("right", 0)
//    //.call(drag_left)
