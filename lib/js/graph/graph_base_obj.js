import * as class_util from "../util/class.js";

//------------------------------------------------------------------------------
//   GraphBaseObj
//------------------------------------------------------------------------------
export class GraphBaseObj {
    constructor(id) {
        class_util.set_readonly(this, 'id', id);

        this.data = null;
    }
}

GraphBaseObj.prototype.isNode = function() {
    return false;
}

GraphBaseObj.prototype.isEdge = function() {
    return false;
}

GraphBaseObj.prototype.isGroup = function() {
    return false;
}
