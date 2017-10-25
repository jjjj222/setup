import gdb

class ListSourceCode(gdb.Command):
    """List source code."""

    def __init__ (self):
        super (ListSourceCode, self).__init__ ("lss", gdb.COMMAND_USER)

    def invoke (self, argv, from_tty):
        try:
            pc = gdb.selected_frame().pc()
        except:
            print "No code"
            return

        print argv
        print pc
        print gdb.block_for_pc(pc).function
        print gdb.find_pc_line(pc).symtab.fullname()
        print gdb.find_pc_line(pc).symtab.filename
        print gdb.find_pc_line(pc).line

ListSourceCode()
