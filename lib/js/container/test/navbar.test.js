import { Navbar } from "../navbar.js";


describe('constructor', () => {
    test('new Navbar()', () => {
        const navbar = new Navbar();

        expect(navbar.root.nodeName).toBe("NAV");
        expect(navbar.root.classList).toContain("navbar");
        expect(navbar.root.classList).toContain("navbar-expand-sm");
        expect(navbar.root.classList).toContain("navbar-dark");

        expect(navbar.root.firstChild.nodeName).toBe("UL");
        expect(navbar.root.firstChild.className).toBe("navbar-nav");

        expect(navbar.root.lastChild.nodeName).toBe("DIV");
        expect(navbar.root.lastChild.className).toBe("ml-auto");
    });

    test('new Navbar(parent)', () => {
        const parent = document.createElement("div");
        parent.innerHTML = "<div>first</div><div>second</div>";

        const navbar = new Navbar(parent);

        expect(parent.lastChild).toBe(navbar.root);
    });
});

describe('member functions', () => {
    let navbar = null;
    beforeEach(() => {
        navbar = new Navbar();
    });

    test("append(DOM)", () => {
        const e = document.createElement("div");
        navbar.append(e);

        expect(navbar.right.lastChild).toBe(e)
    })

    test("addBrand(text, href)", () => {
        navbar.addBrand("ABC", "xx.xx.xx");

        expect(navbar.root.firstChild.textContent).toBe("ABC");
        expect(navbar.root.firstChild.className).toBe("navbar-brand");
        expect(navbar.root.firstChild.getAttribute("href")).toBe("xx.xx.xx");
    })

    test("appendFileInputBtn(text, href)", () => {
        navbar.appendFileInputBtn("ABC", function() {});

        expect(navbar.right.lastChild.nodeName).toBe("FORM");
        expect(navbar.right.lastChild.className).toBe("form-inline");

        const form = navbar.right.lastChild;
        expect(form.firstChild.nodeName).toBe("LABEL");
        expect(form.firstChild.className).toBe("navbar-text");
        expect(form.firstChild.textContent).toBe("No file chosen");
        expect(form.firstChild.style.marginRight).toBe("10px");

        expect(form.lastChild.nodeName).toBe("BUTTON");
        expect(form.lastChild.classList).toContain("btn");
        expect(form.lastChild.classList).toContain("btn-outline-light");
        expect(form.lastChild.style.position).toContain("relative");
        expect(form.lastChild.style.overflow).toContain("hidden");

        const btn = form.lastChild;

        expect(btn.lastChild.nodeName).toBe("INPUT");

        expect(btn.lastChild.style.position).toBe("absolute");
        expect(btn.lastChild.style.top).toBe("0px");
        expect(btn.lastChild.style.right).toBe("0px");
        expect(btn.lastChild.style.minWidth).toBe("100%");
        expect(btn.lastChild.style.minHeight).toBe("100%");
        expect(btn.lastChild.style.outline).toBe("none");
        expect(btn.lastChild.style.opacity).toBe("0");
    });
})
