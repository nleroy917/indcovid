import pandas as pd

class ExcelReader():
    """
    Python interface to read excel files from disk and make data accessible to other classes and areas of the program
    """

    def __init__(self):
        pass
    
    def read_file(self,file,sheet=None):
        """
        Will read the data from an excel file using pandas and return a dataframe object
            :param - file - the file to rea
            :param - sheet - specific sheet to read if there is one
        """
        if sheet:
            df = pd.read_excel(file,sheet)
        else:
            df = pd.read_excel(file)
        return df
