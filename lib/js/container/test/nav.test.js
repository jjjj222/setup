import { Nav } from "../nav.js";

describe('constructor', () => {
    test('new Nav()', () => {
        const nav = new Nav();

        expect(nav.root.nodeName).toBe("UL");
        expect(nav.root.classList).toContain("nav");
        expect(nav.root.classList).toContain("nav-tabs");
        expect(nav.is_add_front).toBe(false);
    });

    test('new Nav(parent)', () => {
        const parent = document.createElement("div")
        parent.innerHTML = "<div>first</div><div>second</div>";

        const nav = new Nav(parent);

        expect(parent.childNodes).toContain(nav.root)
    });
});

describe('member functions', () => {
    let nav = null;
    beforeEach(() => {
        nav = new Nav()
    });

    test('setAddFront(bool)', () => {
        nav.setAddFront(true);

        expect(nav.is_add_front).toBe(true);
    });

    test('setClassName(string)', () => {
        nav.setClassName("abc def");

        expect(nav.root.className).toBe("abc def");
    });

    describe('add(string, function)', () => {
        test('add one item', () => {
            nav.add("abc", function() {});

            expect(nav.root.lastChild.textContent).toBe("abc");
        });

        test('add 2 items with the same name', () => {
            nav.add("abc", function() {});
            nav.add("abc", function() {});

            expect(nav.root.firstChild.textContent).toBe("abc");
            expect(nav.root.lastChild.textContent).toBe("abc");
        });

        test('add front', () => {
            nav.setAddFront(true);

            nav.add("abc", function() {});
            nav.add("def", function() {});

            expect(nav.root.firstChild.textContent).toBe("def");
            expect(nav.root.lastChild.textContent).toBe("abc");
        });

        test('onclick', () => {
            const mock_fn = jest.fn();
            nav.add("abc", mock_fn);

            nav.root.lastChild.click();

            expect(mock_fn).toHaveBeenCalled();
        });

        test('return value', () => {
            const return_value = nav.add("abc", function() {});

            expect(return_value.li).toBe(nav.root.lastChild);
            expect(return_value.nav).toBe(nav);
        });
    });

    test('reset()', () => {
        nav.add("abc", function() {});

        nav.reset();

        expect(nav.root.childNodes.length).toBe(0);
    });

    test('resetAllActive()', () => {
        nav.add("abc", function() {}).setActive();

        expect(nav.root.firstChild.firstChild.classList).toContain("active");

        nav.resetAllActive();

        expect(nav.root.firstChild.firstChild.classList).not.toContain("active");
    });

    test('_createLi(string)', () => {
        const li = nav._createLi("abc");

        expect(li.nodeName).toBe("LI");
        expect(li.className).toBe("nav-item");

        expect(li.firstChild.nodeName).toBe("A");
        expect(li.firstChild.textContent).toBe("abc");
        expect(li.firstChild.style.cursor).toBe("pointer");
    });
});
