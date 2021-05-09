# import necessary libraries
# from models import create_classes
import os
from flask import Flask, render_template, jsonify, request, redirect
from sqlalchemy import create_engine
import pandas as pd

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy


# # db = SQLAlchemy(app)
db = create_engine("sqlite:///data/species_database.sqlite")

# create route that renders index.html template
@app.route("/")
def home():

    return render_template("index.html")

@app.route("/api/species")
def species():
    sql = "select * from species"
    species_df = pd.read_sql(sql = sql, con = db)

    species_results = species_df.to_json(orient = "records")
    
    return jsonify(species_results)

@app.route("/api/fungi")
def fungi():
    sql = "select * from fungi"
    fungi_df = pd.read_sql(sql = sql, con = db)

    fungi_results = fungi_df.iloc[:,:].to_json(orient = "records")
    print(fungi_results)
    return jsonify(fungi_results)

@app.route("/api/distribution")
def distribution():
    sql = "select * from distribution"
    distribution_df = pd.read_sql(sql = sql, con = db)

    distribution_results = distribution_df.to_json(orient = "records")

    return jsonify(distribution_results)

if __name__ == "__main__":
    app.run()
