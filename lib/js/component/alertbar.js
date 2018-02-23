//------------------------------------------------------------------------------
//   Alertbar
//------------------------------------------------------------------------------
export function Alertbar(parent) {
    this.root = document.createElement("div");
    if (parent) {
        parent.appendChild(this.root);
    }

    this.root.classList.add('alertbar');
}

//------------------------------------------------------------------------------
Alertbar.prototype.reset = function() {
    this.root.innerHTML = "";
}

//------------------------------------------------------------------------------
Alertbar.prototype.addWarning = function(text, title="Warning!") {
    this._addInfo("alert-warning", title, text);
}

//------------------------------------------------------------------------------
Alertbar.prototype.addError = function(text, title="Error!") {
    this._addInfo("alert-danger", title, text);
}


//------------------------------------------------------------------------------
Alertbar.prototype._addInfo = function(type, title, text) {
    const info = this._createInfobar();
    info.classList.add(type);
    this.root.appendChild(info);

    const strong = document.createElement("strong");
    strong.textContent = title;
    info.appendChild(strong);

    const textNode = document.createTextNode(" " + text);
    info.appendChild(textNode);
}

//------------------------------------------------------------------------------
Alertbar.prototype._createInfobar = function() {
    const info = document.createElement("div");

    info.classList.add("alert");
    info.classList.add("mb-0");
    info.setAttribute("role", "alert");

    const button = document.createElement("button");
    button.classList.add("close");
    button.type = "button";
    info.appendChild(button);

    const x = document.createElement("span");
    x.setAttribute("aria-hidden", true);
    x.innerHTML = "&times;";
    button.appendChild(x);

    x.addEventListener("click", () => {
        this.root.removeChild(info);
    })

    return info;
}
