import requests
import time
import pandas

class DataFetcher():
    """
	Python interface for the CKAN Indiana Coronavirus Data Site.
    URL: https://hub.mph.in.gov/dataset?q=COVID

	"""

    _session = requests.Session()
    _session.headers = {
    	'application': 'IndCovid.com',
    	'User-Agent': 'NLeRoy917@gmail.com',
    	'Content-Type': 'application/json'
    }
    _SLEEP_MIN = 0.2  # Enforce minimum wait time between url calls (seconds)


    def __init__(self, dir='./tmp/', timeout=1000, sleep_time=0.5):
        """
        init DataFetcher Object
            - dir - string - the directory to save files into
            - timeout - int - the time to wait in second before disconnecting download requests
            - sleep_time - float - time to force sleeping
        """

        self.api_base = 'https://hub.mph.in.gov/dataset/'
        self.timeout = timeout
        self.sleep_time = sleep_time
        self._data_sources = {
            'covid-19-demographics': '62ddcb15-bbe8-477b-bb2e-175ee5af8629/resource/2538d7f1-391b-4733-90b3-9e95cd5f3ea6/download/covid_report_demographics.xlsx'
        }
        self.dir = dir

    def get_data(self,dataset):
        """
        Make a call to the url to get the data we want
        """

        uri = self.api_base + self._data_sources.get(dataset)
        try:
            response = self._session.get(uri)
        except requests.Timeout as e:
            print("Timeout raised and caught:\n{e}".format(e=e))
            response = None
        except requests.RequestException as e:
            print("Error raised and caught:\n{e}".format(e=e))
            response = None
        
        # Enforce rate limiting
        time.sleep(max(self._SLEEP_MIN, self.sleep_time))

        return response
    
    def generate_url(self,dataset):
        """
        Generate a url link to an excel file that can be downloaded or passed to pandas to create dataframes
        """
        return self.api_base + self._data_sources.get(dataset)
    
    def get_latest_data(self):
        
        # download the excel file to local storage
        res = self.get_data('covid-19-demographics')
        with open(self.dir + 'covid_19_demographics.xlsx','wb') as xl:
            xl.write(res.content)
    
    def read_case_demographics_race(self):
        df = pandas.read_excel(self.dir + 'covid_19_demographics.xlsx','Race')
        case_demographics = []
        for index, row in df.iterrows():
            case_demographics.append({
                'Race': row['RACE'],
                'COVID_TEST': row['COVID_TEST'],
                'COVID_COUNT': row['COVID_COUNT'],
                'COVID_DEATHS': row['COVID_DEATHS'],
                'COVID_TEST_PCT': row['COVID_TEST_PCT'],
                'COVID_COUNT_PCT': row['COVID_COUNT_PCT'],
                'COVID_DEATHS_PCT': row['COVID_DEATHS_PCT']
            })
        return case_demographics

    def read_case_demographics_ethnicity(self):
        df = pandas.read_excel(self.dir + 'covid_19_demographics.xlsx','Ethnicity')
        case_demographics = []
        for index, row in df.iterrows():
            case_demographics.append({
                'Race': row['ETHNICITY'],
                'COVID_TEST': row['COVID_TEST'],
                'COVID_COUNT': row['COVID_COUNT'],
                'COVID_DEATHS': row['COVID_DEATHS'],
                'COVID_TEST_PCT': row['COVID_TEST_PCT'],
                'COVID_COUNT_PCT': row['COVID_COUNT_PCT'],
                'COVID_DEATHS_PCT': row['COVID_DEATHS_PCT']
            })
        return case_demographics

if __name__ == '__main__':

    # create datafetcher object
    fetcher = DataFetcher()

    # download the excel file to local storage
    res = fetcher.get_data('covid-19-demographics')
    with open('covid_19_demographics.xlsx','wb') as xl:
        xl.write(res.content)

    # open file and read/print data 10 times to assess speed
    for i in range(10):
        df = pandas.read_excel('covid_19_demographics.xlsx','Race')
        print(df)




