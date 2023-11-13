from flask import Flask, render_template, request, jsonify, json
import mysql.connector
import  pandas as pd

app = Flask(__name__)

def to_json2(df,orient='split'):
    df_json = df.to_json(orient = orient, force_ascii = False)
    return json.loads(df_json)
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
    data_list = cursor.fetchall()
    dict_mapping={"0":'date_day',"1":'total_cases',"2":'total_deaths',"3":'people_vaccinated'}
    dict = {}
    for i in data_list:
        for idx, data in enumerate(i):
            key = dict_mapping[str(idx)]
            # print('key',key)
            if key not in dict.keys():
                # print('idx:', idx, 'data:', data)
                dict[key] = []
                dict[key].append(data)
            else:
                dict[key].append(data)

    df = pd.DataFrame(dict)
    json2 = to_json2(pd.DataFrame(df))
    return render_template('chart.html', data=json2)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)