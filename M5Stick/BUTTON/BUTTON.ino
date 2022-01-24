#include <M5StickC.h>
#include <BleKeyboard.h>

BleKeyboard bleKeyboard;
int last_value = 0;
int cur_value = 0;

String player = "1"; // set player 1 or player2

void setup() {
  bleKeyboard.begin();
  setCpuFrequencyMhz(80); //  downscale la frequenza da 240 a 80 Mhz
  M5.begin();
  pinMode(10, OUTPUT); // red led
  digitalWrite(10, HIGH);

  
  M5.Lcd.setRotation(3);  
  pinMode(37, INPUT); 

  M5.Lcd.setTextSize(3);
  M5.Lcd.setCursor(5, 18);  
  M5.Lcd.print("Player "+player);
  delay(1000);
  M5.Axp.SetLDO2(false); // spenge lo schermo
}

void loop() {
  M5.update();
  delay(300); // per evitare la doppia pressione
  cur_value = digitalRead(37); 
  if(cur_value != last_value){
    if(cur_value==0){
        if(bleKeyboard.isConnected()) {
              bleKeyboard.print(player);
              /*M5.Axp.SetLDO2(true);
              M5.Lcd.fillScreen(RED);
              delay(100);
              M5.Lcd.fillScreen(BLACK);
              M5.Axp.SetLDO2(false);*/
              digitalWrite(10, LOW); // accende il led
              delay(100);
              digitalWrite(10, HIGH);
        }
    }
    else{
    }
    last_value = cur_value;
  }
}
