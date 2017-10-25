import gdb
import sys
import os
path = os.path.expanduser('~/.jjjj222_setup/tmux');
path = os.path.realpath(path)
sys.path.insert(1, path)
import tmux

linked_pane = None

class VimTrace(gdb.Command):
    """Trace source code in vim."""

    def __init__ (self):
        super (VimTrace, self).__init__ ("vimtrace", gdb.COMMAND_USER)
        self.is_new_pane = False

    def invoke(self, argv, from_tty):
        global linked_pane

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

        print linked_pane

    def unlink(self):
        global linked_pane

        if linked_pane == None:
            return

        if self.is_new_pane:
            program = linked_pane.get_running_program()
            if program == "vim":
                linked_pane.vim_exec(":qa!")
            linked_pane.shell_exec("exit")
        else:
            print "unlinked from: " + linked_pane.id

        linked_pane = None
        self.is_new_pane = False

    def new_pane(self, target):
        global linked_pane

        if target == None:
            linked_pane = tmux.get_split_window()
            linked_pane.shell_exec("vim")
            self.is_new_pane = True
        else:
            linked_pane = tmux.Pane(target)
            program = linked_pane.get_running_program()
            if program == "":
                linked_pane.shell_exec("vim")
            elif program != "vim":
                print "Error"

            print "linked to: " + linked_pane.id

#class VimTrace(gdb.Command):
#    """Trace source code in vim."""
#
#    def __init__ (self):
#        super (VimTrace, self).__init__ ("vimtrace", gdb.COMMAND_USER)
#        self.is_new_pane = False
#
#    def invoke(self, argv, from_tty):
#        global linked_pane

VimTrace()
