import csv
import MySQLdb
import datetime

def jieun():
    # list =[]
    with open('AFR.csv') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=',')
        for  idx,row in enumerate(reader):
            conn = MySQLdb.connect(host="localhost", port=3306, user="root", passwd="1234", db="a")
            # 17개 시도
            sql_statement = 'INSERT INTO afr_tbl (date_day, total_cases, total_deaths,people_vaccinated ) VALUES (%s,%s, %s,%s)'

            # 'date_day' 칼럼을 날짜로 변환
            date_day = datetime.datetime.strptime(row['date_day'], '%Y-%m-%d').date()

            cur = conn.cursor()
            tupled_list= (date_day, int(row['total_cases']), int(row['total_deaths']), int(row['people_vaccinated']))
            cur.execute(sql_statement, tupled_list)
            conn.escape_string(sql_statement)
            conn.commit()
            if idx%10==0:
                print("진행중 ==========================="+str(idx))

if __name__ == '__main__':
    jieun()