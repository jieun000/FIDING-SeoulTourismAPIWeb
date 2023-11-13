import csv
import MySQLdb
import datetime
loc_code_list=['USA','NAM','KOR','SAM','JPN','CHN','RSI','EEU','WEU','AUS','AFR','SAF','HKO','ASIA']

def string_to_float(s):
    if s=='':
        return 0.0
    else:
        return float(s)
def jieun():
    # list =[]
    for loc_code in loc_code_list:
        with open(f'data_segment_by_loc_code/%s.csv'%loc_code) as csvfile:
            reader = csv.DictReader(csvfile, delimiter=',')
            for  idx,row in enumerate(reader):
                conn = MySQLdb.connect(host="localhost", port=3306, user="root", passwd="1234", db="b")
                # 17개 시도
                sql_statement = f'INSERT INTO %s_tbl'%loc_code +'(date_day, total_cases, total_deaths,people_vaccinated ) VALUES (%s,%s, %s,%s)'

                # 'date_day' 칼럼을 날짜로 변환
                date_day = datetime.datetime.strptime(row['date_day'], '%Y-%m').date()

                cur = conn.cursor()
                tupled_list= (date_day, string_to_float(row['total_cases']), string_to_float(row['total_deaths']), string_to_float(row['people_vaccinated']))
                cur.execute(sql_statement, tupled_list)
                conn.escape_string(sql_statement)
                conn.commit()
                if idx%10==0:
                    print("진행중 ==========================="+str(idx))

if __name__ == '__main__':
    jieun()