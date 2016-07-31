source $HOME/.vimrc_after
set expandtab
set tabstop=4
set shiftwidth=4

set autoindent
"set smartindent
inoremap { {}<ESC>i
inoremap ( ()<ESC>i
inoremap [ []<ESC>i
""inoremap <CR> <ESC>:call IndentInBrace()<CR>:startinsert<CR>
inoremap <CR> <ESC>:call IndentEnterInBrace()<CR>
