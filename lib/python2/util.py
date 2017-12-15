import os
import subprocess
import time

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
def timestamp():
    result = time.strftime("%Y/%m/%d (%a) %H:%M:%S", time.localtime())
    result = "\033[0;32;40m" + result + "\033[0m"
    return result

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
def run_cmd(ostream, cmd, cwd=None, env=None, with_timestamp=False, show_env=[]):
    print_progress(ostream, cmd, "START", cwd)
    if env:
        print_env(ostream, show_env, env)
    else:
        print_env(ostream, show_env)

    proc = subprocess.Popen(cmd.split(), cwd=cwd, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for line in iter(proc.stdout.readline,''):
        if with_timestamp:
            ostream.write(timestamp())
            ostream.write(" - ")
        ostream.write(line.rstrip())
        ostream.write("\n")

    print_progress(ostream, cmd, "END", cwd)

def run_cmd_oneline(ostream, cmd, cwd=None, env=None, show_env=[]):
    print_progress(ostream, cmd, "CMD", cwd)
    if env:
        print_env(ostream, show_env, env)
    else:
        print_env(ostream, show_env)

    proc = subprocess.Popen(cmd.split(), cwd=cwd, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for line in iter(proc.stdout.readline,''):
        ostream.write(line.rstrip())
        ostream.write("\n")

def print_progress(ostream, cmd, status, dir):
    ostream.write(timestamp())
    ostream.write(" - (%s) " % status)
    ostream.write(cmd)
    if dir:
        ostream.write(" (in ")
        ostream.write(dir)
        ostream.write(")")
    ostream.write("\n")

def print_env(ostream, env_names, env=None):
    if not env:
        env = os.environ

    for e in env_names:
        value = env.get(e)
        if value == None:
            value = "<UNDEFINED>"
        ostream.write("%s = %s\n" % (e, value))

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
def get_real_path(path):
    path = os.path.expanduser(path);
    path = os.path.realpath(path)
    return path

#-------------------------------------------------------------------------------
#   
#-------------------------------------------------------------------------------
def remove_file(filename):
    try:
        os.remove(filename)
    except OSError:
        pass

#-------------------------------------------------------------------------------
#   assert
#-------------------------------------------------------------------------------
def assert_and_get_env(name):
    value = os.environ.get(name);
    if value == None:
        raise SystemExit("Error: No environment variable '%s' !!" % name)
    return value

def assert_exist(filename):
    if not os.path.exists(filename):
        raise SystemExit("'%s' doesn't exist !!" % filename)

def assert_not_exist(filename):
    if os.path.exists(filename):
        raise SystemExit("'%s' already exist !!" % filename)

def assert_isdir(dirname):
    if not os.path.isdir(dirname):
        raise AssertionError("'%s' is not a directory !!" % dirname)

