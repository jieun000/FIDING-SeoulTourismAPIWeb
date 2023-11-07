
from flask import Flask, render_template, jsonify
import csv
import MySQLdb
import datetime


app = Flask(__name__)

# list =[]
with open('KOR.csv') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=',')
    for  idx,row in enumerate(reader):
        conn = MySQLdb.connect(host="localhost", port=3306, user="root", passwd="1234", db="a")
        # 17개 시도
        sql_statement = 'INSERT INTO kor_tbl (date_day,total_cases, total_deaths,total_vaccinations ) VALUES (%s,%s, %s,%s)'

        # 'date_day' 칼럼을 날짜로 변환
        # date_day = datetime.datetime.strptime(row['date_day'], '%Y-%m-%d').date()

        cur = conn.cursor()
        tupled_list= ((row['date_day']),int(row['total_cases']),int(row['total_deaths']),int(row['total_vaccinations']))
        cur.execute(sql_statement,tupled_list)
        conn.escape_string(sql_statement)
        conn.commit()
        if idx%100==0:
            print("진행중 ==========================="+str(idx))


@app.route('/')
def hello():
    return render_template('index2.html', data='성공했어요')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
