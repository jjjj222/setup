import utils
import gdb.printing

class NamePrinter:
    """Print a Name object."""

    def __init__(self, val):
        self.val = val

    def to_string(self):
        return self.val["v_"]

class VectorPrinter:
    """Print a Vector object."""

    def __init__(self, val):
        self.val = val

    def to_string(self):
        return utils.call_member_function(self.val, "toBinaryString")

def build_pretty_printer():
    pp = gdb.printing.RegexpCollectionPrettyPrinter( "vector")
    pp.add_printer('Name', '^Ordinal<space::NameTag, std::basic_string<char,.*> >$', NamePrinter)
    pp.add_printer('Vector', '^Vector$', VectorPrinter)
    return pp
