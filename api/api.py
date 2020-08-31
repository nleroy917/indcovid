'''
Copyright (c) 2020 indcovid.com
@author: Nathan LeRoy
@contact: NLeRoy917@gmail.com

indcovid.com main api to interface the MySQL database and the UI
'''

import sys
import os
import requests
from apscheduler.schedulers.background import BackgroundScheduler
sys.path.append('../')

from dotenv import load_dotenv
load_dotenv()

MYSQL_URL = os.environ['MYSQL_URL']
MYSQL_USER = os.environ['MYSQL_USER']
MYSQL_PASS = os.environ['MYSQL_PASS']

# import custom classes
try:
    from ..lib.mysqlclient import MySQL
    from ..lib.datafetcher import DataFetcher
except:
    from lib.mysqlclient import MySQL
    from lib.datafetcher import DataFetcher


# import flask
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def fetch_latest_data():
    dir = './tmp/'
    print('Fetching latest data into {} ... '.format(dir), flush=True)
    fetcher = DataFetcher.DataFetcher()
    fetcher.get_latest_data()

# background scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(func=fetch_latest_data, trigger="interval", seconds=21600)
scheduler.start()

# Testing route/main route
@app.route('/')
def api_base():
    return_package={
        'message': "indcovid public api",
        'contact': 'nleroy917@gmail.com',
        'version': 1
    }
    return jsonify(return_package)

@app.route('/data/isdh/full', methods=['GET'])
def get_isdh_dull():
    res = requests.get('https://www.coronavirus.in.gov/map/covid-19-indiana-universal-report-current-public.json')
    return res.json()


@app.route('/data/indiana/county-hospitals', methods=['GET'])
def get_county_hospitals():
    """
    Get county hospital inpatient v outpatient statistics
    """
    mysql = MySQL.MySQL(MYSQL_URL, MYSQL_USER, MYSQL_PASS)
    data = mysql.get_county_hospitals()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/education-geographic', methods=['GET'])
def get_education_geographic():
    """
    Get education statistics by geographic region in Indiana
    """
    mysql = MySQL.MySQL(MYSQL_URL, MYSQL_USER, MYSQL_PASS)
    data = mysql.get_education_geographic()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/expenditure', methods=['GET'])
def get_expenditure():
    """
    Get all expenditure data - WARNING! THIS IS VERY NON PERFORMANT RIGHT NOW!
    """
    mysql = MySQL.MySQL(MYSQL_URL, MYSQL_USER, MYSQL_PASS)
    data = mysql.get_expenditure()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/demographics', methods=['GET'])
