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
    this.is_add_close_button = false;
}

//------------------------------------------------------------------------------
Nav.prototype.setAddFront = function(is_add_front) {
    this.is_add_front = is_add_front;
}

Nav.prototype.setClassName = function(className) {
    this.root.className = className;
}

//------------------------------------------------------------------------------
Nav.prototype.add = function(label, active_callback, close_callback) {
    const li = this._createLi(label, close_callback);
    const nav_item = new NavItem(li, this);

    li.onclick = () => {
        active_callback(nav_item);
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
Nav.prototype._createLi = function(label, close_callback) {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.textContent = label;
    a.style.cursor = "pointer";
    li.appendChild(a);

    //a.style.borderRadius = 0; // TODO
    if (this.is_add_close_button) {
        const button = document.createElement("button");
        button.classList.add("close");
        button.type = "button";
        button.style.margin = "-2px 0 0 10px";
        //button.style.fontSize = "18px";
        a.appendChild(button);

        const x = document.createElement("span");
        x.setAttribute("aria-hidden", true);
        x.innerHTML = "&times;";
        button.appendChild(x);

        // TODO
        x.addEventListener("click", (e) => {
            //const nav_item = new NavItem(li, this);
            if (li.firstChild.classList.contains("active")) {
                if (li.nextSibling) {
                    li.nextSibling.click();
                    li.nextSibling.firstChild.classList.add("active");
                } else if (li.previousSibling) {
                    li.previousSibling.click();
                    li.previousSibling.firstChild.classList.add("active");
                }
            }

            close_callback(li);
            this.root.removeChild(li);
            e.stopPropagation();

        })
    }

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
