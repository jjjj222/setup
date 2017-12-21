import { Navbar } from "../navbar.js";

test('new Navbar()', () => {
    const navbar = new Navbar()

    expect(navbar.root.nodeName).toBe("NAV")
    expect(navbar.root.classList.contains("navbar")).toBeTruthy()
    expect(navbar.root.classList.contains("navbar-expand-sm")).toBeTruthy()
    expect(navbar.root.classList.contains("navbar-dark")).toBeTruthy()
    expect(navbar.root.classList.contains("bg-primary")).toBeTruthy()

    expect(navbar.front_list.nodeName).toBe("UL")
    expect(navbar.front_list.className).toBe("navbar-nav")
});

test('new Navbar(parnet)', () => {
    const parent = document.createElement("div")
    const n1 = document.createElement("div")
    parent.appendChild(n1)

    const navbar = new Navbar(parent)

    expect(parent.lastChild).toBe(navbar.root)
});

describe('member functions', () => {
    let navbar = null;
    beforeEach(() => {
        navbar = new Navbar()
        navbar.addItem("abc", function() {})
    });

    test("append(dom)", () => {
        //const mock_fn = jest.fn()
        const e = document.createElement("div")
        navbar.append(e)

        expect(navbar.root.lastChild).toBe(e)
    })

    test("addItem(text, callback)", () => {
        navbar.addItem("def", function() {})

        expect(navbar.front_list.lastChild.nodeName).toBe("LI")
        expect(navbar.front_list.lastChild.className).toBe("nav-item")

        expect(navbar.front_list.lastChild.lastChild.nodeName).toBe("A")
        expect(navbar.front_list.lastChild.lastChild.className).toBe("nav-link")
        expect(navbar.front_list.lastChild.lastChild.href).toBe("about:blank#")
        expect(navbar.front_list.lastChild.lastChild.textContent).toBe("def")
    })

    test("callback of addItem(text, callback)", () => {
        const mock_fn = jest.fn()
        navbar.addItem("def", mock_fn)

        navbar.front_list.lastChild.click();

        expect(mock_fn).toHaveBeenCalled();
    })

    test("addBrand(text, href)", () => {
        navbar.addBrand("ABC", "xx.xx.xx")

        expect(navbar.root.firstChild.textContent).toBe("ABC")
        expect(navbar.root.firstChild.className).toBe("navbar-brand")
        expect(navbar.root.firstChild.getAttribute("href")).toBe("xx.xx.xx")
    })

    test("resetItem", () => {
        navbar.resetItem()

        expect(navbar.front_list.childNodes.length).toBe(0)
    })
})
