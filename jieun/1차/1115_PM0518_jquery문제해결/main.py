from flask import Flask, render_template, request, jsonify, json
import mysql.connector
import  pandas as pd
import datetime
from sql_func import from_sql
from init_data import loc_code_list

app = Flask(__name__)

date_loc_data_dict = {}

def to_json2(df,orient='split'):
    df_json = df.to_json(orient = orient, force_ascii = False)
    return json.loads(df_json)
@app.route('/')
def start():
    dict_mapping = ['date_day','loc_code', 'total_cases', 'total_deaths', 'people_vaccinated','population']
    global date_loc_data_dict
    from_sql(date_loc_data_dict,loc_code_list)
    loc_data_dict_init_date=date_loc_data_dict[datetime.date(2021, 9, 1)]
    json2_list=[]
    for loc_code in loc_code_list:
        df=pd.DataFrame([loc_data_dict_init_date[loc_code]])
        json2_list.append(to_json2(pd.DataFrame(df)))
    print(loc_data_dict_init_date['USA'])
    return render_template('main.html')#, data0=json2_list[0],data1=json2_list[1],data2=json2_list[2],data3=json2_list[3],
    #                        data4=json2_list[4],data5=json2_list[5],data6=json2_list[6],data7=json2_list[7],data8=json2_list[8]
    #                        ,data9=json2_list[9],data10=json2_list[10],data11=json2_list[11])
@app.route('/ajax')
def hello():
    dict_mapping = ['date_day','loc_code', 'total_cases', 'total_deaths', 'people_vaccinated','population']
    global date_loc_data_dict
    year = request.args.get('chk')
    print(year)
    month_idx = 0#request.args.get('month')
    date=date_loc_data_dict.keys()
    loc_data_dict_by_date=date_loc_data_dict[list(date)[month_idx]]
    json2_list=[]
    for loc_code in loc_code_list:
        df=pd.DataFrame([loc_data_dict_by_date[loc_code]])
        json2_list.append(to_json2(pd.DataFrame(df)))
    result_df = pd.DataFrame(loc_data_dict_by_date).T
    print(result_df)
    json_result = result_df.to_json(orient='index')
    return json_result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
