import commands
from socket import *
import time
from sys import argv

TCP_PORT = 5006
seqNb=argv[1]
time=argv[2]
ID = "2"

MESSAGE = ID + "&" + seqNb + "&" + time

req = "curl www.google.fr"
status, result = commands.getstatusoutput(req)
if status != 0:
	sock = socket(AF_INET, SOCK_STREAM)
	try:
		fd = open("Neighbors.sensIO", "r")
		neighborTable = fd.read()
		fd.close()
	except:
		print "\nTx.py: Unable to open the file Neighbors.sensIO"
		sys.exit(0)

	neighborTableArray = neighborTable.split("\n")
	connectedNeighbor = ""
	for i in range(0, len(neighborTableArray)-1):
		dataNeigh = neighborTableArray[i].split(";")
		if dataNeigh[2] == "true":
			connectedNeighbor = dataNeigh[1]
			i = len(neighborTableArray)
	if connectedNeighbor != "":
		try:
			sock.connect((connectedNeighbor, TCP_PORT))
			sock.send(MESSAGE)
			sock.close()
			print "\nTx.py: Sent to " + connectedNeighbor + ": " + MESSAGE
		except:
			print "\nTx.py: Unable to connect to " + connectedNeighbor
	else:
		print "\nTx.py: no connected neighbor found"
