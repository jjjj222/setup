#Session
- new session                   --> tmux new -s $NAME
- attach session                --> tmux attach -t $NAME
- rename session                --> :rename-session $NAME
- list session                  --> tmux ls
- choose session                --> <prefix>s

#Info
- list commands                 --> :list-commands
- list hotkey                   --> :list-keys
                                --> :list-keys -t vi-copy
