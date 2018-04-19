
class Config(object):
    pass


class prodConfig(Config):
    DEBUG = False
    SERVER_NAME = '0.0.0.0:8080'
    # 如果想讓外網用戶也能連上你的Web


class DevConfig(Config):
    DEBUG = True
    SERVER_NAME = 'localhost:8080'
