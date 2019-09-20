#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <DHT_U.h>

int SENSOR = 8;
float temp;
float humidity;
int incomingByte = 0;
int serialFlag = 0;

DHT dht(SENSOR, DHT11);
LiquidCrystal_I2C lcd (0x27, 16, 2);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.begin();
  Wire.begin();
  lcd.begin(16, 2);

  lcd.clear();
  lcd.backlight();
}

void loop() {
  // put your main code here, to run repeatedly:
  //wait until a byte was received
  while(!Serial.available()) {
    temp = dht.readTemperature();
    humidity = dht.readHumidity();
  
    Serial.print( "temp ");
    Serial.print(temp);

    lcd.setCursor(0, 0);
    lcd.print("Temp: " + String(temp));
    
    Serial.print(" humidity ");
    Serial.println(humidity);

    lcd.setCursor(0, 1);
    lcd.print("Humidity: " + String(humidity));
    
    delay(1000);
  }
  
  // led control
  //output received byte
  incomingByte = Serial.read();
  analogWrite(5, incomingByte);
}
