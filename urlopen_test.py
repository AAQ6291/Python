# 範例--讀取icook網頁資料
# 參考網址:http://tw.gitbook.net/python/python3-webbug-series1.html
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
rscode = html.getcode()

if (rscode == 200):
    print("-- 網頁連結正常 -- Code : ", str(rscode))
elif(rscode == 301):
    print("-- 網頁已永久改變網址 -- Code : ", str(rscode))
elif(rscode == 404):
    print("-- 網頁已不存在 -- Code : ", str(rscode))
elif(rscode == 403):
    print("-- 網頁禁止訪問或不存在 -- Code : ", str(rscode))
elif(rscode == 500):
    print("-- 網頁忙錄中 -- Code: ", str(rscode))
