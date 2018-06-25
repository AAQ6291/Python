from flask import Flask, render_template, request, redirect, make_response, abort, url_for
import urllib
#from config import DevConfig

# 初始化 Flask 類別成為 instance
app = Flask(__name__)  # Flask application 的核心物件
# app.config.from_object(DevConfig)


def do_the_login(namestr):
    return render_template('hello.html', name=namestr)


@app.route('/')
def index():
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


# 注意1:透過@app.route的methods，我們可以定義這個route的method!
#      route在未設置的情況下，是預設GET
# 注意2: 透過request.method，我們可以判斷這次的請求是那一種行為模式!
#        此例來說，判斷如果是POST，代表是從form那邊submit過來的!
# 注意3:透過request.values[‘username’]，我們可以取得從form過來的那個username欄位資料。
# 注意4:設置action的這部份注意到嗎?如果我們的route調整了，是不是也要異動了?後續會有補充說明。
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        name = request.values['username'] + ' Welcome here!'
        return render_template('hello.html', name=name)
        # do_the_login(name)
    else:
        # 注意1：user_template是送到前端去的參數，命名上為了有所區隔，所以我加上了_template處理完python文件之後，再來就是要將我們送到前端的參數加到html上!
        user = 'login test '
        return render_template('login.html', user_template=user)  # 轉至login頁面


@app.route('/loginHome', methods=['GET', 'POST'])
def loginHome():
    if request.method == 'POST':
        name = request.values['username'] + ' Welcome!'
        return render_template('index.html', name=name)
    else:
        # 注意1：user_template是送到前端去的參數，命名上為了有所區隔，所以我加上了_template處理完python文件之後，再來就是要將我們送到前端的參數加到html上!
        user = 'login test '
        return render_template('login.html', user_template=user)  # 轉至login頁面


if __name__ == '__main__':
    app.run()  # 產生一個可以動的 web server
