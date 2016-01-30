#! /bin/bash

#------------------------------------------------------------------------------
#   initial
#------------------------------------------------------------------------------
ln -s `pwd`                                 ~/.jjjj222_setup

#------------------------------------------------------------------------------
#   bash
#------------------------------------------------------------------------------
ln -s ~/.jjjj222_setup/bash/bashrc          ~/.bashrc
ln -s ~/.jjjj222_setup/bash/bash_profile    ~/.bash_profile

#------------------------------------------------------------------------------
#   csh
#------------------------------------------------------------------------------
ln -s ~/.jjjj222_setup/csh/cshrc            ~/.cshrc
mkdir                                       ~/.cur_dir

#------------------------------------------------------------------------------
#   gdb
#------------------------------------------------------------------------------
ln -s ~/.jjjj222_setup/gdb/gdbinit          ~/.gdbinit

#------------------------------------------------------------------------------
#   git
#------------------------------------------------------------------------------
ln -s ~/.jjjj222_setup/git/gitconfig        ~/.gitconfig

#------------------------------------------------------------------------------
#   tmux
#------------------------------------------------------------------------------
ln -s ~/.jjjj222_setup/tmux/tmux.conf       ~/.tmux.conf

#------------------------------------------------------------------------------
#   screen
#------------------------------------------------------------------------------
ln -s ~/.jjjj222_setup/screen/screenrc      ~/.screenrc

#------------------------------------------------------------------------------
#   vim
#------------------------------------------------------------------------------
ln -s ~/.jjjj222_setup/vim                  ~/.vim
ln -s ~/.vim/vimrc                          ~/.vimrc
ln -s ~/.vim/vimrc_after                    ~/.vimrc_after
mkdir                                       ~/.vim_tmp
mkdir                                       ~/.vim_tmp/backup
mkdir                                       ~/.vim_tmp/swp
mkdir                                       ~/.vim_tmp/undo

git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
vim -c ":PluginInstall"
