import gdb.printing

class OstringstreamPrinter:
    """Print a std::ostringstream object."""

    def __init__(self, val):
        self.val = val

    def display_hint(self):
        return 'string'

    def to_string(self):
        return str(self.val.type) + " ... (TODO)"


def build_pretty_printer():
    pp = gdb.printing.RegexpCollectionPrettyPrinter( "my.std")
    pp.add_printer('std::ostringstream', '^std::basic_ostringstream<char, std::char_traits<char>, std::allocator<char> >$', OstringstreamPrinter)
    return pp
