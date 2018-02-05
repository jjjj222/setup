export function set_readonly(obj, property_name, val) {
    Object.defineProperty(obj, property_name, {
        value: (typeof val != "undefined") ? val : obj[property_name],
        writable: false,
    })
}
