import gdb

class Executor:
    def __init__(self, cmd):
        self.__cmd = cmd

    def __call__(self):
        gdb.execute(self.__cmd)

def stop_handler (event):
    try:
        frame = str(gdb.selected_frame().name())
    except:
        frame = "<no frame>"

    if "@plt" in frame:
        gdb.execute("continue")

gdb.events.stop.connect (stop_handler)
