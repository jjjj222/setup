import { LayoutSwitch } from "../layout_switch.js";
import { Nav } from "../../container/nav.js";

describe('constructor', () => {
    test('new LayoutSwitch()', () => {
        const layout = new LayoutSwitch()

        expect(layout.root.nodeName).toBe("DIV");
        expect(layout.root.style.boxSizing)      .toBe("border-box");
        expect(layout.root.style.height)         .toBe("100%");
        expect(layout.root.style.width)          .toBe("100%");
        expect(layout.root.style.margin)         .toBe("0px");
        expect(layout.root.style.overflow)       .toBe("hidden");
    });

    test('new LayoutSwitch(parent)', () => {
        const parent = document.createElement("div")
        parent.innerHTML = "<div>first</div><div>second</div>";

        const layout = new LayoutSwitch(parent)

        expect(parent.lastChild).toBe(layout.root)
    });
});

describe('member functions', () => {
    let layout = null;
    let nav = null;
    beforeEach(() => {
        const parent = document.createElement("div")
        nav = new Nav();
        layout = new LayoutSwitch(parent, nav);
    });

    describe('add(DOM, string)', () => {
        test('DOM', () => {
            const dom = document.createElement("div")

            const return_value = layout.add(dom, "abc");

            expect(layout.root.lastChild.nodeName).toBe("DIV");
            expect(layout.root.lastChild.style.boxSizing)      .toBe("border-box");
            expect(layout.root.lastChild.style.height)         .toBe("100%");
            expect(layout.root.lastChild.style.width)          .toBe("100%");
            expect(layout.root.lastChild.style.margin)         .toBe("0px");
            expect(layout.root.lastChild.style.overflow)       .toBe("hidden");

            expect(layout.root.lastChild.firstChild).toBe(dom);

            expect(nav.root.childNodes.length).toBe(1);
            expect(nav.root.lastChild.textContent).toBe("abc");
            expect(nav.root.lastChild.firstChild.classList).toContain("active");
        });

        test('return value', () => {
            const dom_1 = document.createElement("div")
            const dom_2 = document.createElement("div")

            layout.add(dom_1, "first");
            const return_value = layout.add(dom_2, "abc");

            expect(layout.root.firstChild.style.display).toBe("");
            expect(layout.root.lastChild.style.display).toBe("");
            expect(nav.root.firstChild.firstChild.classList).toContain("active");
            expect(nav.root.lastChild.firstChild.classList).not.toContain("active");

            return_value();

            expect(layout.root.firstChild.style.display).toBe("none");
            expect(layout.root.lastChild.style.display).toBe("");
            expect(nav.root.firstChild.firstChild.classList).not.toContain("active");
            expect(nav.root.lastChild.firstChild.classList).toContain("active");
        });
    });

    test('_createDiv(DOM)', () => {
        const dom = document.createElement("div")

        const return_value = layout._createDiv(dom);

        expect(return_value.nodeName).toBe("DIV");
        expect(return_value.style.boxSizing)      .toBe("border-box");
        expect(return_value.style.height)         .toBe("100%");
        expect(return_value.style.width)          .toBe("100%");
        expect(return_value.style.margin)         .toBe("0px");
        expect(return_value.style.overflow)       .toBe("hidden");

        expect(return_value.firstChild).toBe(dom);
    });
});
