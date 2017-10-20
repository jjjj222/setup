XButton2::
  Winget, id, id, A
  WinSet, ExStyle, ^0x80,  ahk_id %id% ; 0x80 is WS_EX_TOOLWINDOW
Return