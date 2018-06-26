import pymssql


class SQLServer:
    def __init__(self, host, user, pwd, db):
        self.host = host  # Server
        self.user = user  # user
        self.pwd = pwd  # pwd
        self.db = db  # database

    def __GetConnect(self):
        if not self.db:
            raise Exception(NameError, "沒有設定資料庫資訊")

        self.conn = pymssql.connect(
            host=self.host, user=self.user, password=self.pwd, database=self.db, charset="utf8")
        cur = self.conn.cursor()
        if not cur:
            raise Exception(NameError, "連結資料庫失敗")
        else:
            return cur

    # 執行查詢語句＿返回的是一個包含tuple的list，list的元素是記錄行，tuple的元素是每行記錄的欄位
    def ExecQuery(self, sql):
        cur = self.__GetConnect()
        cur.execute(sql)
        resList = cur.fetchall()  # 一次取得全部資料
        # row = cur.fetchone()  # 一次取得一行資料
        # rows = cur.fetchmany(10)  # 取得10行資料

        # 查詢完畢後必須關閉連線
        self.conn.close()
        return resList

    def ExecNonQuery(self, sql):  # 執行非查詢語句
        cur = self.__GetConnect()
        cur.execute(sql)
        self.conn.commit()
        self.conn.close()


def test():
    # ms = MSSQL(host="localhost",user="sa",pwd="123456",db="PythonWeiboStatistics") ## #返回的是一個包含tuple的list，list的元素是記錄行，tuple的元素是每行記錄的欄位 ## ms.ExecNonQuery("insert into WeiBoUser values('2','3')")
    ms = SQLServer(host="172.16.2.248", user="sa", pwd="qazwsx", db="cytest")
    resList = ms.ExecQuery("SELECT * FROM t_user")
    print(resList)


if __name__ == '__main__':
    test()
