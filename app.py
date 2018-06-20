# 參考資料 -- https://medium.com/@twilightlau94/rest-apis-with-flask-%E7%B3%BB%E5%88%97%E6%95%99%E5%AD%B8%E6%96%87-1-5405216d3166https://medium.com/@twilightlau94/rest-apis-with-flask-%E7%B3%BB%E5%88%97%E6%95%99%E5%AD%B8%E6%96%87-1-5405216d3166

# 建立一個 eshop 應用程式，它會有以下的 API 功能 -- 創造帳號,登入帳號,建立商店,查詢現有所有商店,查詢商店資訊,更新商店資訊,刪除商店,建立商店貨品,查詢單一商店內所有貨品,更新貨品價格,刪除單一商店內貨品

from flask import Flask, jsonify, request, render_template
app = Flask(__name__)

stores = [
    {
        "name": "Elton's first store",
        "items": [
            {
                "name": "my item 1",
                "price": 30
            }
        ]
    },
    {
        "name": "Elton's 2nd store",
        "items": [
            {
                "name": "my item 2",
                "price": 15

            }
        ],
    }
]

# POST /store data: {name :}


@app.route('/store', methods=['POST'])
def create_store():
    # 調用 request.get_json() 方法，把 json 轉化成 object，再以 dictionary 形式儲存，最後 return 已儲存的數據。
    request_data = request.get_json()
    new_store = {
        'name': request_data['name'],
        'items': []
    }
    stores.append(new_store)
    return jsonify(new_store)
# get /store/<name> data: {name :}


@app.route('/store')
def get_stores():
    return jsonify(stores)


@app.route('/store/<string:name>')
def get_store(name):
    for store in stores:
        if store['name'] == name:
            return jsonify({'items': store['item']})
        return jsonify({'message': 'store not fount'})

# post /store/<name> data: {name :}/item


@app.route('/store/<string:name>/item', methods=['POST'])
def create_item_in_store(name):
    request_data = request.get_json()
    for store in stores:
        if store['name'] == name:
            new_item = {
                'name': request_data['name'],
                'price': request_data['price']
            }
        store['items'].append(new_item)
        return jsonify(new_item)

# get /store/<name> data: {name :}/item


@app.route('/store/<string:name>/item')
def get_item_in_store(name):
    for store in stores:
        if store['name'] == name:
            return jsonify({'items': store['items']})
    return jsonify({'message': 'store not found'})


app.run(port=5000, debug=True)
