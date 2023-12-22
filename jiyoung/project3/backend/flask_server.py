from flask import Flask, jsonify, request
from flask_cors import CORS ,cross_origin # CORS 추가
import tensorflow as tf
from tensorflow import keras
import os
import cv2
import pickle
import requests

# PTY: 강수형태, REH: 습도( %), RN1: 1시간 강수량(mm), T1H: 기온(℃), UUU: 동서바람성분(m / s):, VEC: 풍향(deg), VVV: 남북바람성분(m / s), WSD: 풍속(m / s),
# MSRSTE_NM: 조회하는 구,
# NO2: 이산화질소농도(ppm), O3: 오존농도(ppm), CO: 일산화탄소농도(ppm), SO2: 아황산가스(ppm), PM10: 미세먼지(㎍ / ㎥), PM25: 초미세먼지(㎍ / ㎥)
# spdValue: 교통 속도, momentDateValue: localTime(현재 날짜와 시간)

app = Flask(__name__)
CORS(app)  # 모든 엔드포인트에 대한 CORS 활성화
# 더미 데이터
loaded_models = {}

#####################################deep 부분


# ESP32 URL
URL = "http://192.168.0.122"

def set_face_detect(url: str, face_detect: int=1):
    try:
        requests.get(url + "/control?var=face_detect&val={}".format(1 if face_detect else 0))
    except:
        print("SET_FACE_DETECT: something went wrong")
    return face_detect
######################################
def pearson_correlation_coefficient(y_true, y_pred):
    mx = tf.reduce_mean(y_true)
    my = tf.reduce_mean(y_pred)
    xm, ym = y_true - mx, y_pred - my
    r_num = tf.reduce_sum(xm * ym)
    r_den = tf.sqrt(tf.reduce_sum(tf.square(xm)) * tf.reduce_sum(tf.square(ym)))
    r = r_num / (r_den + tf.keras.backend.epsilon())
    return tf.reduce_mean(r)
def create_model(shape):
    model = tf.keras.Sequential([
        keras.layers.Dense(32, activation='sigmoid', input_shape=(shape,)),
        keras.layers.Dropout(0.5),
        keras.layers.Dense(64, activation='sigmoid'),
        keras.layers.Dense(1)  # Output layer for regression task
    ])
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
    model.compile(optimizer=optimizer,
                  loss=tf.keras.losses.MSE,
                  metrics=[pearson_correlation_coefficient])
    return model

@app.route('/api/data', methods=['POST','GET'])
@cross_origin()
def get_data():
    api_data = request.get_json()
    print("받아온 데이터:",api_data)

    result = {}
    m_list = ['아황산가스', '일산화탄소', '오존', '이산화질소', 'PM10', 'PM2.5']
    m_code_list = ["SO2", "CO", 'O3', 'NO2', 'PM10', 'PM25']  # 바꿔도 됨 react에서 요청하는 자료 형태로

    try:
        api_data = request.get_json()
        print("받은 데이터:", api_data['spdValue'])
        for m, code in zip(m_list, m_code_list):
            if m in ['아황산가스', '일산화탄소', '오존', '이산화질소']:
                shape = 7
            else:
                shape = 4
            model = create_model(shape)
            model_path = f'C:/Users\Admin\Desktop/fiding\jiyoung\project3/backend/{m}_model_weights.h5'
            model.load_weights(model_path)
            if m in ['아황산가스', '일산화탄소', '오존', '이산화질소']:
                result[code] = float(model.predict([[1,float(api_data['spdValue']),float(api_data['T1H']),float(api_data['WSD']),float(api_data['RN1']),float(api_data['REH']),float(api_data[code])]])[0][0]) # 이부분 data로
            else:result[code] = float(model.predict([[1,float(api_data['spdValue']),float(api_data['T1H']),float(api_data[code])]])[0][0])  # 이부분 data로
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':

    app.run(debug=True)
