//------------------------------------------------------------------------------
//   Nav
//------------------------------------------------------------------------------

export function Nav(parent) {
    this.root = document.createElement("ul");
    if (parent) {
        parent.appendChild(this.root);
    }

    //const type = "nav nav-tabs";
    const type = "navbar-nav";
    this.root.className = type;

    this.is_add_front = false;
}

//------------------------------------------------------------------------------
Nav.prototype.setAddFront = function(is_add_front) {
    this.is_add_front = is_add_front;
}

//------------------------------------------------------------------------------
Nav.prototype.add = function(label, callback) {
    const li = this._createLi(label);

    li.onclick = () => {
        callback(li, this);
    };

    if (this.is_add_front) {
        this.root.insertBefore(li, this.root.firstChild);
    } else {
        this.root.appendChild(li);
    }

    return li;
}

Nav.prototype.reset = function() {
    this.root.innerHTML = "";
}

Nav.prototype.resetAllActive = function() {
    this.root.childNodes.forEach((n) => {
        n.classList.remove("active");
    })
}

//------------------------------------------------------------------------------
Nav.prototype._createLi = function(label) {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.textContent = label;
    a.style.cursor = "pointer";
    li.appendChild(a);

    return li;
}
