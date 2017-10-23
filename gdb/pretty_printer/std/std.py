class vector:
    def __init__(self, val):
        self.val = val

    def __getitem__(self, idx):
        _M_impl = self.val['_M_impl']
        _M_start = _M_impl['_M_start']
        addr = _M_start + idx
        return addr.dereference()
