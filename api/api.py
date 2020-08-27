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
    demographics = []
    for row in data_raw:
        demographics.append({
            'Race': row[0],
            'Percent': row[1],
            'Count': row[2],
            'ID': row[3]
        })
    percentages = [obj['Percent'] for obj in demographics]
    labels = [obj['Race'] for obj in demographics]
    return_package = {
        'data': demographics,
        'percentages': percentages,
        'labels': labels
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
    demographics = fetcher.read_case_demographics()
    labels = [obj['Race'] for obj in demographics]
    COVID_TEST = [obj['COVID_TEST'] for obj in demographics]
    COVID_COUNT = [obj['COVID_COUNT'] for obj in demographics]
    COVID_DEATHS = [obj['COVID_DEATHS'] for obj in demographics]
    COVID_TEST_PCT = [obj['COVID_TEST_PCT'] for obj in demographics]
    COVID_COUNT_PCT = [obj['COVID_COUNT_PCT'] for obj in demographics]
    COVID_DEATHS_PCT = [obj['COVID_DEATHS_PCT'] for obj in demographics]
    return_package = {
        'data': demographics,
        'COVID_TEST': COVID_TEST,
        'COVID_COUNT': COVID_COUNT,
        'COVID_DEATHS': COVID_DEATHS,
        'COVID_TEST_PCT': COVID_TEST_PCT,
        'COVID_COUNT_PCT': COVID_COUNT_PCT,
        'COVID_DEATHS_PCT': COVID_DEATHS_PCT,
        'labels': labels
    }
    del fetcher
    return jsonify(return_package)

@app.route('/data/covid/demographics-2', methods=['GET'])
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

@app.route('/data/covid/demographics-3', methods=['GET'])
def get_case_demographics_3():
    """
    """
    uri = 'https://data.cdc.gov/resource/ks3g-spdg.json?state=Indiana'
    res = requests.get(uri)
    data = res.json()
    return_package = {
        'data': data
    }
    return jsonify(return_package)

if __name__ =='__main__':
    app.run()

