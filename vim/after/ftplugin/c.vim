" OmniCppComplete initialization
call omni#cpp#complete#Init()

source ~/.vimrc_after

set autoindent
inoremap <CR> <ESC>:call IndentEnterInBrace()<CR>
