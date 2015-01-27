from socket import * 
import time, sys

if len(sys.argv) < 2:
	print "Usage: python tx.py sequenceNumber time"
	sys.exit(0)

IP_ADDR = "192.168.5.255"
UDP_PORT = 5005
seqNb=sys.argv[1]
time=sys.argv[2]
ID = "1"

MESSAGE = ID + "&" + seqNb + "&" + time 

sock = socket(AF_INET, SOCK_DGRAM)
sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
sock.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
sock.sendto(MESSAGE, (IP_ADDR, UDP_PORT))
print "Sent on " + IP_ADDR + ":" + str(UDP_PORT) + " : " + MESSAGE
sock.close()

