import sys
import os
sys.path.append('../')

from dotenv import load_dotenv
load_dotenv()

MYSQL_URL = os.environ['MYSQL_URL']
MYSQL_USER = os.environ['MYSQL_USER']
MYSQL_PASS = os.environ['MYSQL_PASS']

# import custom classes
from lib.mysqlclient import MySQL


# import flask
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Testing route/main route
@app.route('/')
def api_base():
    return_package={
        'version': 1
    }
    return jsonify(return_package)

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
    data = mysql.get_demographics()
    return_package = {
        'data': data
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

if __name__ =='__main__':
    app.run()

