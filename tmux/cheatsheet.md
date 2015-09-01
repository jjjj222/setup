#Configure
- file                          --> ~/.tmux.conf
- re-source configure file      --> <prefix>r

#Info
- list shortcut                 --> <prefix>?
- list commands                 --> :list-commands
- list hotkey                   --> :list-keys
                                --> :list-keys -t vi-copy
#Session
- new session                   --> tmux new -s $NAME
- attach session                --> tmux attach -t $NAME
- rename session                --> :rename-session $NAME
- list session                  --> tmux ls
- choose session                --> <prefix>s

#Window
- new window                    --> <prefix>c
- rename window                 --> <prefix>A
- move window                   --> <prefix>w
- move to previous window       --> <prefix><C-a>

#Pane
- focus pane                    --> <prefix>z
- last pane                     --> <prefix>;

#Reference
- [main page](http://tmux.github.io/)
- [manual](http://www.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man1/tmux.1?query=tmux&sec=1)
