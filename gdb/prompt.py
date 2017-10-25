from cStringIO import StringIO
import gdb
from color import color

#import pdb
def get_prompt(prompt):
    o = StringIO()

    try:
        frame = str(gdb.selected_frame().name())
        frame = reduce_frame_str(frame)
    except:
        frame = "<no frame>"

    o.write(color('blue'))
    o.write("[")
    o.write(color('cyan'))
    o.write(frame)
    o.write(color('blue'))
    o.write("] ")
    o.write(color('green'))
    o.write("(gdb)")
    o.write(color("end"))
    o.write(" ")

    gdb.execute("vimtracealign")
    return gdb.prompt.substitute_prompt(o.getvalue())


def reduce_frame_str(f):
    begin = f.find('(')
    if begin == -1:
        return f

    end = f.index(')', begin)
    f = f[:begin] + f[end+1:]

    return f

gdb.prompt_hook = get_prompt
