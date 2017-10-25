import gdb
import sys
import os
path = os.path.expanduser('~/.jjjj222_setup/tmux');
path = os.path.realpath(path)
sys.path.insert(1, path)
import tmux

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
linked_pane = None
is_new_pane = False

def close_new_pane():
    global linked_pane, is_new_pane

    if linked_pane == None:
        return

    program = linked_pane.get_running_program()
    if program == "vim":
        linked_pane.vim_exec(":qa!")
    linked_pane.shell_exec("exit")

    linked_pane = None
    is_new_pane = False

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
class VimTrace(gdb.Command):
    """Trace source code in vim."""

    def __init__ (self):
        super (VimTrace, self).__init__ ("vimtrace", gdb.COMMAND_USER)

    def invoke(self, argv, from_tty):
        global linked_pane, is_new_pane

        argv = str(argv).split()
        if len(argv) == 0:
            target = None
        else:
            target = argv[0]


        if linked_pane == None:
            self.new_pane(target)
        else:
            self.unlink()
            if target != None:
                self.new_pane(target)

    def unlink(self):
        global linked_pane, is_new_pane

        if linked_pane == None:
            return

        if not is_new_pane:
            print "unlinked from: " + linked_pane.id

        close_new_pane()

    def new_pane(self, target):
        global linked_pane, is_new_pane

        if target == None:
            linked_pane = tmux.get_split_window()
            linked_pane.shell_exec("vim .")
            linked_pane.vim_exec(":set cursorline")

            is_new_pane = True
        else:
            linked_pane = tmux.Pane(target)
            program = linked_pane.get_running_program()
            if program == "":
                linked_pane.shell_exec("vim .")
            elif program != "vim":
                linked_pane = None
                print "link error: not running vim !!"
                return

            print "linked to: " + linked_pane.id


#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
class VimTraceExit(gdb.Command):
    """Exit trace source code in vim."""

    def __init__ (self):
        super (VimTraceExit, self).__init__ ("vimtraceexit", gdb.COMMAND_USER)

    def invoke(self, argv, from_tty):
        close_new_pane()


#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
class VimTraceAlign(gdb.Command):
    """Trace source code in vim."""

    def __init__ (self):
        super (VimTraceAlign, self).__init__ ("vimtracealign", gdb.COMMAND_USER)
        self.current_file = None

    def invoke(self, argv, from_tty):
        global linked_pane

        if linked_pane == None:
            return

        if not linked_pane.is_vim():
            print "Not vim"
            return

        try:
            pc = gdb.selected_frame().pc()
            #print argv
            #print pc
            #print gdb.block_for_pc(pc).function
            fullname = gdb.find_pc_line(pc).symtab.fullname()
            #print fullname
            #print gdb.find_pc_line(pc).symtab.filename
            line = str(gdb.find_pc_line(pc).line)
            #print line
        except:
            return

        if self.current_file != fullname:
            self.current_file = fullname
            linked_pane.vim_exec(":view +" + line + " " + fullname)
        else:
            linked_pane.vim_exec(":" + line)

        linked_pane.send_key("zz")


#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
VimTrace()
VimTraceExit()
VimTraceAlign()
