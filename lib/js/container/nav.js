//------------------------------------------------------------------------------
//   Nav
//------------------------------------------------------------------------------

export function Nav(parent) {
    this.root = document.createElement("ul");
    if (parent) {
        parent.appendChild(this.root);
    }

    this.root.classList.add("navbar-nav"); // TOOD
}


Nav.prototype.addItem = function(text, callback) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.onclick = callback;
    this.root.appendChild(li);

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.textContent = text;
    a.style.cursor = "pointer";
    li.appendChild(a);


    //if (is_active) {
    //    li.classList.add("active")
    //}
}
