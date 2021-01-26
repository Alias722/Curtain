#include <SoftwareSerial.h>   // 引用程式庫

#define relay_1 6 //繼電器控制腳1
#define relay_2 5 //繼電器控制腳1

// 定義連接藍牙模組的序列埠
SoftwareSerial BT(8, 9); // 接收腳, 傳送腳

const int MaxLength = 3300;

void setup() {
  Serial.begin(115200);   // 與電腦序列埠連線
  Serial.println("BT is ready!");
  // 設定藍牙模組的連線速率
  // hc06預設包率為9600
  BT.begin(9600);
  pinMode(relay_1,OUTPUT);
  pinMode(relay_2,OUTPUT);
  digitalWrite(relay_1,HIGH);
  digitalWrite(relay_2,HIGH);
  Serial.println("Everything is in position");
}

void StepForward();
void StepBackward();

char stat = 'S';//現在在做的事，F：向前轉 B：向後轉 S：停止
int cnt = 0;//data的寫入位置
char val;//BT讀到的值
char data[2];  // 儲存接收資料的變數
int pos;//窗簾位置

void loop() {
  // 若收到藍牙模組的資料，則送到「序列埠監控視窗」
  //ONLY two kinds of signal would be sent "OO":open || "CC":close
  if (BT.available()) {
    val = BT.read();
    data[cnt] = val;
    cnt ++;
  }

  if(cnt >= 2){
    cnt = 0;
    //如果兩個一樣就執行動作
    if(data[0] == data[1]){
      if(data[0] == 'O'){
       //打開窗簾
        stat = 'F'; 
      }else if(data[0] == 'C'){
        //關閉窗簾
        stat = 'B';  
      }
    }
  }

  if(stat != 'S'){
    if(stat == 'F'){
      //向前轉
      if(pos < MaxLength){
        StepForward();
        pos++;
      }
    }
    if(stat == 'B'){
      //向後轉
      if(pos > 0){
        StepBackward();
        pos--;
      }
    }
  }
  Serial.print("Position now:");
  Serial.println(pos);
}

void StepForward(){
  //正轉
  digitalWrite(relay_1,HIGH);
  digitalWrite(relay_2,LOW);
  //0.02秒
  delay(20);
  //停止
  digitalWrite(relay_1,HIGH);
  digitalWrite(relay_2,HIGH);
}
void StepBackward(){
  //反轉
  digitalWrite(relay_1,LOW);
  digitalWrite(relay_2,HIGH);
  //0.02秒
  delay(20);
  //停止
  digitalWrite(relay_1,HIGH);
  digitalWrite(relay_2,HIGH);
}