def get_demographics():
    """
    Get the most recent demographic data for Indiana
    """
    mysql = MySQL.MySQL(MYSQL_URL, MYSQL_USER, MYSQL_PASS)
    data_raw = mysql.get_demographics()
    demographics_race = []
    demographics_ethnicities = []
    ethnicities = ['Hispanic', 'Not Hispanic or Latino']
    for row in data_raw:
        if row[0] not in ethnicities:
            demographics_race.append({
                'Race': row[0],
                'Percent': row[1],
                'Count': row[2],
                'ID': row[3]
            })
        else:
            demographics_ethnicities.append(
                {
                'Ethnicity': row[0],
                'Percent': row[1],
                'Count': row[2],
                'ID': row[3]  
                }
            )
    demographics_race_sorted = sorted(demographics_race, key=lambda k: k['Race']) 
    race_percentages = [obj['Percent'] for obj in demographics_race_sorted]
    race_labels = [obj['Race'] for obj in demographics_race_sorted]

    demographics_ethnicities_sorted = sorted(demographics_ethnicities, key=lambda k: k['Ethnicity']) 
    ethnicities_percentages = [obj['Percent'] for obj in demographics_ethnicities_sorted]
    ethnicities_labels = [obj['Ethnicity'] for obj in demographics_ethnicities_sorted]

    return_package = {
        'race_data': demographics_race,
        'race_percentages': race_percentages,
        'race_labels': race_labels,
        'ethnicity_data': demographics_ethnicities,
        'ethnicity_percentages': ethnicities_percentages,
        'ethnicity_labels': ethnicities_labels
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/median-house-income', methods=['GET'])
def get_median_house_income():
    """
    Get the median household income statisistic for Indiana. It is organized by county and year.
    """
    mysql = MySQL.MySQL(MYSQL_URL, MYSQL_USER, MYSQL_PASS)
    data = mysql.get_median_income()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/medicaid-funding-source', methods=['GET'])
def get_medicaid_funding_source():
    """
    Get the most common medicaid funding soruces for all medicaid claims
    """
    mysql = MySQL.MySQL(MYSQL_URL, MYSQL_USER, MYSQL_PASS)
    data = mysql.get_medicaid_funding()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/medicaid-race', methods=['GET'])
def get_medicaid_demographics():
    """
    Get the medicaid demographics data
    """
    mysql = MySQL.MySQL(MYSQL_URL, MYSQL_USER, MYSQL_PASS)
    data = mysql.get_medicaid_race()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/covid/demographics', methods=['GET'])
def get_case_demographics():
    """
    Get the covid-19 case demographics for Indiana
    """
    fetcher = DataFetcher.DataFetcher()
    demographics_race = fetcher.read_case_demographics_race()
    demographics_ethnicity = fetcher.read_case_demographics_ethnicity()
    race_labels = []
    ethnicity_labels = []

    for obj in demographics_race:
        # case to change "Black or African American to Black"
        if obj['Race'] == 'Black or African American':
            race_labels.append('Black')
        else:
            race_labels.append(obj['Race'])
    COVID_TEST_RACE = [obj['COVID_TEST'] for obj in demographics_race]
    COVID_COUNT_RACE = [obj['COVID_COUNT'] for obj in demographics_race]
    COVID_DEATHS_RACE = [obj['COVID_DEATHS'] for obj in demographics_race]
    COVID_TEST_PCT_RACE = [obj['COVID_TEST_PCT'] for obj in demographics_race]
    COVID_COUNT_PCT_RACE = [obj['COVID_COUNT_PCT'] for obj in demographics_race]
    COVID_DEATHS_PCT_RACE = [obj['COVID_DEATHS_PCT'] for obj in demographics_race]

    for obj in demographics_ethnicity:
        ethnicity_labels.append(obj['Race'])

    COVID_TEST_ETHNICITY = [obj['COVID_TEST'] for obj in demographics_ethnicity]
    COVID_COUNT_ETHNICITY = [obj['COVID_COUNT'] for obj in demographics_ethnicity]
    COVID_DEATHS_ETHNICITY = [obj['COVID_DEATHS'] for obj in demographics_ethnicity]
    COVID_TEST_PCT_ETHNICITY = [obj['COVID_TEST_PCT'] for obj in demographics_ethnicity]
    COVID_COUNT_PCT_ETHNICITY = [obj['COVID_COUNT_PCT'] for obj in demographics_ethnicity]
    COVID_DEATHS_PCT_ETHNICITY = [obj['COVID_DEATHS_PCT'] for obj in demographics_ethnicity]

    return_package = {
        'race_data': demographics_race,
        'ethnicity_data': demographics_ethnicity,
        'COVID_TEST_RACE': COVID_TEST_RACE,
        'COVID_COUNT_RACE': COVID_COUNT_RACE,
        'COVID_DEATHS_RACE': COVID_DEATHS_RACE,
        'COVID_TEST_PCT_RACE': COVID_TEST_PCT_RACE,
        'COVID_COUNT_PCT_RACE': COVID_COUNT_PCT_RACE,
        'COVID_DEATHS_PCT_RACE': COVID_DEATHS_PCT_RACE,
        'COVID_TEST_ETHNICITY': COVID_TEST_ETHNICITY,
        'COVID_COUNT_ETHNICITY': COVID_COUNT_ETHNICITY,
        'COVID_DEATHS_ETHNICITY': COVID_DEATHS_ETHNICITY,
        'COVID_TEST_PCT_ETHNICITY': COVID_TEST_PCT_ETHNICITY,
        'COVID_COUNT_PCT_ETHNICITY': COVID_COUNT_PCT_ETHNICITY,
        'COVID_DEATHS_PCT_ETHNICITY': COVID_DEATHS_PCT_ETHNICITY,
        'race_labels': race_labels,
        'ethnicity_labels': ethnicity_labels
    }
    del fetcher
    return jsonify(return_package)

@app.route('/data/covid/cdc-demographics-cases', methods=['GET'])
def get_case_demographics_2():
    """
    """
    uri = 'https://data.cdc.gov/resource/k8wy-p9cg.json?fipsstate=18'
    res = requests.get(uri)
    data = res.json()
    return_package = {
        'data': data
    }
    return jsonify(return_package)

@app.route('/data/covid/cdc-demographics-death', methods=['GET'])
def get_case_demographics_3():
    """
    """
    uri = 'https://data.cdc.gov/resource/ks3g-spdg.json?state=Indiana'
    res = requests.get(uri)
    data = res.json()
    races = [
        'White', 'Black', 'American Indian', 'Asian', 'Pacific Islander', 'More than one race', 'Unknown', 'Hispanic'
    ]
    ages = [
         "Under 1 year", "1-4 years", "5-14 years", "15-24 years", "25-34 years", "35-44 years", "45-54 years", "55-64 years", "65-74 years", "75-84 years", "85 years and over"
        ]
    White = []
    Black = []
    AmericanIndian = []
    Asian = []
    PacificIslander = []
    MoreThanOne = []
    Hispanic = []
    Unknown = []
    race_age_data = {
      "Under 1 year": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
      "1-4 years": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
    "5-14 years": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
      "15-24 years": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
      "25-34 years": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
      "35-44 years": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
      "45-54 years": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
      "55-64 years": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
      "65-74 years": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
      "75-84 years": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      },
      "85 years and over": {
          'Non-Hispanic White': 0,
          'Non-Hispanic Black': 0,
          'Non-Hispanic American Indian or Alaska Native': 0,
          'Non-Hispanic Asian': 0,
          'Non-Hispanic Native Hawaiian or Other Pacific Islander': 0,
          'Non-Hispanic More than one race': 0,
          'Hispanic or Latino': 0,
          'Unknown': 0
      }
    }
    # organize the data
    for obj in data:
        if 'total_deaths' in obj:
            race_age_data[obj['age_group']][obj['race_and_hispanic_origin']] += int(obj['total_deaths'])
        else:
            pass

    for age_group in race_age_data:
          White.append(race_age_data[age_group]['Non-Hispanic White'])
          Black.append(race_age_data[age_group]['Non-Hispanic Black'])
          AmericanIndian.append(race_age_data[age_group]['Non-Hispanic American Indian or Alaska Native'])
          Asian.append(race_age_data[age_group]['Non-Hispanic Asian'])
          PacificIslander.append(race_age_data[age_group]['Non-Hispanic Native Hawaiian or Other Pacific Islander'])
          MoreThanOne.append(race_age_data[age_group]['Non-Hispanic More than one race'])
          Hispanic.append(race_age_data[age_group]['Hispanic or Latino'])
          Unknown.append(race_age_data[age_group]['Unknown'])

    return_package = {
        'data_raw': data,
        'data_organized': race_age_data,
        'ages': ages,
        'race_age_data': {
            'White': White,
            'Black': Black,
            'AmericanIndian': AmericanIndian,
            'Asian': Asian,
            'PacificIslander': PacificIslander,
            'MoreThanOne': MoreThanOne,
            'Hispanic': Hispanic,
            'Unknown': Unknown
        }
    }
    return jsonify(return_package)

