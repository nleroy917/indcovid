import MySQLdb
from configparser import ConfigParser
import sys

class MySQL():
    """
    Python interface for the mysql database running on AWS EC2.
    """

    def __init__(self,config_file=None, database='indcovid'):
        """
        init function for the class - runs when you create an instance of the class
            :config_file - path to a '.ini' file that has the server crednetials in it... Format of the file should look like this:
                [SERVER]
                URL: <server>
                USER: <username>
                PASS: <password>
            :database [Optional] - name of database to connect to - defaults to 'indcovid'
        """
        if not config_file:
            raise ValueError("Please specify a config file")
        
        # intialize config file
        self._config = ConfigParser()
        self._config.read(config_file)
    
        self._server = self._config.get('SERVER','URL')
        self.database_name = database
        self._user = self._config.get('SERVER','USER')
        self._password = self._config.get('SERVER','PASS')
        self.timeout = 1000
        self._cursor = None
        self._db = None
        try:
            self._db = MySQLdb.connect(
                host=self._server,
                user=self._user,
                passwd=self._password,
                db=self.database_name
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
    
    def test_cnx(self):
        result = self._query('''SELECT 1;''')
        return result  

if __name__ == '__main__':
    pass
