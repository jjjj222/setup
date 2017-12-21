import * as d3 from "d3";

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


    this.front_list = document.createElement("ul");
    this.front_list.classList.add("navbar-nav");
    this.root.appendChild(this.front_list);
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
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.onclick = callback;
    this.front_list.appendChild(li);

    const a = document.createElement("a");
    a.href = "#";
    a.textContent = text;
    li.appendChild(a);
}

//------------------------------------------------------------------------------
Navbar.prototype.resetItem = function() {
    this.front_list.innerHTML = "";
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
