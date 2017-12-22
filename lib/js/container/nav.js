//------------------------------------------------------------------------------
//   Nav
//------------------------------------------------------------------------------

export function Nav(parent) {
    this.root = document.createElement("ul");
    if (parent) {
        parent.appendChild(this.root);
    }

    this.root.className = "navbar-nav"; // TODO

    this.name_to_item = {};
}


Nav.prototype.add = function(text, callback) {
    const li = this._createLi(text, callback);
    this.root.appendChild(li);
}

Nav.prototype.addFront = function(text, callback) {
    const li = this._createLi(text, callback);
    this.root.insertBefore(li, this.root.firstChild);
}

Nav.prototype.remove = function(text) {
    this.name_to_item[text].remove();
    delete this.name_to_item[text];
}

Nav.prototype.reset = function(text) {
    this.root.innerHTML = "";
}

Nav.prototype.setActive = function(text) {
    this.name_to_item[text].classList.add("active");
}

Nav.prototype.resetActive = function(text) {
    this.name_to_item[text].classList.remove("active");
}

Nav.prototype.resetAllActive = function() {
    this.root.childNodes.forEach((n) => {
        n.classList.remove("active");
    })
}

Nav.prototype._createLi = function(text, callback) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.onclick = callback;

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.textContent = text;
    a.style.cursor = "pointer";
    li.appendChild(a);

    this.name_to_item[text] = li;

    return li;
}


