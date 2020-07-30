import sys
sys.path.append('../')

from lib.mysqlclient import MySQL

sc = MySQL.MySQL('./config/config.ini')
result = sc.test_cnx()
print(result)