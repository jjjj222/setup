#IfWinActive, ahk_class Chrome_WidgetWin_1
^Right::
   send ^{PgDn}
Return
^Left::
   send ^{PgUp}
Return
^PgUp::
   send {PgUp}
Return
^PgDn::
   send {PgDn}
Return
^s::
   send ^t
   sendinput {Raw}chrome-extension://edacconmaakjimmfgnblocblbcdcpbko/main.html
   send {Enter}
Return
^a::
   send ^t
Return