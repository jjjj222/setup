
//------------------------------------------------------------------------------
export function scroll_to_center(container, target) {
    const bbox = target.getBoundingClientRect();

    const x_offset = target.offsetLeft - container.offsetLeft;
    const y_offset = target.offsetTop - container.offsetTop;
    //console.log(x_offset);
    //console.log(y_offset);

    scroll_to_point(container, x_offset + bbox.width / 2, y_offset + bbox.height / 2);
}

//------------------------------------------------------------------------------
function scroll_to_point(container, x, y) {
    const bbox = container.getBoundingClientRect();
    //console.log(bbox);

    container.scrollTo(x - bbox.width / 2, y - bbox.height / 2);
}
