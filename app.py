from flask import Flask, render_template, url_for, request, redirect
from functions import *

app = Flask(__name__)

@app.route('/', methods=["POST","GET"])
def index():
    symbol = request.form.get('symbol')
    periodType = request.form.get('periodType')
    period = request.form.get('period')
    try:
        resp = callTest(symbol, periodType, period)
    except:
        resp = ""
    data = { "chartData":resp,
            "symbol":symbol }
    return render_template("index.html", data=data)