import { Navbar } from "../navbar.js";

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

test('new Navbar(parnet)', () => {
    const parent = document.createElement("div")
    const n1 = document.createElement("div")
    parent.appendChild(n1)

    const navbar = new Navbar(parent)

    expect(parent.lastChild).toBe(navbar.root)
});

//describe('member functions', () => {
//    let navbar = null;
//    beforeEach(() => {
//        navbar = new Navbar()
//        navbar.addItem("abc", function() {})
//    });
//
//    test("append(dom)", () => {
//        //const mock_fn = jest.fn()
//        const e = document.createElement("div")
//        navbar.append(e)
//
//        expect(navbar.root.lastChild).toBe(e)
//    })
//
//    test("addItem(text, callback)", () => {
//        navbar.addItem("def", function() {})
//
//        expect(navbar.root.firstChild.lastChild.nodeName).toBe("LI")
//        expect(navbar.root.firstChild.lastChild.classList).toContain("nav-item")
//
//        const li = navbar.root.firstChild.lastChild;
//        expect(li.lastChild.nodeName).toBe("A")
//        expect(li.lastChild.className).toBe("nav-link")
//        expect(li.lastChild.textContent).toBe("def")
//        expect(li.lastChild.style.cursor).toBe("pointer")
//    })
//
//    test("callback of addItem(text, callback)", () => {
//        const mock_fn = jest.fn()
//        navbar.addItem("def", mock_fn)
//
//        navbar.root.firstChild.lastChild.click();
//
//        expect(mock_fn).toHaveBeenCalled();
//    })
//
//    test("addBrand(text, href)", () => {
//        navbar.addBrand("ABC", "xx.xx.xx")
//
//        expect(navbar.root.firstChild.textContent).toBe("ABC")
//        expect(navbar.root.firstChild.className).toBe("navbar-brand")
//        expect(navbar.root.firstChild.getAttribute("href")).toBe("xx.xx.xx")
//    })
//
//    test("resetItem", () => {
//        navbar.resetItem()
//
//        expect(navbar.root.firstChild.childNodes.length).toBe(0)
//    })
//})
