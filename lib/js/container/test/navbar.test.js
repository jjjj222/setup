import { Navbar } from "../navbar.js";

test('new Navbar()', () => {
    const navbar = new Navbar()

    expect(navbar.root.nodeName).toBe("NAV")
    expect(navbar.root.classList.contains("navbar")).toBeTruthy()
    expect(navbar.root.classList.contains("navbar-expand-sm")).toBeTruthy()
    expect(navbar.root.classList.contains("navbar-dark")).toBeTruthy()
    expect(navbar.root.classList.contains("bg-primary")).toBeTruthy()

    expect(navbar.front_ul.node().nodeName).toBe("UL")
    expect(navbar.front_ul.node().className).toBe("navbar-nav")
});

test('new Navbar(parnet)', () => {
    const parent = document.createElement("div")
    const n1 = document.createElement("div")
    parent.appendChild(n1)

    const navbar = new Navbar(parent)

    expect(parent.lastChild).toBe(navbar.root)
});

describe('member functions', () => {
    let n = null;
    beforeEach(() => {
        n = new Navbar()
        const mock_fn = jest.fn()
        n.addItem("abc", mock_fn)
    });

    test("addItem(text, callback)", () => {
        const mock_fn = jest.fn()
        n.addItem("def", mock_fn)

        expect(n.front_ul.node().lastChild.textContent).toBe("def")
    })

    test("addBrand(text, href)", () => {
        n.addBrand("ABC", "xx.xx.xx")

        expect(n.root.firstChild.textContent).toBe("ABC")
        expect(n.root.firstChild.getAttribute("href")).toBe("xx.xx.xx")
    })

    test("resetItem", () => {
        n.resetItem()

        expect(n.front_ul.node().childNodes.length).toBe(0)
    })
})
