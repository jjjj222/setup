import { drag } from "../util/drag.js";
import { set_fullsize_container } from "./style.js";
import { LayoutRow } from "./layout_row.js";

//------------------------------------------------------------------------------
//   LayoutWindow
//------------------------------------------------------------------------------
export class LayoutWindow {
    constructor(parent) {
        this.root = document.createElement("div");
        if (parent) {
            parent.appendChild(this.root);
        }

        this.border_width = 2;
        this.border_color = "lightgray";
        this.min_height = 2 * this.border_width + 20;
        this._resizer = null;

        this._setupResizer();

        this.root.style.position = "absolute";
        //this.root.style.width = "25%";
        //this.root.style.height = "45%";
        //this.root.style.top = "20%";
        //this.root.style.left = "20%";
        this.root.style.top = "0px";
        this.root.style.left = "0px";
        this.root.style.margin = "0px";
        this.root.style.padding = this.border_width + "px";
        this.root.style.background = "white";

        // Init size
        const tmp_bbox = this.bbox;
        this.width = tmp_bbox.width;
        this.height = tmp_bbox.height;

        this.row = new LayoutRow(this.root);
        this.body = this.row.body;

        // move
        this._setupHeader();

        this.root.addEventListener("click", event => {
            event.stopPropagation();
            this.moveToFront();
        })
    }

    get bbox() {
        return this.root.getBoundingClientRect();
    }

    set top(x) {
        this.root.style.top = x + "px";
    }

    set left(x) {
        this.root.style.left = x + "px";
    }

    set width(w) {
        this.root.style.width = w + "px";
        this._resizer.top.style.width = (w - 2 * this.border_width) + "px";
        this._resizer.bot.style.width = (w - 2 * this.border_width) + "px";
    }

    set height(h) {
        this.root.style.height = h + "px";
        this._resizer.left.style.height = (h - 2 * this.border_width) + "px";
        this._resizer.right.style.height = (h - 2 * this.border_width) + "px";
    }

    set title(val) {
        this._header_text_node.nodeValue = val;
    }
}

//------------------------------------------------------------------------------
LayoutWindow.prototype._createResizer = function() {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = this.border_width + "px";
    div.style.height = this.border_width + "px";
    div.style.background = this.border_color;
    this.root.appendChild(div);
    return div;
}

//------------------------------------------------------------------------------
LayoutWindow.prototype._setupResizer = function() {
    this._resizer = {};
    this._resizer.top = this._createResizer();
    this._resizer.right = this._createResizer();
    this._resizer.bot = this._createResizer();
    this._resizer.left = this._createResizer();
    this._resizer.top_right = this._createResizer();
    this._resizer.top_left = this._createResizer();
    this._resizer.bot_right = this._createResizer();
    this._resizer.bot_left = this._createResizer();

    // Init pos
    const border_width_px = this.border_width + "px";
    this._resizer.top.style.top = "0px";
    this._resizer.top.style.left = border_width_px;
    this._resizer.bot.style.bottom = "0px";
    this._resizer.bot.style.left = border_width_px;
    this._resizer.left.style.top = border_width_px;
    this._resizer.left.style.left = "0px";
    this._resizer.right.style.top = border_width_px;
    this._resizer.right.style.right = "0px";
    this._resizer.top_left.style.top = "0px";
    this._resizer.top_left.style.left = "0px";
    this._resizer.top_right.style.top = "0px";
    this._resizer.top_right.style.right = "0px";
    this._resizer.bot_left.style.bottom = "0px";
    this._resizer.bot_left.style.left = "0px";
    this._resizer.bot_right.style.bottom = "0px";
    this._resizer.bot_right.style.right = "0px";

    // Init curser
    this._resizer.top.style.cursor = "ns-resize";
    this._resizer.bot.style.cursor = "ns-resize";
    this._resizer.left.style.cursor = "ew-resize";
    this._resizer.right.style.cursor = "ew-resize";
    this._resizer.top_left.style.cursor = "nwse-resize";
    this._resizer.bot_right.style.cursor = "nwse-resize";
    this._resizer.top_right.style.cursor = "nesw-resize";
    this._resizer.bot_left.style.cursor = "nesw-resize";

    this._setupResizerAction();
}

