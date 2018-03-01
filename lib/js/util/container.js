//------------------------------------------------------------------------------
//   ArrayContainer
//------------------------------------------------------------------------------
export class ArrayContainer {
    constructor() {
        this._container = [];
    }

    set color(c) {
        this._container.forEach(elem => {
            elem.color = c;
        })
    }

    set border_color(c) {
        this._container.forEach(elem => {
            elem.border_color = c;
        })
    }

    //set text_color(c) {
    //    this._container.forEach(elem => {
    //        elem.text_color = c;
    //    })
    //}

    //set border_width(w) {
    //    this._container.forEach(elem => {
    //        elem.border_width = w;
    //    })
    //}
}

//------------------------------------------------------------------------------
ArrayContainer.prototype.push = function(elem) {
    this._container.push(elem);
}

//------------------------------------------------------------------------------
ArrayContainer.prototype.forEach = function(callback) {
    this._container.forEach(callback);
}

//------------------------------------------------------------------------------
ArrayContainer.prototype.on = function(evt_name, callback) {
    this._container.forEach(elem => {
        elem.on(evt_name, callback);
    })
}
