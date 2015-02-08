import time
from socket import *
import commands
from sys import argv
from threading import Thread, RLock

class Node:
        def __init__(self, nodeID, nodeADDR, nodeConnInternet, timeout):
                self.nodeID = nodeID
                self.nodeADDR = nodeADDR
                self.nodeConnInternet = nodeConnInternet
		self.timeout = timeout

class RxBeacon(Thread):
	def run(self):
		self.sock = socket(AF_INET, SOCK_DGRAM)
		self.sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
		self.sock.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
		self.sock.bind((IP_ADDR_BEACON, UDP_PORT))
		while True:
			dataRx, addr = self.sock.recvfrom(1024)
			nodeRx = dataRx.split(";")
			if len(nodeRx) == 3:
				if nodeRx[0] != ID:
					print "\nRxBeacon:"						
					print dataRx
					found = False
					with lock:
						for j in range(0, len(NODES_CARAC)):
							if NODES_CARAC[j].nodeID == nodeRx[0]:
								NODES_CARAC[j].nodeADDR = nodeRx[1]
								NODES_CARAC[j].nodeConnInternet = nodeRx[2]
								NODES_CARAC[j].timeout = DEFAULT_TIMEOUT
								j = len(NODES_CARAC)
								found = True
						if found == False:
							NODES_CARAC.append(Node(nodeRx[0], nodeRx[1], nodeRx[2], DEFAULT_TIMEOUT))
						neighTable = ""
						for i in range(1, len(NODES_CARAC)):
							neighTable += NODES_CARAC[i].nodeID + ";" + NODES_CARAC[i].nodeADDR + ";" + NODES_CARAC[i].nodeConnInternet + ";" + str(NODES_CARAC[i].timeout) + "\n"						
						try:
							fd = open("Neighbors.sensIO", "w")
							fd.write(neighTable)
							fd.close()
						except:
							print "RxBeacon: unable to write in the file Neighbors.sensIO. Neighbor table not updated"
		self.sock.close()

class TxBeacon(Thread):
	def run(self):
		self.socket = socket(AF_INET, SOCK_DGRAM)
		self.socket.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
		self.socket.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
		while True:
			time.sleep(5)
			with lock:
				req = "curl www.google.fr"
				status, result = commands.getstatusoutput(req)
				if status != 0:
					NODES_CARAC[0].nodeConnInternet = "false"
				else:
					NODES_CARAC[0].nodeConnInternet = "true"								
				msg = NODES_CARAC[0].nodeID + ";" + NODES_CARAC[0].nodeADDR + ";" + NODES_CARAC[0].nodeConnInternet
				print "\nTxBeacon:"
				print msg	
				self.socket.sendto(msg, (IP_ADDR_BEACON, UDP_PORT))
		self.socket.close()

class HandleTimeout(Thread):
	def run(self):
		while True:
			time.sleep(5)
			with lock:
				neighborTableChange = False
				for i in range(1, len(NODES_CARAC)):
					if NODES_CARAC[i].timeout > 0:
						NODES_CARAC[i].timeout -= 1
					else:
						if NODES_CARAC[i].timeout == 0:
							NODES_CARAC.pop(i)
							neighborTableChange = True
				neighTable = ""
				for i in range(1, len(NODES_CARAC)):
					neighTable += NODES_CARAC[i].nodeID + ";" + NODES_CARAC[i].nodeADDR + ";" + NODES_CARAC[i].nodeConnInternet + ";" + str(NODES_CARAC[i].timeout) + "\n"
				try:				
					fd = open("Neighbors.sensIO", "w")
					fd.write(neighTable)
					fd.close()
				except:
					print "HandleTimeout: unable to write in the file Neighbors.sensIO. Neighbor table not updated"				
				if neighborTableChange == True:				
					print "\nChanges in neighbors table due to timeout:"
					print neighTable

class RelayData(Thread):
	def run(self):
		self.socket = socket(AF_INET, SOCK_STREAM)
		self.socket.bind((IP_ADDR_TCP, TCP_PORT))
		self.socket.listen(1)
		while True:		
			conn, addr = self.socket.accept()
			while True:
				data = conn.recv(1024)
				if not data:
					break
				print "\nReceived from TCP socket (" + time.strftime('%H:%M:%S',time.localtime()) + "):"
				print data
				dataArray = data.split("&")
				req = "curl --data \"nodeID="+dataArray[0]+"&seq="+dataArray[1]+"&dur="+dataArray[2]+"&sourceId="+ID+"\" http://192.168.1.15:9000/api/savepacket"
				status, result = commands.getstatusoutput(req)

IP_ADDR_BEACON = '192.168.5.255'
IP_ADDR_TCP = '192.168.5.114'
TCP_PORT = 5006
UDP_PORT = 5005
NODES_CARAC = []
ID = "1"
DEFAULT_TIMEOUT = 3
lock = RLock()

NODES_CARAC.append(Node(ID, "192.168.5.114", "true", -1))					

rxBeacon = RxBeacon()
txBeacon = TxBeacon()
timeoutHandler = HandleTimeout()
dataRelayer = RelayData()

rxBeacon.start()
txBeacon.start()
timeoutHandler.start()
dataRelayer.start()

rxBeacon.join()
txBeacon.join()
dataRelayer.join()
timeoutHandler.join()