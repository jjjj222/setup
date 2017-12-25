
import { LayoutRow } from "../layout_row.js";

describe('constructor', () => {
    test('new LayoutRow()', () => {
        const layout = new LayoutRow()

        expect(layout.root.nodeName).toBe("DIV")
        //expect(navbar.root.nodeName).toBe("NAV")
        //expect(navbar.root.classList.contains("navbar")).toBeTruthy()
        //expect(navbar.root.classList.contains("navbar-expand-sm")).toBeTruthy()
        //expect(navbar.root.classList.contains("navbar-dark")).toBeTruthy()
        //expect(navbar.root.classList.contains("bg-primary")).toBeTruthy()

        //expect(navbar.front_ul.node().nodeName).toBe("UL")
        //expect(navbar.front_ul.node().className).toBe("navbar-nav")
    })
});
