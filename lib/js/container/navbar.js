import { Nav } from "./nav.js"

//------------------------------------------------------------------------------
//   Navbar
//------------------------------------------------------------------------------
export function Navbar(parent) {
    this.root = document.createElement("nav");
    if (parent) {
        parent.appendChild(this.root);
    }

    this.root.classList.add("navbar");
    this.root.classList.add("navbar-expand-sm");
    this.root.classList.add("navbar-dark");
    this.root.classList.add("bg-primary");

    this.front_list = new Nav(this.root)
}

//------------------------------------------------------------------------------
Navbar.prototype.append = function(dom) {
   this.root.appendChild(dom);
}

//------------------------------------------------------------------------------
Navbar.prototype.addBrand = function(text, href) {
    const brand = new NavbarBrand(text, href);
    this.root.insertBefore(brand.root, this.root.firstChild);
}

//------------------------------------------------------------------------------
Navbar.prototype.addItem = function(text, callback, is_add_front = false) {
    const fn = () => {
        this.front_list.resetAllActive();
        this.front_list.setActive(text);
        callback();
    }

    if (is_add_front) {
        this.front_list.addFront(text, fn);
    } else {
        this.front_list.add(text, fn);
    }

    this.front_list.resetAllActive();
    this.front_list.setActive(text);
}

Navbar.prototype.addItemFront = function(text, callback) {
    this.addItem(text, callback, true);
}

//------------------------------------------------------------------------------
Navbar.prototype.removeItem = function(text) {
    this.front_list.remove(text);
}

//------------------------------------------------------------------------------
Navbar.prototype.resetItem = function() {
    this.front_list.reset();
}

//------------------------------------------------------------------------------
//   NavbarBrand
//------------------------------------------------------------------------------
function NavbarBrand(text, href) {
    this.root = document.createElement("a");

    this.root.classList.add("navbar-brand")
    this.root.href = href
    this.root.textContent = text
}
