class vector:
    def __init__(self, val):
        self.val = val

    def __getitem__(self, idx):
        _M_impl = self.val['_M_impl']
        _M_start = _M_impl['_M_start']
        addr = _M_start + idx
        return addr.dereference()

    def __iter__(self):
        _M_impl = self.val['_M_impl']
        it = _M_impl['_M_start']
        ite = _M_impl['_M_finish']
        while it != ite:
            yield it.dereference()
            it += 1

    def size(self):
        _M_impl = self.val['_M_impl']
        _M_start = _M_impl['_M_start']
        _M_finish = _M_impl['_M_finish']
        return _M_finish - _M_start
