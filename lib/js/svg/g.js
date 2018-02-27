import { SvgObj } from './base_obj.js';

//------------------------------------------------------------------------------
//   G
//------------------------------------------------------------------------------
export class G extends SvgObj {
    constructor(parent_svg_obj) {
        super('g');
        if (parent_svg_obj) {
            parent_svg_obj.add(this);
        }
    }
}
