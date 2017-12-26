export function set_fullsize_container(dom) {
    dom.style.boxSizing = "border-box";
    dom.style.height = "100%";
    dom.style.width = "100%";
    dom.style.margin = "0px";
    dom.style.overflow = "hidden";
}

export function set_row_container(dom) {
    dom.style.display = "flex";
    dom.style.flexDirection = "column";
    dom.style.justifyContent = "flex-start";
    dom.style.alignItems = "stretch";
    dom.style.alignContent = "stretch";
    set_fullsize_container(dom)
}

export function set_main_section(dom) {
    dom.style.boxSizing = "border-box";
    dom.style.height = "100%";
    dom.style.width = "100%";
    dom.style.margin = "0px";
    dom.style.padding = "0px";
    dom.style.flexGrow = "1";
}
