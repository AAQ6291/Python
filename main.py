from flask import Flask, render_template, request, redirect, make_response, abort
#from config import DevConfig

# 初始化 Flask 類別成為 instance
app = Flask(__name__)  # Flask application 的核心物件
# app.config.from_object(DevConfig)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)


@app.route('/openfile/')
def openfile():
    file = open('test.txt', 'r')
    contect = file.read()
    print(contect)


@app.route('/user/<username>')
def show_user_profile(username):
    return 'User %s' % username


@app.route('/post/<int:post_id>')
def show_post(post_id):
    return 'Post %d' % post_id


@app.route('/signin/')
def signin():
    return render_template('login.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return 'login.....'
    else:
        return 'show login form'


if __name__ == '__main__':
    app.run()  # 產生一個可以動的 web server
