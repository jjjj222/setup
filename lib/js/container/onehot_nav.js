import { Nav } from "./nav.js";

//------------------------------------------------------------------------------
//   OnehotNav
//------------------------------------------------------------------------------
export function OnehotNav(parent, type="nav nav-tabs") {
    Nav.call(this, parent, type);
}

OnehotNav.prototype = Object.create(Nav.prototype);
OnehotNav.prototype.super = Nav.prototype;
OnehotNav.prototype.constructor = OnehotNav;

//------------------------------------------------------------------------------
OnehotNav.prototype.add = function(text, callback) {
    const li = this._createLi(text, callback);
    this.root.appendChild(li);
}

OnehotNav.prototype.addFront = function(text, callback) {
    const li = this._createLi(text, callback);
    this.root.insertBefore(li, this.root.firstChild);
}

OnehotNav.prototype.setActive = function(text) {
    this.super.resetAllActive.call(this);
    this.super.setActive.call(this, text);
}

OnehotNav.prototype.resetActive = function(text) {
    // error
    // do nothing
}

OnehotNav.prototype.resetAllActive = function() {
    // error
    // do nothing
}

//------------------------------------------------------------------------------
OnehotNav.prototype._createLi = function(text, callback) {
    const li = this.super._createLi.call(this, text, callback);
    if (this.root.childNodes.length == 0) {
        li.classList.add("active");
    }

    return li;
}

