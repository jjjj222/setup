import * as d3 from "d3";

//------------------------------------------------------------------------------
//   Navbar
//------------------------------------------------------------------------------
export function Navbar(parent) {
    this.root = document.createElement("nav");
    if (parent) {
        parent.appendChild(this.root);
    }

    const navbar = d3.select(this.root)
        .classed("navbar", true)
        .classed("navbar-expand-sm", true)
        .classed("navbar-dark", true)
        .classed("bg-primary", true)

    this.front_ul = navbar.append("ul")
        .classed("navbar-nav", true)
}

Navbar.prototype.append = function(dom) {
   this.root.appendChild(dom);
}

Navbar.prototype.addBrand = function(text, href) {
    const brand = new NavbarBrand(text, href);
    this.root.insertBefore(brand.root, this.root.firstChild);
}

Navbar.prototype.addItem = function(text, callback) {
    const fixed_text = "";

    const li = this.front_ul.append("li");

    li.classed("nav-item", true)
        .on("click", callback)
        .append("a")
            .classed("nav-link", true)
            .attr("href", "#" + fixed_text)
            .text(text)
}

Navbar.prototype.resetItem = function() {
    this.front_ul.html("");
}

//------------------------------------------------------------------------------
//   NavbarBrand
//------------------------------------------------------------------------------
function NavbarBrand(text, href) {
    this.root = document.createElement("a");

    d3.select(this.root)
        .classed("navbar-brand", true)
        .attr("href", href)
        .text(text)
}
