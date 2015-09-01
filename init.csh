#! /bin/csh
ln -s . ~/.jjjj222_setup

ln -s ~/.jjjj222_setup/bash/bash_profile    ~/.bash_profile

ln -s ~/.jjjj222_setup/csh/cshrc            ~/.cshrc

ln -s ~/.jjjj222_setup/gdb/gdbinit          ~/.gdbinit

ln -s ~/.jjjj222_setup/git/gitconfig        ~/.gitconfig

ln -s ~/.jjjj222_setup/vim                  ~/.vim
ln -s ~/.vim/vimrc                          ~/.vimrc
ln -s ~/.vim/vimrc_after                    ~/.vimrc_after
mkdir ~/.vim_tmp
mkdir ~/.vim_tmp/backup
mkdir ~/.vim_tmp/swp
mkdir ~/.vim_tmp/undo
mkdir bundle
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
vim -c ":PluginInstall"
