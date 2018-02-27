import { Rect, G } from './svg.js';
import { Text } from './text.js';
import { BoundedText } from './bounded_text.js';
//------------------------------------------------------------------------------
//   ShapeWithText
//------------------------------------------------------------------------------
export class ShapeWithText {
    constructor(bbox) {
        const g = new G();
        this.g = g;
        this.root = g.root;
        this.bbox = bbox;
        //this.acv_node = acv_node;

        g.transform(bbox.x, bbox.y);
        const rect = new Rect(g);
        rect.width = bbox.width;
        rect.height = bbox.height;
        rect.color = 'white';
        rect.border_color = 'black';

        this.style = {
            padding: {
                x: 2,
                y: 2,
            },
            line_spacing: '1em',
        }


        this.text_bbox = {
            x: this.style.padding.x,
            y: this.style.padding.y,
            width: this.bbox.width - 2 * this.style.padding.x,
            height: this.bbox.height - 2 * this.style.padding.y,
        }

        this.text = new BoundedText(this.text_bbox);
        g.add(this.text);
    }
}


//------------------------------------------------------------------------------
ShapeWithText.prototype.setText = function(label) {
    const xmlns = "http://www.w3.org/2000/svg";
    const text_style = this.style;

    const t = this.text;
    //t.x = text_style.padding.x;
    //t.y = text_style.padding.y;
    t.text = label;
    return;

    const max_width = this.bbox.width - text_style.padding.x * 2;
    //const text_width = t.root.getComputedTextLength();
    const text_width = t.width;
    //console.log(text_width, max_width);
    if (text_width <= max_width) {
        return;
    }

    // Prepare str
    //let str = n.getName();
    let str = t.root.textContent;
    //console.log(str);
    if (str.length > text_style.max_length) {
        str = "..." + str.slice(text_style.max_length * -1, -1)
    }

    t.text = "";
    // Create tspans
    //const text = d3.select(this).text("");
    //let tspan = text.append("tspan")
    //    .attr("x", text_style.padding.x)
    let tspan = document.createElementNS(xmlns, 'tspan');
    tspan.setAttributeNS(null, 'x', text_style.padding.x);
    //tspan.textContent = str;
    t.root.appendChild(tspan);

    for (let i = 0; i < str.length; ++i) {
        let current_text = tspan.textContent;
        tspan.textContent = current_text + str[i];

        //const tspan_width = tspan.node().getComputedTextLength();
        const tspan_width = tspan.getComputedTextLength();
        if (tspan_width > max_width) {
            tspan.textContent = current_text;
            //tspan.text(current_text);
            //tspan = text.append("tspan")
            //    .attr("x", text_style.padding.x)
            //    .attr("dy", text_style.line_spacing)
            tspan = document.createElementNS(xmlns, 'tspan');
            tspan.setAttributeNS(null, 'x', text_style.padding.x);
            tspan.setAttributeNS(null, 'dy', text_style.line_spacing);
            t.root.appendChild(tspan);

            //tspan.text(str[i]);
            tspan.textContent = str[i];
        }
    }
}
