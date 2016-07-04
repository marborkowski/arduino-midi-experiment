 int velocity = 100;//velocity of MIDI notes, must be between 0 and 127
 int noteON = 144;//144 = 10010000 in binary, note on command
 int noteOFF = 128;//128 = 10000000 in binary, note off command

const int button1 = 13;
const int button2 = 12;
const int button3 = 11;
const int button4 = 10;
const int buttonClick = 9;

int level = 0;
int buttonState1 = 0;
int buttonState2 = 0;
int buttonState3 = 0;
int buttonState4 = 0;
int buttonStateClick = 0;
long previousMillis = 0;
long previousPlayMillis = 0;

void setup() {
  Serial.begin(115200);

  pinMode(button1, INPUT);
  pinMode(button2, INPUT);
  pinMode(button3, INPUT);
  pinMode(button4, INPUT);
  pinMode(buttonClick, INPUT);
}

void loop() {
  playNotes();
  resetNotes();
}

void playNotes() {
  unsigned long currentMillis = millis();
 
  if(currentMillis - previousPlayMillis > 100) {
    previousPlayMillis = currentMillis; 
  
    buttonState1 = digitalRead(button1);
    buttonState2 = digitalRead(button2);
    buttonState3 = digitalRead(button3);
    buttonState4 = digitalRead(button4);
    buttonStateClick = digitalRead(buttonClick);
    
    if (buttonStateClick < 1) {
      level += 1; 
    } 
    
    if (buttonState1 == 1) {
      MIDImessage(noteON, 1 + level, velocity, 3);
    }
    if (buttonState2 == 1) {
      MIDImessage(noteON, 2 + level, velocity, 3);
    }
    if (buttonState3 == 1) {
      MIDImessage(noteON, 3 + level, velocity, 3);
    }  
    if (buttonState4 == 1) {
      MIDImessage(noteON, 4 + level, velocity, 3);
    }  
  }
}
void resetNotes() {
    unsigned long currentMillis = millis();
 
  if(currentMillis - previousMillis > 500) {
    previousMillis = currentMillis; 

    MIDImessage(noteOFF, 1 + level, velocity, 3);
    MIDImessage(noteOFF, 2 + level, velocity, 3);
    MIDImessage(noteOFF, 3 + level, velocity, 3);
    MIDImessage(noteOFF, 4 + level, velocity, 3); 
  }
}

void MIDImessage(int command, int MIDInote, int MIDIvelocity, byte channel) {
  Serial.write(command | (channel & 0x0F));//send note on or note off command 
  Serial.write(MIDInote);//send pitch data
  Serial.write(MIDIvelocity);//send velocity data
}
