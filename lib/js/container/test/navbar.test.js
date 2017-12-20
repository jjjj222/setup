import { Navbar } from "../navbar.js";

test('new Navbar()', () => {
    const navbar = new Navbar()

    expect(navbar.root.nodeName).toBe("NAV")
    expect(navbar.root.classList.contains("navbar")).toBeTruthy()
    expect(navbar.root.classList.contains("navbar-expand-sm")).toBeTruthy()
    expect(navbar.root.classList.contains("navbar-dark")).toBeTruthy()
    expect(navbar.root.classList.contains("bg-primary")).toBeTruthy()
});

test('new Navbar(parnet)', () => {
    const parent = document.createElement("div")
    const n1 = document.createElement("div")
    parent.appendChild(n1)

    const navbar = new Navbar(parent)

    expect(parent.lastChild).toBe(navbar.root)
});
