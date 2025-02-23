var hashT
var wssT
var uucodeT
var uatT
var cuatT

// '&"&\s 削除
function myReplace (v){
  return v.replace(/\'|\"|\s/g, "");
};

// エラーチェック
function checkE (v, c){
  v === 0
  ? console.log('%c 成功 : ' + c + " ", 'background-color: #6f6; color: #333;')
  : console.error('%c 失敗 : ' + c + " ", 'background-color: #f66; color: #333;')
};

function myHash(v) {
  v = myReplace (v);
  v.match(/^\d{1,10}$/) ?
  (hashT = v,
    checkE(0, "hash"),
    console.log(v)
  ) : (
    hashT = null,
    checkE(1, "hash")
  );
};

function myWss(v) {
  v = myReplace (v);
  v.match(/^wss:\/\/draw-ydc2\.kuku\.lu:\d{5}\/?$/) ? (
    wssT = v,
    checkE(0, "wss"),
    console.log(v)
  ) : (
    wssT = null,
    checkE(1, "wss")
  );
};

function myUucode(v) {
  v = myReplace (v);
  v.match(/^[^\W-]{32}$/) ? (
    uucodeT = v,
    checkE(0, "uucode"),
    console.log(v)
  ) : (
    uucodeT = null,
    checkE(1, "uucode")
  );
};

function myUat(v) {

  if (v === "custom"){
    document.getElementById("customUat").disabled = false;
    if (cuatT){
      cuatT = document.getElementById("customUat").value;
      console.log(v)
    }
  } else {
    document.getElementById("customUat").disabled = true;
    uatT = v
    checkE(0, "uat")
  }

};

function myCustomUat(v){

    if (document.getElementById("customUat").disabled === false, v){
    cuatT = v;
    checkE(0, "uat");
  } else {
    checkE(1, "uat");
  }

};



function myButton(){

  if (hashT && wssT && uucodeT && (uatT === "custom" && cuatT || uatT !== "custom")) {

    console.log(uucodeT+" : "+uatT+" : "+hashT+" : "+wssT);
    const WebSocket = require('ws');
    const ws = new WebSocket(wssT);
    ws.on('open', function () {

      function join () {
        ws.send(
          "@"+JSON.stringify(
          {type: "join2",
          uucode: uucodeT,
          useragent: uatT,
          hash: hashT}
        ));
      };

      function drawin (){
        ws.send("2/0/0/0/0/0/#ff0000/12345678910.0/52/1/0//125895.6x88489.3x125894.9x88490.0x12345678910.0,125894.9x88490.0x125893.5x88490.7x12345678910.0,125893.5x88490.7x125890.7x88492.5x12345678910.0,125890.7x88492.5x125888.0x88494.4x12345678910.0,125888.0x88494.4x125885.2x88495.3x12345678910.0,125885.2x88495.3x125882.4x88496.2x12345678910.0,125882.4x88496.2x125881.7x88496.9x12345678910.0,125881.7x88496.9x125881.0x88497.6x12345678910.0,125881.0x88497.6x125881.0x88498.3x12345678910.0,/");
        console.log("描画");
      }

      join();

    });
  } else {
    checkE(1, "入力内容の不備");
  };
};

