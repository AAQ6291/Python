# 使用的套件: requests, lxml(解析 html / xml 並建立成dom 的library)
# 下載網站內容處理成json格式
# 1. 下載網頁並轉換成DOM 格式
# 2. 解析、處理網頁內容
# 3. 儲存成json 格式

# -*- coding: utf-8 -*-
from urllib import request
from xml import dom, sax, parsers, etree
import request
import json

result = request.get(using=None)
