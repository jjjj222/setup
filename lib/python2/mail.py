import sys
import subprocess

#-------------------------------------------------------------------------------
#   Mail
#-------------------------------------------------------------------------------
class Mail:
    """Control sendmail"""

    def __init__(self):
        self.fr = None
        self.to = None
        self.subject = "Test"
        self.body = "QQ"
        self.format = "text"

    def send(self):
        cmd = "sendmail" + " " + self.to

        ostream = sys.stdout
        #util.run_cmd_oneline(ostream, cmd, None)
        proc = subprocess.Popen(cmd.split(), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        proc.stdin.write("To: " + self.to + "\n")
        proc.stdin.write("From: " + self.fr + "\n")
        proc.stdin.write("Subject: " + self.subject + "\n")

        if self.format == 'html':
            proc.stdin.write("Mime-Version: 1.0\n")
            proc.stdin.write("Content-Type: text/html\n")

        proc.stdin.write("\n")
        proc.stdin.write(self.body + "\n")
        proc.stdin.close()
        for line in iter(proc.stdout.readline,''):
            #if with_timestamp:
            #    ostream.write(timestamp())
            #    ostream.write(" - ")
            ostream.write(line.rstrip())
            ostream.write("\n")
            ostream.flush()
