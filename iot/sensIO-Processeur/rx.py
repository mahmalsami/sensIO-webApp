from socket import *
import commands
from sys import argv

IP_ADDR = '192.168.5.255'
UDP_PORT = 5005
NODES_CARAC = [0]*20
ID = "1"

sock = socket(AF_INET, SOCK_DGRAM)
sock.bind((IP_ADDR, UDP_PORT))

while True:
	data, addr = sock.recvfrom(1024)
	dataTmp = data.split("&")
	if dataTmp[0] != ID:
		if  NODES_CARAC[int(dataTmp[0])] < dataTmp[1]:
			print "Received from " + add + " : " + data
			NODES_CARAC[int(dataTmp[0])] = dataTmp[1]						
			req = "curl --data \"nodeID="+dataTmp[0]+"&seq="+dataTmp[1]+"&dur="+dataTmp[2]+"\" http://sensio.cloudapp.net"
			status, result = commands.getstatusoutput(req)
			if status != 0:
				sock.close()
				sock = socket(AF_INET, SOCK_DGRAM)
				sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
				sock.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
				sock.sendto(data, (IP_ADDR, UDP_PORT))
				print "Relayed on " + IP_ADDR + ":" + UDP_PORT + " : " data
				sock.close()
				sock = socket(AF_INET, SOCK_DGRAM)
				sock.bind((IP_ADDR, UDP_PORT))