@app.route('/data/covid/access-to-care', methods=['GET'])
def access_to_care():
    """
    """
    uri = "https://data.cdc.gov/resource/xb3p-q62w.json?state=Indiana"
    res = requests.get(uri)
    data = res.json()
    weeks = []
    delayed = []
    did_not_get = []
    both = []
    for obj in data:
        if obj['week'] not in weeks:
            weeks.append(obj['week'])
        if obj["indicator"] == "Delayed Medical Care, Last 4 Weeks":
            delayed.append(obj['value'])
        elif obj["indicator"] == "Did Not Get Needed Care, Last 4 Weeks":
            did_not_get.append(obj['value'])
        elif obj["indicator"] == "Delayed or Did Not Get Care, Last 4 Weeks":
            both.append(obj['value'])

    return_package = {
        'data': data,
        'weeks': weeks,
        'delayed': delayed,
        'did_not_get': did_not_get,
        'both': both
    }
    return jsonify(return_package)

@app.route('/data/covid/mental-health', methods=['GET'])
def get_mental_health_data():
    """
    """
    uri = 'https://data.cdc.gov/resource/8pt5-q6wp.json?state=Indiana'
    res = requests.get(uri)
    data = res.json()
    
    weeks = []
    depression_values = []
    anxiety_values = []
    depression_anxiety_values = []

    for obj in data:
        if obj['week'] not in weeks:
            weeks.append(obj['week'])

        if obj['indicator'] == 'Symptoms of Depressive Disorder':
            depression_values.append(obj['value'])
        elif obj['indicator'] == 'Symptoms of Anxiety Disorder':
            anxiety_values.append(obj['value'])
        elif obj['indicator'] == 'Symptoms of Anxiety Disorder or Depressive Disorder':
            depression_anxiety_values.append(obj['value'])

    return_package = {
        'data': data,
        'weeks': weeks,
        'depression': depression_values,
        'anxiety': anxiety_values,
        'depression_anxiety': depression_anxiety_values
    }
    return jsonify(return_package)


if __name__ =='__main__':
    app.run()

