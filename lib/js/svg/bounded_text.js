import { Text } from './text.js';
import { Tspan } from './tspan.js';

//------------------------------------------------------------------------------
//   BoundedText
//------------------------------------------------------------------------------
export class BoundedText extends Text {
    constructor(boundary_bbox) {
        super();

        this.boundary_bbox = boundary_bbox;
        this.x = boundary_bbox.x;
        this.y = boundary_bbox.y;
    }

    set text(str) {
        const is_too_long = this._setText_tryAll(str);

        if (is_too_long) {
            this._setText_tailFirst(str, this.childCount);
        }
    }
}

//------------------------------------------------------------------------------
BoundedText.prototype._createTspan = function(is_first = false) {
    const ts = new Tspan();
    if (!is_first) {
        ts.x = this.boundary_bbox.x;
        ts.dy = '1em';
    }

    this.add(ts);
    return ts;
}

BoundedText.prototype._setText_tryAll = function(str) {
    this.clear();

    let ts = this._createTspan(true);
    let is_too_long = false;

    for (let i = 0; i < str.length; ++i) {
        const current_text = ts.text;
        const next_text = current_text + str[i];
        ts.text = next_text;
        if (ts.width > this.boundary_bbox.width) {
            ts.text = current_text;
            ts = this._createTspan();
            ts.text = str[i];
            if (this.height > this.boundary_bbox.height) {
                this.remove(ts);
                is_too_long = true;
                break;
            }
        }
    }

    return is_too_long;
}

//------------------------------------------------------------------------------
BoundedText.prototype._setText_tailFirst = function(str, num_of_row) {
    //console.log(str, num_of_row);
    this.clear();

    const result = [];
    const ts = this._createTspan();
    let i = str.length - 1;

    if (num_of_row > 1) {
        for (; i >= 0; --i) {
            const current_text = ts.text;
            const next_text = str[i] + current_text;
            ts.text = next_text;
            if (ts.width > this.boundary_bbox.width) {
                result.push(current_text);
                ts.text = str[i];
                if (result.length == num_of_row - 1) {
                    break;
                }
            }
        }
    }

    const prefix = "...";
    let current_text = "";
    for (i++; i >= 0; --i) {
        const next_text = prefix + str[i] + current_text;
        ts.text = next_text;
        if (ts.width > this.boundary_bbox.width) {
            result.push(prefix + current_text);
            break;
        }

        current_text = str[i] + current_text;
    }

    this._setTspans(result.reverse());
}

//------------------------------------------------------------------------------
BoundedText.prototype._setTspans = function(str_array) {
    this.clear();
    for (let i = 0; i < str_array.length; ++i) {
        const ts = this._createTspan(i == 0);
        ts.text = str_array[i];
    }
}
