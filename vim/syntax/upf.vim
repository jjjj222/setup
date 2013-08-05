" Vim syntax file
" Language: upf
" Maintainer: Jjjj222
" Latest Revision:

if exists("b:current_syntax")
  finish
endif

"------------------------------------------------------------------------------
"   Comment
"------------------------------------------------------------------------------

syn keyword upfTodo contained TODO
syn match   upfComment "#.*$" contains=upfTodo

"------------------------------------------------------------------------------
"   Variable
"------------------------------------------------------------------------------

syn match   upfVariable '\w\+'

"------------------------------------------------------------------------------
"   Number
"------------------------------------------------------------------------------

" Integer with - + or nothing in front
syn match   upfNumber '\d\+'
syn match   upfNumber '[-+]\d\+'

" Floating point number with decimal no E or e (+,-)
syn match   upfNumber '\d\+\.\d*'
syn match   upfNumber '[-+]\d\+\.\d*'

" Floating point like number with E and no decimal point (+,-)
syn match   upfNumber '[-+]\=\d[[:digit:]]*[eE][\-+]\=\d\+'
syn match   upfNumber '\d[[:digit:]]*[eE][\-+]\=\d\+'

" Floating point like number with E and decimal point (+,-)
syn match   upfNumber '[-+]\=\d[[:digit:]]*\.\d*[eE][\-+]\=\d\+'
syn match   upfNumber '\d[[:digit:]]*\.\d*[eE][\-+]\=\d\+'


"------------------------------------------------------------------------------
"   Option
"------------------------------------------------------------------------------

syn match   upfOption '-\w\+'

"------------------------------------------------------------------------------
"   Keyword
"------------------------------------------------------------------------------

syn keyword upfVersion          upf_version
syn keyword upfHierarchy        load_upf
syn keyword upfPowerDomain      create_power_domain set_related_supply_net
syn keyword upfSupplySet        create_supply_net create_supply_port connect_supply_net set_domain_supply_net create_power_switch
syn keyword upfPowerState       add_port_state create_pst add_pst_state
syn keyword upfCrossingRule     set_isolation set_isolation_control set_level_shifter
syn keyword upfRetRule          set_retention set_retention_control



"------------------------------------------------------------------------------
"   
"------------------------------------------------------------------------------

let b:current_syntax = "upf"

hi def link upfVersion          Statement
hi def link upfHierarchy        Statement
hi def link upfPowerDomain      Statement
hi def link upfSupplySet        Statement
hi def link upfPowerState       Statement
hi def link upfCrossingRule     Statement
hi def link upfRetRule          Statement
hi def link upfVariable         Normal
hi def link upfNumber           Constant
hi def link upfTodo             Todo
hi def link upfComment          Comment
hi def link upfOption           Type


"highlight upfPowerDomain        ctermfg=cyan
