import requests
import time

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


    def __init__(self, timeout=1000, sleep_time=0.5):
        """
        init DataFetcher Object
        """

        self.api_base = 'https://hub.mph.in.gov/dataset/'
        self.timeout = timeout
        self.sleep_time = sleep_time

    def get_data(self,dataset):
        """
        Make a call to the url to get the data we want
        """

        uri = self.api_base + dataset
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



