from flask import Flask, render_template, request, redirect, make_response, abort, url_for

import urllib
import sqlDBClass

# from flask_sqlalchemy import SQLAlchemy

# from config import DevConfig

# 初始化 Flask 類別成為 instance
app = Flask(__name__)  # Flask application 的核心物件
# app.config.from_object(DevConfig)


@app.route('/')
def index():
    #conn = sqlDBClass.sqlDB()
    #resList = conn.ExecQuery("SELECT Prd_ID, Prd_Name, SNHead FROM Product")
    # print("資料總筆數(List): ", len(resList))  # 印出resList長度
    return render_template('index.html')


@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)


@app.route('/user/<username>')
def show_user_profile(username):
    return 'User %s' % username


@app.route('/post/<int:post_id>')
def show_post(post_id):
    return 'Post %d' % post_id

# login的頁面


@app.route('/loginHome', methods=['GET', 'POST'])
def loginHome():
    if request.method == 'POST':
        name = request.values['username']
        pwd = request.values['pwd']
        # Conn MSSQL :帳號判斷
        conn = sqlDBClass.sqlDB()
        resList = conn.ExecQuery(
            "SELECT userID, userName FROM sysUserData where userID = '" + name + "' and pwd='"+pwd + "'")

        recno = len(resList)
        print("資料總筆數(List): ", recno)  # 印出resList長度
        if recno == 0:
            name = "資料輸入錯誤! 請重新輸入!"
        return render_template('index.html', name=name)
    else:
        # 注意1：user_template是送到前端去的參數，命名上為了有所區隔，所以我加上了_template處理完python文件之後，再來就是要將我們送到前端的參數加到html上!
        user = 'login test '
        return render_template('login.html', user_template=user)  # 轉至login頁面


if __name__ == '__main__':
    app.run()  # 產生一個可以動的 web server
