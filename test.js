  var sha256 = require("sha256");

  //Test 
  // var checkCode = [
  //   ["HashKey",config.HashKey],
  //   ["Amt",price],
  //   ["MerchantID",config.MerchantID],
  //   ["MerchantOrderNo",orderNo], 
  //   ["TimeStamp",parseInt(new Date().getTime()/1000,10)],
  //   // ["TimeStamp","1403243286"],
  //   ["Version","1.2"],
  //   ["HashIV",config.HashIV]
  // ];

  var checkCode = [
   ["HashKey","1A3S21DAS3D1AS65D1"],
   ["Amt",200],
   ["MerchantID","123456"],
   ["MerchantOrderNo","20140901001"],
   ["TimeStamp",1403243286], 
   ["Version","1.1"],
   ["HashIV","1AS56D1AS24D"]
  ];

  var query = [];
  var map = {};
  checkCode.forEach(function(p){
    //&xxx=yyyy
    query.push(p[0]+"="+p[1]);
    if(p[0] != "HashKey" && p[0] != "HashIV"){
      map[p[0]] = p[1];
    }
  });
  console.log(query.join("&"))
  var checkcode = sha256(query.join("&")).toUpperCase();
  console.log(checkcode);
