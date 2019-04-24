# MSSQL Class
import pymssql


class sqlDB():
    def __init__(self):
        self.host = "61.60.36.202"
        self.db = "rekdyyo"
        self.user = "readdgo"
        self.pwd = "readyxo1616xx1396"

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
