import MySQLdb
import sys

import time

class MySQL():
    """
    Python interface for the mysql database running on AWS EC2.
    """

    def __init__(self, server, user, password, database='indcovid', port=3306):
        """
        init function for the class - runs when you create an instance of the class
            :config_file - path to a '.ini' file that has the server crednetials in it... Format of the file should look like this:
                [SERVER]
                URL: <server>
                USER: <username>
                PASS: <password>
            :database [Optional] - name of database to connect to - defaults to 'indcovid'
        """
    
        self._server = server
        self.database_name = database
        self._user = user
        self._password = password
        self.timeout = 1000
        self._port = port
        self._cursor = None
        self._db = None

        try:
            self._db = MySQLdb.connect(
                host=self._server,
                user=self._user,
                passwd=self._password,
                db=self.database_name,
                port=self._port
            )
            self._cursor = self._db.cursor()
            print("Connected to database.")
        except Exception as err:
            print("Unable to connect to database.")
            print(err)
            exit(1)
    
    def __del__(self):
        if self._cursor:
            self._cursor.close()
        
    def _query(self,query,data=None):
        '''
        execute a query against the database
            :query - the SQL query to execute (can be parameterized)
            :data - a list of data that needs to be passed to the query if parameterized
            return - the result of the query. A list of lists for each row returned
        '''

        # run query
        if data:
            self._cursor.execute(query,data)
        else:
            self._cursor.execute(query)
            
        # Fetch the data
        data = self._cursor.fetchall()
        
        # Convert data to list for easier manipulation
        result = []     
        for row in data:
        	row = list(row)
        	result.append(row)
        
        return result
    
    def get_county_hospitals(self):
        """
        Query to get the county hospital data on inpatient v outpatient facilities that are available
        """
        query = '''
        SELECT * FROM indcovid.CountyHospitals
        '''
        result = self._query(query)
        return result
    
    def get_education_geographic(self,year=2016):
        """
        Query to get the education attainment statistics based on geographic reagion in indiana.
            The data is so large, that a year must be specified from the following:
            2012, 2013, 2014, 2015, 2016

            It defaults to 2016 - the most recent data
        """
        query = '''
        SELECT * FROM indcovid.EducationGeographic WHERE year = %s'''
        result = self._query(query, data=[year])
        return result
    
    def get_expenditure(self):
        """
        Get the expenditure table days - it is a lot of data. Non-performant and shouldnt be used on the UI
        """
        query = '''
        SELECT * FROM Expenditure
        '''
        result = self._query(query)
        return result
    
    def get_demographics(self):
        """
        Get the most recent demographic data for Indiana on race
        """
        query = '''
        SELECT * FROM indcovid.IndianaDemographics
        '''
        result = self._query(query)
        return result
    
    def get_median_income(self, year=2016):
        """
        Get the median houshold income for a specific year. Defaults to 2016
        """
        query = '''
        SELECT * FROM indcovid.MedianHouseholdIncome
        WHERE year = %s
        '''
        result = self._query(query, data=[year])
        return result
    
    def get_medicaid_funding(self):
        """
        Get the most common funding for medicaid claims
        """
        query = '''
        SELECT * FROM indcovid.MedicaidFundingSource
        '''
        result = self._query(query)
        return result
    
    def get_medicaid_race(self):
        """
        Get the demographics data for mediaid use
        """
        query = '''
        SELECT * FROM indcovid.MedicaidRace
        '''
        result = self._query(query)
        return result
    
    def get_median_rent(self):
        """
        Gets the median rent for specific geographic regions in Indiana. All for the year 2016
        """
        query = '''
        SELECT * FROM indcovid.MedianHouseholdIncome
        '''
        result = self._query(query)
        return result

    
    def bulk_insert(self,query,data):
        self._cursor.executemany(query,data)
        return
    
    def test_cnx(self):
        result = self._query('''SELECT 1;''')
        return result  

if __name__ == '__main__':
    start = time.time()
    mysql = MySQL('../../config/config.ini')
    result = mysql.get_median_rent()
    end = time.time()
    print('{} results returned'.format(len(result)))
    print('Elapsed Time: %10s' % format(end-start))
