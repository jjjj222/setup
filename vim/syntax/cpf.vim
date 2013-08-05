" Vim syntax file
" Language: cpf
" Maintainer: Jjjj222
" Latest Revision:

if exists("b:current_syntax")
  finish
endif

"------------------------------------------------------------------------------
"   Comment
"------------------------------------------------------------------------------

syn keyword cpfTodo contained TODO
syn match   cpfComment "#.*$" contains=upfTodo

"------------------------------------------------------------------------------
"   Variable
"------------------------------------------------------------------------------

syn match   cpfVariable '\w\+'

"------------------------------------------------------------------------------
"   Number
"------------------------------------------------------------------------------

" Integer with - + or nothing in front
syn match   cpfNumber '\d\+'
syn match   cpfNumber '[-+]\d\+'

" Floating point number with decimal no E or e (+,-)
syn match   cpfNumber '\d\+\.\d*'
syn match   cpfNumber '[-+]\d\+\.\d*'

" Floating point like number with E and no decimal point (+,-)
syn match   cpfNumber '[-+]\=\d[[:digit:]]*[eE][\-+]\=\d\+'
syn match   cpfNumber '\d[[:digit:]]*[eE][\-+]\=\d\+'

" Floating point like number with E and decimal point (+,-)
syn match   cpfNumber '[-+]\=\d[[:digit:]]*\.\d*[eE][\-+]\=\d\+'
syn match   cpfNumber '\d[[:digit:]]*\.\d*[eE][\-+]\=\d\+'


"------------------------------------------------------------------------------
"   Option
"------------------------------------------------------------------------------

syn match   cpfOption '-\w\+'


"------------------------------------------------------------------------------
"   String
"------------------------------------------------------------------------------

syn region cpfString oneline start='"' end='"'


"------------------------------------------------------------------------------
"   Fold
"------------------------------------------------------------------------------

syn region cpfDesignBlock start="set_design" end="end_design" fold transparent


"------------------------------------------------------------------------------
"   Keyword
"------------------------------------------------------------------------------

syn keyword cpfVersion          set_cpf_version
syn keyword cpfHierarchy        set_hierarchy_separator include set_instance
syn keyword cpfLibrary          define_library_set define_isolation_cell
syn keyword cpfPowerDomain      create_power_domain update_power_domain identify_secondary_domain
syn keyword cpfSupplySet        create_power_nets create_ground_nets
syn keyword cpfPowerState       create_nominal_condition create_power_mode update_nominal_condition
syn keyword cpfCrossingRule     create_isolation_rule update_isolation_rules create_level_shifter_rule update_level_shifter_rules


"------------------------------------------------------------------------------
"   
"------------------------------------------------------------------------------

let b:current_syntax = "cpf"

hi def link cpfVersion          Statement
hi def link cpfHierarchy        Statement
hi def link cpfLibrary          Statement
hi def link cpfPowerDomain      Statement
hi def link cpfSupplySet        Statement
hi def link cpfPowerState       Statement
hi def link cpfCrossingRule     Statement
hi def link cpfVariable         Normal
hi def link cpfNumber           Constant
hi def link cpfString           Constant
hi def link cpfTodo             Todo
hi def link cpfComment          Comment
hi def link cpfOption           Type


"highlight upfPowerDomain        ctermfg=cyan
