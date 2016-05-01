tell application "Terminal"
    do script ""
    activate
end tell
delay 0.1
tell application "System Events"
    keystroke "tmux"
    key code 76
    delay 0.3
    keystroke "a" using {control down}
    keystroke "c" using {control down}
    delay 0.1
    keystroke "a" using {control down}
    keystroke "S"
    delay 0.1
    key code 51
    key code 51
    key code 51
    key code 51
    keystroke "cool"
    key code 76
end tell
