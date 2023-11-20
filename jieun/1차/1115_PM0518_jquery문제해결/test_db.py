from flask import Flask, render_template, request, jsonify, json
import csv
import MySQLdb
import datetime
import mysql.connector

app = Flask(__name__)

@app.route('/')
def hello():
    mysql_config = {
        'user': 'root',
        'password': '1234',
        'host': 'localhost',
        'database': 'a'
    }
    conn = mysql.connector.connect(**mysql_config)
    cursor = conn.cursor()
    cursor.execute("select * from afr_tbl")
    data = cursor.fetchall()
    print(data)
    return render_template('main.html', data=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
