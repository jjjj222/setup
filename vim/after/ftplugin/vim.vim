source $HOME/.vimrc_after

set autoindent
inoremap <CR> <ESC>:call IndentEnterInBrace()<CR>
