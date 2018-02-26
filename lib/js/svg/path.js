import { xmlns } from './xmlns.js';

//------------------------------------------------------------------------------
//   Path
//------------------------------------------------------------------------------
export class Path {
    constructor(points) {
        this.root = document.createElementNS(xmlns, 'path');
        const p = this.root;
        p.setAttributeNS(null, 'fill', 'transparent');
        p.setAttributeNS(null, 'stroke', 'black');
        p.setAttributeNS(null, 'stroke-width', 2);

        let result = "";
        for (let i = 0; i < points.length; ++i) {
          if (i == 0) {
            result += "M ";
          } else {
            result += " L ";
          }
          result += points[i].toStrSpace();
        }
        //return result;
        p.setAttributeNS(null, 'd', result);

        //svg.body.appendChild(p);
    }
}
