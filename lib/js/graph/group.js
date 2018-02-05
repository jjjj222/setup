import { GraphBaseObj } from "./graph_base_obj.js";

//------------------------------------------------------------------------------
//   Group
//------------------------------------------------------------------------------
export class Group extends GraphBaseObj {
    constructor(id) {
        super(id);

        this.objs = [];
    }

    isGroup() {
        return true;
    }
}

Group.prototype.add = function(obj) {
    this.objs.push(obj);
}

Group.prototype.forEach = function(callback) {
    this.objs.forEach(callback);
}
