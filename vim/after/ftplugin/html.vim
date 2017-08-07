source $HOME/.vimrc_after
set tabstop=2
set shiftwidth=2

set autoindent
"set smartindent
"inoremap { {}<ESC>i
"inoremap ( ()<ESC>i
"inoremap [ []<ESC>i
""inoremap <CR> <ESC>:call IndentInBrace()<CR>:startinsert<CR>
inoremap <CR> <ESC>:call IndentEnterInBrace()<CR>
