# 範例--讀取icook網頁資料
from urllib.request import urlopen

# 抓取網頁資料
html = urlopen("http://icook.tw/")
print("-- iCook 首頁HTML -- \n")
print(html.read().decode('utf-8'))

# 讀取Html Header 資訊
print("-- Header 資訊 -- \n")
print(html.info())

# 讀取真實URL位址
print("-- iCook 真實位址 -- \n")
print(html.geturl())

# 網頁狀態碼
# 200:正常訪問, 301:重新定向, 404:網頁不存在, 403:網頁禁止訪問或不存在, 500:網頁忙碌中
print("-- iCook 網頁狀態碼 -- \n")
print(html.getcode())
