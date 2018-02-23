import { Navbar } from "../navbar.js";


describe('constructor', () => {
    test('new Navbar()', () => {
        const navbar = new Navbar();

        expect(navbar.root.nodeName).toBe("NAV");
        expect(navbar.root.classList).toContain("navbar");
        expect(navbar.root.classList).toContain("navbar-expand-sm");
        expect(navbar.root.classList).toContain("navbar-dark");

        expect(navbar.root.firstChild).toBe(navbar.left);
        expect(navbar.root.firstChild.nodeName).toBe("DIV");

        expect(navbar.root.childNodes[1]).toBe(navbar.center);
        expect(navbar.root.childNodes[1].nodeName).toBe("DIV");
        expect(navbar.root.childNodes[1].className).toBe("mx-auto");

        expect(navbar.root.lastChild).toBe(navbar.right);
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

    test("appendRight(DOM)", () => {
        const e = document.createElement("div");
        navbar.appendRight(e);

        expect(navbar.right.lastChild).toBe(e)
    })

    test("appendLeft(DOM)", () => {
        const e = document.createElement("div");
        navbar.appendLeft(e);

        expect(navbar.left.lastChild).toBe(e)
    })

    test("addBrand(string, href)", () => {
        navbar.addBrand("ABC", "xx.xx.xx");

        expect(navbar.root.firstChild.textContent).toBe("ABC");
        expect(navbar.root.firstChild.className).toBe("navbar-brand");
        expect(navbar.root.firstChild.getAttribute("href")).toBe("xx.xx.xx");
    })

    describe("appendFileInputBtn(string, function(file))", () => {
        test("DOM", () => {
            navbar.appendFileInputBtn("ABC", function() {});

            expect(navbar.right.lastChild.nodeName).toBe("FORM");
            expect(navbar.right.lastChild.className).toBe("form-inline");

            const form = navbar.right.lastChild;
            expect(form.firstChild.nodeName).toBe("LABEL");
            expect(form.firstChild.className).toBe("navbar-text");
            expect(form.firstChild.textContent).toBe("No file chosen");
            expect(form.firstChild.style.marginRight).toBe("10px");

            expect(form.lastChild.nodeName).toBe("SPAN");
            expect(form.lastChild.classList).toContain("btn");
            expect(form.lastChild.classList).toContain("btn-outline-light");
            expect(form.lastChild.style.position).toContain("relative");
            expect(form.lastChild.style.overflow).toContain("hidden");

            const btn = form.lastChild;

            expect(btn.lastChild.nodeName).toBe("INPUT");

            expect(btn.lastChild.title).toBe(" ");
            expect(btn.lastChild.style.position).toBe("absolute");
            expect(btn.lastChild.style.top).toBe("0px");
            expect(btn.lastChild.style.right).toBe("0px");
            expect(btn.lastChild.style.minWidth).toBe("100%");
            expect(btn.lastChild.style.minHeight).toBe("100%");
            expect(btn.lastChild.style.outline).toBe("none");
            expect(btn.lastChild.style.opacity).toBe("0");
        });

        // TODO
        //test("callback", () => {
        //    const mock_fn = jest.fn();
        //    navbar.appendFileInputBtn("ABC", mock_fn);

        //    let evt = new Event('change');
        //    //let event = document.createEvent("HTMLEvents");
        //    //let event = document.createEvent("HTMLEvents");
        //    //event.target = {};
        //    //event.initEvent("change");
        //    //let evt = new CustomEvent("onchange",
        //    //    {
        //    //        type: "onchange",
        //    //        detail: {
        //    //            message: "Hello World!",
        //    //            time: new Date(),
        //    //        },
        //    //        bubbles: true,
        //    //        cancelable: true
        //    //    }
        //    //);
        //    console.log(evt)
        //    //event.target
        //    //event.target.files = [];
        //    //target.files.push({});
        //    //target.files[0].name = "123";
        //    navbar.right.lastChild.lastChild.lastChild.value = "QQQ";
        //    navbar.right.lastChild.lastChild.lastChild.dispatchEvent(evt);

        //    //expect(mock_fn).toHaveBeenCalled();
        //});
    });
})
