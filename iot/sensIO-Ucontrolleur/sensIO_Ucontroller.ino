#include <Process.h>
#include <Bridge.h>

#define THRESHOLD_DIST 100
#define THRESHOLD_TIME 2000

// définition des broches utilisées 
int trig = 13; 
int echo = 12; 
long lecture_echo; 
long cm = 0;
unsigned long tm1 = 0;
unsigned long tm0 = 0;
unsigned long pause = 0;
int iD=0;

void setup() 
{
  pinMode(trig, OUTPUT); 
  digitalWrite(trig, LOW); 
  pinMode(echo, INPUT); 
  Bridge.begin();
  Serial.begin(9600);
}

void loop() 
{
  digitalWrite(trig, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(trig, LOW); 
  lecture_echo = pulseIn(echo, HIGH); 
  cm = lecture_echo / 58;
  Serial.print(String(cm)+"\n");
  
  if (cm < THRESHOLD_DIST && tm0 == 0)
  {
    tm0 = millis(); 
  }
  if (cm >= THRESHOLD_DIST && tm0 > 0)
  {
    tm1 = millis();
    pause = tm1 - tm0;
    if (pause > THRESHOLD_TIME)
      runPython(iD++, pause);
    tm0 = 0;
  }
  
  delay(500);
}

void runPython(int iD,unsigned long pause) 
{
  Process p;
  p.begin("python");  
  p.addParameter("/root/tx.py");
  p.addParameter(String(iD));
  p.addParameter(String(pause));
  p.run();
  while(p.available())
  {
    char c=p.read();
    Serial.print(c);  // Display the response
  }
  Serial.flush();
}

