#!/usr/bin/python3

import serial
from time import sleep

arduinobt = serial.Serial("/dev/rfcomm0",baudrate=9600)
print("signal sent")
arduinobt.write("CC")
