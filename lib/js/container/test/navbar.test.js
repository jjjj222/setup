import { Navbar } from "../navbar.js";


describe('constructor', () => {
    test('new Navbar()', () => {
        const navbar = new Navbar()

        expect(navbar.root.nodeName).toBe("NAV")
        expect(navbar.root.classList.contains("navbar")).toBeTruthy()
        expect(navbar.root.classList.contains("navbar-expand-sm")).toBeTruthy()
        expect(navbar.root.classList.contains("navbar-dark")).toBeTruthy()
        expect(navbar.root.classList.contains("bg-primary")).toBeTruthy()

        expect(navbar.root.firstChild.nodeName).toBe("UL")
        expect(navbar.root.firstChild.className).toBe("navbar-nav")
    });

    test('new Navbar(parent)', () => {
        const parent = document.createElement("div")
        parent.innerHTML = "<div>first</div><div>second</div>";

        const navbar = new Navbar(parent)

        expect(parent.lastChild).toBe(navbar.root)
    });
});

describe('member functions', () => {
    let navbar = null;
    beforeEach(() => {
        navbar = new Navbar()
    });

    test("append(DOM)", () => {
        const e = document.createElement("div")
        navbar.append(e)

        expect(navbar.root.lastChild).toBe(e)
    })

    test("addBrand(text, href)", () => {
        navbar.addBrand("ABC", "xx.xx.xx")

        expect(navbar.root.firstChild.textContent).toBe("ABC")
        expect(navbar.root.firstChild.className).toBe("navbar-brand")
        expect(navbar.root.firstChild.getAttribute("href")).toBe("xx.xx.xx")
    })
})
