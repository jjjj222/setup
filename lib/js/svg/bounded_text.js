import { Text } from './text.js';
import { Tspan } from './tspan.js';

//------------------------------------------------------------------------------
//   
//------------------------------------------------------------------------------
export class BoundedText extends Text {
    constructor(boundary_bbox) {
        super();

        this.boundary_bbox = boundary_bbox;
        this.x = boundary_bbox.x;
        this.y = boundary_bbox.y;
    }

    set text(str) {
        let ts = this._createTspan(true);
        //ts.text = str;
        //return;
        //this.add(ts);
        //if (ts.width <= this.boundary_bbox.width) {
        //    return;
        //}
        let is_too_long = false;

        for (let i = 0; i < str.length; ++i) {
            const current_text = ts.text;
            const next_text = current_text + str[i];
            //ts.push(str[i]);
            ts.text = next_text;
            if (ts.width > this.boundary_bbox.width) {
                ts.text = current_text;
                ts = this._createTspan();
                //this.add(ts)
                //ts.push(str[i]);
                ts.text = str[i];
                if (this.height > this.boundary_bbox.height) {
                    this.remove(ts);
                    is_too_long = true;
                    break;
                }
            }
        }

        if (!is_too_long) {
            return;
        }

        console.log("too long");
        //console.log(this.length);
        const max_row = this.length;

        const result = [];
        ts = this._createTspan();
        for (let i = str.length - 1; i >= 0; --i) {
            const current_text = ts.text;
            const next_text = str[i] + current_text;
            ts.text = next_text;
            if (ts.width > this.boundary_bbox.width) {
                result.push(current_text);
                ts.text = str[i];
                if (result.length == max_row) {
                    break;
                }
            }
        }

        ts.text = "";
        str = result[max_row - 1];
        const prefix = "...";
        let current_text = "";
        for (let i = str.length - 1; i >= 0; --i) {
            //const current_text = ts.text;
            const next_text = prefix + str[i] + current_text;
            ts.text = next_text;
            if (ts.width > this.boundary_bbox.width) {
                result[max_row - 1] = prefix + current_text;
                break;
            } else {
                current_text = str[i] + current_text;
            }
        }
        this.remove(ts);

        //result.push(ts.text);
        //ts.text = "";
        console.log(result);

        let i = max_row - 1;

        this.forEach(tt => {
            console.log(tt);
            console.log(result[i]);
            tt.textContent = result[i];
            console.log(tt);
            i--;
        })
    }

    get length() {
        return this.root.childElementCount;
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
