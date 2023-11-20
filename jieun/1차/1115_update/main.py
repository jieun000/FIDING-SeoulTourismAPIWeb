from flask import Flask, render_template, request, jsonify, json
# import mysql.connector
# import pandas as pd
# import datetime
# from sql_func import from_sql
# from init_data import loc_code_list

app = Flask(__name__)

date_loc_data_dict = {}
def to_json2(df,orient='split'):
    df_json = df.to_json(orient = orient, force_ascii = False)
    return json.loads(df_json)

@app.route('/')
def run():
    return render_template('main.html')

# @app.route('/ajax')
# def hello():
#     dict_mapping = ['date_day','loc_code', 'total_cases', 'total_deaths', 'people_vaccinated','population']
#     global date_loc_data_dict
#     loc_data_dict_rand=date_loc_data_dict[datetime.date(2021, 9, 1)]
#     json2_list=[]
#     for loc_code in loc_code_list:
#         df=pd.DataFrame([loc_data_dict_rand[loc_code]])
#         json2_list.append(to_json2(pd.DataFrame(df)))
#     print(loc_data_dict_rand['USA'])
#     return render_template('main.html', usa_data=json2_list[0])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
