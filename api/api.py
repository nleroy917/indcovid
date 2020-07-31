import sys
sys.path.append('../')

CONFIG_FILE = '../config/config.ini'

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
"""
Get county hospital inpatient v outpatient statistics
"""
def get_county_hospitals():
    mysql = MySQL.MySQL(CONFIG_FILE)
    data = mysql.get_county_hospitals()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/education-geographic', methods=['GET'])
"""
Get education statistics by geographic region in Indiana
"""
def get_education_geographic():
    mysql = MySQL.MySQL(CONFIG_FILE)
    data = mysql.get_education_geographic()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/expenditure', methods=['GET'])
"""
Get all expenditure data - WARNING! THIS IS VERY NON PERFORMANT RIGHT NOW!
"""
def get_expenditure():
    mysql = MySQL.MySQL(CONFIG_FILE)
    data = mysql.get_expenditure()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/demographics', methods=['GET'])
"""
Get the most recent demographic data for Indiana
"""
    mysql = MySQL.MySQL(CONFIG_FILE)
    data = mysql.get_demographics()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/median-house-income', methods=['GET'])
"""
Get the median household income statisistic for Indiana. It is organized by county and year.
"""
    mysql = MySQL.MySQL(CONFIG)
    data = mysql.get_median_income()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

@app.route('/data/indiana/medicaid-funding-source', methods=['GET'])
"""
Get the most common medicaid funding soruces for all medicaid claims
"""
    mysql = MySQL.MySQL(CONFIG)
    data = mysql.get_medicaid_funding()
    return_package = {
        'data': data
    }
    del mysql
    return jsonify(return_package)