//------------------------------------------------------------------------------
LayoutWindow.prototype._setupResizerAction = function() {
    // top
    drag(this._resizer.top, (e) => {
        const is_move_x = false;
        const is_move_y = true;
        const is_left = false;
        const is_top = true;
        this._resize(e.pageX, e.pageY, is_move_x, is_move_y, is_left, is_top);
    });

    // bot
    drag(this._resizer.bot, (e) => {
        const is_move_x = false;
        const is_move_y = true;
        const is_left = false;
        const is_top = false;
        this._resize(e.pageX, e.pageY, is_move_x, is_move_y, is_left, is_top);
    });

    // left
    drag(this._resizer.left, (e) => {
        const is_move_x = true;
        const is_move_y = false;
        const is_left = true;
        const is_top = false;
        this._resize(e.pageX, e.pageY, is_move_x, is_move_y, is_left, is_top);
    });

    // right
    drag(this._resizer.right, (e) => {
        const is_move_x = true;
        const is_move_y = false;
        const is_left = false;
        const is_top = false;
        this._resize(e.pageX, e.pageY, is_move_x, is_move_y, is_left, is_top);
    });

    // top left
    drag(this._resizer.top_left, (e) => {
        const is_move_x = true;
        const is_move_y = true;
        const is_left = true;
        const is_top = true;
        this._resize(e.pageX, e.pageY, is_move_x, is_move_y, is_left, is_top);
    });

    // top right
    drag(this._resizer.top_right, (e) => {
        const is_move_x = true;
        const is_move_y = true;
        const is_left = false;
        const is_top = true;
        this._resize(e.pageX, e.pageY, is_move_x, is_move_y, is_left, is_top);
    });
    
    // bot left
    drag(this._resizer.bot_left, (e) => {
        const is_move_x = true;
        const is_move_y = true;
        const is_left = true;
        const is_top = false;
        this._resize(e.pageX, e.pageY, is_move_x, is_move_y, is_left, is_top);
    });

    // bot right
    drag(this._resizer.bot_right, (e) => {
        const is_move_x = true;
        const is_move_y = true;
        const is_left = false;
        const is_top = false;
        this._resize(e.pageX, e.pageY, is_move_x, is_move_y, is_left, is_top);
    });
}

//------------------------------------------------------------------------------
LayoutWindow.prototype._resize = function(x, y, is_move_x, is_move_y, is_left, is_top) {
    const bbox = this.bbox;
    const dx = is_left ? (bbox.x - x) : (x - (bbox.x + bbox.width));
    const dy = is_top ? (bbox.y - y) : (y - (bbox.y + bbox.height));
    const w = bbox.width + dx;
    const h = bbox.height + dy;

    if (is_move_x) {
        if (w > this.min_height) {
            if (is_left) {
                this.root.style.left = x + "px";
            }
            this.width = w;
        }
    }

    if (is_move_y) {
        if (h > this.min_height) {
            if (is_top) {
                this.root.style.top = y + "px";
            }
            this.height = h;
        }
    }
}

//------------------------------------------------------------------------------
LayoutWindow.prototype._setupHeader = function() {
    this._header = document.createElement("div");
    this._header.style.cursor = 'move';
    //this._header.style.background = "purple";
    this._header.style.color = "white";
    this._header.style.width = "100%";
    this._header.style.margin = "auto";
    this._header.style.textAlign = "center";
    this._header.classList.add("layout-window-header");

    //this.root.appendChild(this._header);
    this.row.addFront(this._header);

    this._header_text_node = document.createTextNode("");
    this._header.appendChild(this._header_text_node);

    this._setupHeaderMoveAction();
    this._setupHeaderCloseButton();
}

//------------------------------------------------------------------------------
LayoutWindow.prototype._setupHeaderMoveAction = function() {
    let initial_x = null;
    let initial_y = null;
    let initial_bbox = null;
    const mousedown_callback = (e) => {
        initial_bbox = this.bbox;
        initial_x = e.pageX;
        initial_y = e.pageY;
    };

    const mousemove_callback = (e) => {
        const dx = e.pageX - initial_x;
        const dy = e.pageY - initial_y;

        this.root.style.left = (initial_bbox.x + dx) + "px";
        this.root.style.top = (initial_bbox.y + dy) + "px";
    };

    drag(this._header, mousemove_callback, mousedown_callback);
}

//------------------------------------------------------------------------------
LayoutWindow.prototype._setupHeaderCloseButton = function() {
    const button = document.createElement("button");
    button.classList.add("close");
    button.type = "button";
    button.style.position = "absolute";
    button.style.top = "-2px";
    button.style.right = "2px";
    //button.style.margin = "-4px 0 0 10px";
    //button.style.fontSize = "18px";
    this._header.appendChild(button);

    const x = document.createElement("span");
    x.setAttribute("aria-hidden", true);
    x.style.color = "white";
    x.style.cursor = "pointer";
    x.innerHTML = "&times;";
    button.appendChild(x);

    x.addEventListener("click", (e) => {
        e.stopPropagation();

        this.close();
    })
}

//------------------------------------------------------------------------------
LayoutWindow.prototype.close = function() {
    this.root.parentNode.removeChild(this.root);
}

//------------------------------------------------------------------------------
LayoutWindow.prototype.moveToFront = function() {
    const parent = this.root.parentNode;
    parent.removeChild(this.root);
    parent.appendChild(this.root);
}

//------------------------------------------------------------------------------
LayoutWindow.prototype.resize = function(width, height) {
    this.width = width;
    this.height = height;
}

//------------------------------------------------------------------------------
LayoutWindow.prototype.setInnerSize = function(width, height) {
    const header_bbox = this._header.getBoundingClientRect();
    this.width = width + 2 * this.border_width;
    this.height = height + header_bbox.height + 2 * this.border_width;
}
