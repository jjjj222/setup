import { Nav } from "../nav.js";
import file from "../nav.js";
const NavItem = file.__get__("NavItem");

describe('constructor', () => {
    test('new NavItem(<li>, Nav', () => {
        const li = new Object();
        const nav = new Object();
        const item = new NavItem(li, nav);

        expect(item.li).toBe(li);
        expect(item.nav).toBe(nav);
    });
});

describe('member funtions', () => {
    let nav = null;
    let item = null;
    beforeEach(() => {
        nav = new Nav();
        item = nav.add("abc", function() {});
    });

    describe('setActive(bool=true)', () => {
        test('specified value', () => {
            item.setActive(true);

            expect(item.li.firstChild.classList).toContain("active");
        });

        test('default value', () => {
            item.setActive();

            expect(item.li.firstChild.classList).toContain("active");
        });
    });

    test('setSingleActive()', () => {
        item.setActive();
        const item_2 = nav.add("def", function() {});

        item_2.setSingleActive();

        expect(item.li.firstChild.classList).not.toContain("active");
        expect(item_2.li.firstChild.classList).toContain("active");
    });
});
