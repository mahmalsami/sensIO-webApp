
#include <Process.h>
#include <Bridge.h>

#define THRESHOLD_DIST 100
#define THRESHOLD_TIME 2000

// définition des broches utilisées 
int trig = 13; 
int echo = 12; 
long lecture_echo; 
long cm=0;
 unsigned long tm1=0;
 unsigned long tm0=0;
 unsigned long pause=0;
int iD=0;
void setup() {
  // Bridge startup

  pinMode(trig, OUTPUT); 
  digitalWrite(trig, LOW); 
  pinMode(echo, INPUT); 
  Bridge.begin();
  Serial.begin(9600);
 // Wait until a Serial Monitor is connected.
  while(!Serial);
}

void loop() {
  digitalWrite(trig, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(trig, LOW); 
  lecture_echo = pulseIn(echo, HIGH); 
  cm = lecture_echo / 58;
 if(cm<THRESHOLD_DIST){
    tm0=millis();
    Serial.print(String(cm) +"\n");
    while(cm<THRESHOLD_DIST){
      delay(1000);
      digitalWrite(trig, HIGH); 
      delayMicroseconds(10); 
      digitalWrite(trig, LOW); 
      lecture_echo = pulseIn(echo, HIGH); 
      cm = lecture_echo / 58;
      tm1=millis();
    }
    Serial.print(String(cm) +"\n");
   pause=tm1-tm0;
   if(pause>THRESHOLD_TIME){
   runPython(iD,pause);
     iD++;
   }
 }
}

void runPython(int iD,unsigned long pause) {
   Process p;
 p.begin("python");  
  p.addParameter("/root/tx.py");
  p.addParameter(String(iD));
  p.addParameter(String(pause));
  p.run();
 while(p.available()) {
  char c=p.read();
  Serial.print(c);  // Display the response
  }
  Serial.flush();
}


/*void process(YunClient client) {
  // read the command
  String command = client.readStringUntil('/');

  // is "distance" command?
  if (command == "distance") {
    distanceCommand(client);
  }

}

void distanceCommand(YunClient client) {

  digitalWrite(trig, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(trig, LOW); 
  lecture_echo1 = pulseIn(echo, HIGH); 
  cm1 = lecture_echo1 / 58; 
   delay(1000);
  digitalWrite(trig, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(trig, LOW); 
  lecture_echo2 = pulseIn(echo, HIGH); 
  cm2 = lecture_echo2 / 58; 
  if(cm1<5 && cm2<5){
    density++;
  // runCurl();
  }
  // Send feedback to client
  client.print(F("Capteur "));
  client.print(ID);
   client.print(F("\n distance cm:"));
  client.print(cm1);
   client.print(F("\n distance cm:"));
  client.print(cm2);
  client.print(F("\n Density:"));
  client.print(density);
  delay(1000); 
  
  // Update datastore key with the current pin value
  //String key = "density";
  //Bridge.put(key, String(density));
}*/




