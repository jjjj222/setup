//------------------------------------------------------------------------------
//   Nav
//------------------------------------------------------------------------------

export function Nav(parent, className) {
    this.root = document.createElement("ul");
    if (parent) {
        parent.appendChild(this.root);
    }

    if (className) {
        this.root.className = className;
    } else {
        this.root.className = "nav nav-tabs";
    }

    this.is_add_front = false;
}

//------------------------------------------------------------------------------
Nav.prototype.setAddFront = function(is_add_front) {
    this.is_add_front = is_add_front;
}

Nav.prototype.setClassName = function(className) {
    this.root.className = className;
}

//------------------------------------------------------------------------------
Nav.prototype.add = function(label, callback) {
    const li = this._createLi(label);
    const nav_item = new NavItem(li, this);

    li.onclick = () => {
        callback(nav_item);
    };

    if (this.is_add_front) {
        this.root.insertBefore(li, this.root.firstChild);
    } else {
        this.root.appendChild(li);
    }

    return nav_item;
}

Nav.prototype.reset = function() {
    this.root.innerHTML = "";
}

Nav.prototype.resetAllActive = function() {
    this.root.childNodes.forEach((n) => {
        n.firstChild.classList.remove("active");
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

    //a.style.borderRadius = 0; // TODO

    return li;
}

//------------------------------------------------------------------------------
//   NavItem
//------------------------------------------------------------------------------
function NavItem(li, nav) {
    this.li = li;
    this.nav = nav;
}

//------------------------------------------------------------------------------
NavItem.prototype.setActive = function(is_active = true) {
    if (is_active) {
        this.li.firstChild.classList.add("active");
    } else {
        this.li.firstChild.classList.remove("active");
    }
}

NavItem.prototype.setSingleActive = function() {
    this.nav.resetAllActive();
    this.setActive();
}
