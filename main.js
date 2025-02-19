var hashT
var wssT
var uucodeT
var uatT

// '&"&\s 削除
function myReplace (v){
  return v.replace(/\'|\"|\s/g, "");
}

// エラー
function myError (v){
  console.error("Error : " + v)
}

function myHash(v) {
  v = myReplace (v);
  v.match(/^\d{8}$/) ?
  (hashT = v
  ): (
    hashT = null,
    myError("hash")
  );
}

function myWss(v) {
  v = myReplace (v);
  v.match(/^wss:\/\/draw-ydc2\.kuku\.lu:\d{5}\/?$/) ? wssT = v
  : (
    wssT = null,
    myError("wss")
  );
}

function myUucode(v) {
  v = myReplace (v);
  v.match(/^[^\W-]{32}$/) ? uucodeT = v
  : (
    uucodeT = null,
    myError("uucode")
  );
}

function myUat(v) {

  if (v === "custom"){
    document.getElementById("customUat").disabled = false;
    if (uatT){
      uatT = document.getElementById("customUat").value;
    }
  } else {
    document.getElementById("customUat").disabled = true;
    uatT = v
  }

}
function myCustomUat(v){

    if (document.getElementById("customUat").disabled === false){
    const cuatT = v;
    console.log(uatT);
  }

}



function myButton(v){

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
          hash: hashT})
        );
      };

      function drawin (){
        ws.send("2/0/0/0/0/0/#ff0000/12345678910.0/52/1/0//125895.6x88489.3x125894.9x88490.0x12345678910.0,125894.9x88490.0x125893.5x88490.7x12345678910.0,125893.5x88490.7x125890.7x88492.5x12345678910.0,125890.7x88492.5x125888.0x88494.4x12345678910.0,125888.0x88494.4x125885.2x88495.3x12345678910.0,125885.2x88495.3x125882.4x88496.2x12345678910.0,125882.4x88496.2x125881.7x88496.9x12345678910.0,125881.7x88496.9x125881.0x88497.6x12345678910.0,125881.0x88497.6x125881.0x88498.3x12345678910.0,/");
        console.log("描画")
      }

      join();

    });
  } else {
    myError(ws);
  }
}
