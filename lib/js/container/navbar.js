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
    this.root.classList.add("navbar-custom");

    this.nav = new Nav(this.root, "navbar-nav");

    this.right = document.createElement("div");
    this.right.classList.add("ml-auto");
    this.root.appendChild(this.right);
}

//------------------------------------------------------------------------------
Navbar.prototype.append = function(dom) {
   this.right.appendChild(dom);
}

//------------------------------------------------------------------------------
Navbar.prototype.addBrand = function(text, href) {
    const brand = new NavbarBrand(text, href);
    this.root.insertBefore(brand.root, this.root.firstChild);
}

//------------------------------------------------------------------------------
Navbar.prototype.appendFileInputBtn = function(text, callback) {
    const file_input_form = new FileInputForm("Browse", callback);
    this.append(file_input_form.root);
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

//------------------------------------------------------------------------------
//   FileInputForm
//------------------------------------------------------------------------------
function FileInputForm(text, callback) {
    this.root = document.createElement("form");
    this.root.className = "form-inline";

    const label = document.createElement("label");
    label.classList.add("navbar-text");
    label.textContent = "No file chosen";
    label.style.marginRight = "10px";
    this.root.appendChild(label);

    const btn = document.createElement("span");
    btn.classList.add("btn");
    btn.classList.add("btn-outline-light");
    btn.classList.add("btn-file");
    btn.textContent = text;
    this.root.appendChild(btn);


    const input = document.createElement("input");
    input.type = "file"
    btn.appendChild(input);

    const fn = (e) => {
        const file = e.target.files[0];
        label.textContent = file.name;
        callback(file);
    }

    input.addEventListener('change', fn, false);

    input.style.position = "absolute";
    input.style.top = "0";
    input.style.right = "0";
    input.style.minWidth = "100%";
    input.style.minHeight = "100%";
    input.style.outline = "none";
    //position: absolute;
    //top: 0;
    //right: 0;
    //width: 0;
    //height: 0;
    //min-width: 100%;
    //min-height: 100%;
    //text-align: right;
    //filter: alpha(opacity=0);
    //opacity: 0;
    //outline: none;
    //display: block;
}
