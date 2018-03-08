import sys

#-------------------------------------------------------------------------------
#   Table
#-------------------------------------------------------------------------------
class Table:
    """Draw table"""
    def __init__(self):
        self.align = []
        self.header = []
        self.data = []

    def setHeader(self, header):
        self.header = header
        self.align = ['l' for e in header]

    def setAlign(self, idx, val):
        self.align[idx] = val

    def addRow(self, row):
        self.data.append(row)

    def render(self, ostream=sys.stdout):
        widths = self._calculateWidth()
        self._printLine(ostream, widths)
        self._printRow(ostream, widths, self.header)
        self._printLine(ostream, widths)
        for row in self.data:
            self._printRow(ostream, widths, row)
        self._printLine(ostream, widths)

    #-------------------------------------------------------------------------------
    def _calculateWidth(self):
        widths = [len(elem) for elem in self.header]

        for i in range(len(widths)):
            for row in self.data:
                widths[i] = max(widths[i], len(str(row[i])))

        return widths

    def _printLine(self, ostream, widths):
        ostream.write('+')
        for w in widths:
            ostream.write('-' * w)
            ostream.write('+')
        ostream.write('\n')

    def _printRow(self, ostream, widths, row):
        ostream.write('|')
        for i in range(len(widths)):
            format = '%'
            if self.align[i] == 'l':
                format += '-'
            format += str(widths[i]) + "s"
            ostream.write(format % (row[i]))
            ostream.write('|')
        ostream.write('\n')

