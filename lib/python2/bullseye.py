import os
import sys

# my lib
import util

#-------------------------------------------------------------------------------
#   Bullseye
#-------------------------------------------------------------------------------
class Bullseye:
    """Control Bullseye"""

    def __init__(self, build_zone):
        self.build_zone = build_zone
        self.cov_file = os.path.join(self.build_zone, "bullseye.cov")
        self.region_file = self.cov_file + ".region"
        self.html_folder = self.cov_file + ".html"
        self.csv_file = self.cov_file + ".csv"
        self.bin = util.get_real_path("~/tools/Bullseye/linux/linux64/8.13.20/bin")
        self.cov01 = os.path.join(self.bin, "cov01")
        self.covselect = os.path.join(self.bin, "covselect")
        self.covhtml = os.path.join(self.bin, "covhtml")
        self.covsrc = os.path.join(self.bin, "covsrc")

    def on(self):
        cmd = self.cov01 + " --on"
        env = os.environ.copy()
        env["COVFILE"] = self.cov_file
        env["COVBUILDZONE"] = self.build_zone
        show_env = ["COVFILE", "COVBUILDZONE"]

        ostream = sys.stdout
        util.run_cmd_oneline(ostream, cmd, None, env, show_env)

    def off(self):
        cmd = self.cov01 + " --off"
        env = os.environ.copy()
        env["COVFILE"] = self.cov_file
        env["COVBUILDZONE"] = self.build_zone
        show_env = ["COVFILE", "COVBUILDZONE"]

        ostream = sys.stdout
        util.run_cmd_oneline(ostream, cmd, None, env, show_env)

    def apply_region(self):
        cmd = self.covselect + " --file " + self.cov_file + " --import " + self.region_file

        show_env = []

        ostream = sys.stdout
        util.run_cmd_oneline(ostream, cmd, None, None, show_env)

    def generate_html(self):
        cmd = self.covhtml + " --file " + self.cov_file + " " + self.html_folder

        show_env = []

        ostream = sys.stdout
        util.run_cmd_oneline(ostream, cmd, None, None, show_env)

    def generate_csv(self):
        cmd = self.covsrc + " --file " + self.cov_file + " --csv --quiet"
        cwd = self.build_zone

        show_env = []

        print "Create bullseye result csv file:", self.csv_file
        ostream = open(self.csv_file, 'w')
        util.run_cmd_no_progress(ostream, cmd=cmd, cwd=cwd)

    def create_region_file(self):
        print "Create bullseye region file:", self.region_file
        ostream = open(self.region_file, 'w')
        ostream.write("exclude folder obj_*/\n")
        ostream.write("exclude folder ../*\n")

    def create_region_file_2(self):
        print "Create bullseye region file:", self.region_file
        ostream = open(self.region_file, 'w')
        ostream.write("exclude all /\n")
        ostream.write("include folder simulator/\n")
        ostream.write("include folder vector/\n")
        ostream.write("exclude folder vector/obj_*/\n")
        #ostream.write("exclude folder obj_*/\n")
        #ostream.write("exclude folder ../*\n")
        #ostream.write("exclude folder ../*\n")
        #ostream.write("exclude folder basic/\n")
        #ostream.write("exclude folder chipConfig/\n")
        #ostream.write("exclude folder configData/\n")
        #ostream.write("exclude folder filelist/\n")
        #ostream.write("exclude folder msg/\n")
        #ostream.write("exclude folder netlist/\n")
        #ostream.write("exclude folder orcl/\n")
        #ostream.write("exclude folder physDesign/\n")
        #ostream.write("exclude folder pkgTool/\n")
        #ostream.write("exclude folder vector/obj_*/\n")

    def remove_cov_file(self):
        util.remove_file(self.cov_file)

    def remove_region_file(self):
        util.remove_file(self.region_file)
