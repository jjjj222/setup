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
Navbar.prototype.addItem = function(text, callback) {
    this.front_list.addItem(text, callback)
}

//------------------------------------------------------------------------------
Navbar.prototype.resetItem = function() {
    this.front_list.root.innerHTML = "";
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
