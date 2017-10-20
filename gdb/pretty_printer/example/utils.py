import gdb.printing

def call_member_function(val, function):
    type_str = str(val.type)
    if type_str[-1] == '&':
        type_str = type_str[:-1]

    eval_string = "(*("+type_str+"*)("+str(val.address)+"))." + function + "()"
    return gdb.parse_and_eval(eval_string);
