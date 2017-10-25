import subprocess
import os

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
def check_output(cmd):
    args = cmd.split()
    proc = subprocess.Popen(args, stdout=subprocess.PIPE)
    output = proc.stdout.read().strip()
    return output

def get_program_name(cmd):
    cmd_list = cmd.split()
    if len(cmd) == 0:
        return ""

    return os.path.basename(cmd_list[0])

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
def get_process_args(cmd):
    tokens = cmd.split()
    args = ['tmux'] + tokens
    return args

def exec_cmd(cmd):
    args = get_process_args(cmd)
    subprocess.call(args)


#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
def split_window():
    exec_cmd('split-window -db')

def list_panes():
    exec_cmd('list-panes')

#-------------------------------------------------------------------------------
def list_panes_id():
    exec_cmd('list-panes -F #{pane_id}')

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
def get_current_pane():
    return os.environ['TMUX_PANE']

def get_list_panes_id():
    output = check_output('tmux list-panes -F #{pane_id}')
    result = output.split()
    return result

def get_list_panes_id_pid():
    output = check_output('tmux list-panes -F #{pane_id}:#{pane_pid}')
    output_list = output.split()
    #result = [tuple(elem.split(':')) for elem in output_list]
    result = dict(map(lambda s : s.split(':'), output_list))
    return result

def get_list_panes_all_id_pid():
    output = check_output('tmux list-panes -a -F #{pane_id}:#{pane_pid}')
    output_list = output.split()
    result = dict(map(lambda s : s.split(':'), output_list))
    return result

def get_split_window_id_pid():
    orig_panes = get_list_panes_id()
    split_window()
    new_panes = get_list_panes_id()
    diff =  set(new_panes) - set(orig_panes)
    id = list(diff)[0]
    pid = get_list_panes_id_pid()[id]
    return id, pid

def get_split_window():
    id, pid = get_split_window_id_pid()
    return Pane(id, pid)

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
class Pane:
    def __init__(self, id, pid=None):
        self.id = id
        self.pid = pid

    def send_keys(self, keys):
        args = ['tmux', 'send-keys', '-t', self.id] + keys
        subprocess.call(args)

    def get_pid(self):
        if self.pid == None:
            self.pid = get_list_panes_all_id_pid()[self.id]

        return self.pid

    def get_running_program(self):
        output = check_output("ps --no-header --ppid %s -o cmd" % self.get_pid())
        program = get_program_name(output)
        return program

    def shell_exec(self, cmd):
        self.send_keys([cmd, 'Enter'])

    def vim_exec(self, cmd):
        self.send_keys([cmd, 'Enter'])


#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
def main():
    p = Pane("%252")
    program = p.get_running_program()
    print get_program_name(program)

if __name__ == "__main__":
    main()
