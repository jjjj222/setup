from collections import defaultdict

color_code_template = "\[\e[0;3%dm\]"
end_code = "\[\e[0m\]"

color_2_code = defaultdict(lambda: 7)
color_2_code['black'] = 0
color_2_code['red'] = 1
color_2_code['green'] = 2
color_2_code['yellow'] = 3
color_2_code['blue'] = 4
color_2_code['megenta'] = 5
color_2_code['cyan'] = 6
color_2_code['white'] = 7

def color(c):
    if c == "end":
        return end_code

    code = color_2_code[c]

    return color_code_template % code
