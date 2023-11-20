# Flask 모듈에서 필요한 클래스 및 함수들을 임포트합니다. 
from flask import Flask, render_template, request, json
# Flask: Flask 웹 애플리케이션을 생성하기 위한 클래스
# render_template: HTML 템플릿을 렌더링하는 함수
# request: HTTP 요청을 다루는 객체
# json: JSON 데이터를 처리하는 모듈
import pandas as pd
from sql_func import from_sql
from dataPreprocessing.a_init_data import loc_code_list

# Flask 애플리케이션을 생성하고 app 변수에 할당
app = Flask(__name__)

date_loc_data_dict = {}


# 루트 경로에 대한 라우트를 정의. 즉, 홈페이지에 접속했을 때 실행될 함수를 지정
@app.route('/') # 홈페이지에 접속했을 때 실행
def start():
    # 전역 변수 date_loc_data_dict
    global date_loc_data_dict
    # sql_func 모듈의 from_sql함수(전역변수, a_init_data 모듈의 지역 리스트)
    from_sql(date_loc_data_dict, loc_code_list)
    return render_template('main.html') # HTML 템플릿을 불러와서 필요한 데이터를 템플릿에 전달


# 데이터프레임을 특정 방식(기본값은 'split')으로 JSON으로 변환하는 함수
def to_json2(df, orient='split'):
    # 데이터프레임을 JSON 형식으로 변환, orient='데이터의 방향'
    # force_ascii=False: ASCII 문자만을 사용하여 JSON을 생성하는데, False로 설정하면 유니코드 문자를 사용할 수 있음.
    df_json = df.to_json(orient=orient, force_ascii=False)
    # JSON 문자열을 Python 객체로 로드하여 반환
    return json.loads(df_json)


@app.route('/ajax')
def hello():
    global date_loc_data_dict
    # 클라이언트로부터 'month' 매개변수를 받아옴
    month_idx = int(request.args.get('month'))
    print(month_idx)
    # date_loc_data_dict에서 모든 날짜를 추출하여 리스트로 변환
    date = date_loc_data_dict.keys()
    # 클라이언트에서 요청한 월에 해당하는 날짜의 데이터를 가져옴
    loc_data_dict_by_date = date_loc_data_dict[list(date)[month_idx]]
    json2_list = [] # 각 지역의 데이터를 JSON 형식으로 저장할 리스트 초기화
    for loc_code in loc_code_list: # 모든 지역 코드에 대해서 반복
        # 해당 지역 코드의 데이터를 Pandas DataFrame으로 변환
        df=pd.DataFrame([loc_data_dict_by_date[loc_code]]) 
        # DataFrame을 JSON 형식으로 변환한 후 리스트에 추가
        json2_list.append(to_json2(pd.DataFrame(df)))
    # 전체 지역에 대한 데이터를 DataFrame으로 변환하고 행과 열을 바꿈
    result_df = pd.DataFrame(loc_data_dict_by_date).T
    print(result_df)
    # DataFrame을 JSON 형식으로 변환 ('index' 방식 사용)
    json_result = result_df.to_json(orient='index')
    # 생성된 JSON 객체를 클라이언트에게 응답으로 반환
    return json_result


# app = Flask(__name__)
if __name__ == '__main__':
    # app 실행
    app.run(host='0.0.0.0', port=5000, debug=False)
