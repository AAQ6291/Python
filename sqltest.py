# 資料庫Connect , Class寫法
import pymssql


class MSSQL:
    def __init__(self, host, user, pwd, db):
        self.host = host  # Server
        self.user = user  # user
        self.pwd = pwd  # pwd
        self.db = db  # database

    def __GetConnect(self):
        try:
            self.conn = pymssql.connect(
                host=self.host, user=self.user, password=self.pwd, database=self.db, charset="utf8")
            cur = self.conn.cursor()
        except Exception as ex:
            if not self.db:
                raise "沒有設定資料庫資訊"
            elif not cur:
                raise "連結資料庫失敗"
            else:
                return cur
            self.conn.rollback()
            raise ex
        finally:
            return cur
            # self.conn.close()

    # 執行查詢語句＿返回的是一個包含tuple的list，list的元素是記錄行，tuple的元素是每行記錄的欄位
    def ExecQuery(self, sql):
        try:
            cur = self.__GetConnect()
            cur.execute(sql)
            resList = cur.fetchall()  # 一次取得全部資料
            # row = cur.fetchone()  # 一次取得一行資料
            # rows = cur.fetchmany(10)  # 取得10行資料
        except Exception as ex:
            raise ex
        finally:
            # 查詢完畢後必須關閉連線
            self.conn.close()
            return resList

    def ExecNonQuery(self, sql):  # 執行非查詢語句
        try:
            cur = self.__GetConnect()
            cur.execute(sql)
            self.conn.commit()
        except Exception as ex:
            raise ex
        finally:
            self.conn.close()


def main():
    # ms = MSSQL(host="localhost",user="sa",pwd="123456",db="PythonWeiboStatistics")
    # 返回的是一個包含tuple的list，list的元素是記錄行，tuple的元素是每行記錄的欄位

    server = "61.063.36.252"
    database = "readygodb"
    username = "readygoxxxx"
    password = "xxxxreadygo"
    #
    ms = MSSQL(host=server, user=username,
               pwd=password, db=database)
    resList = ms.ExecQuery(
        "SELECT Prd_ID, Prd_Name, SNHead FROM Product")

    print("資料總筆數(List): ", len(resList))  # 印出resList長度
    print("每筆資料欄位數(Tuple): ", len(resList[0]))  # 印出resList欄位數


if __name__ == '__main__':
    main()
