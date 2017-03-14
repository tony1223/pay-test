var express = require('express');
var router = express.Router();
var SHA256 = require("crypto-js/sha256");



var SHA256 = require("crypto-js/sha256");

var sha256 = require("sha256");



var time = new Date().getTime();
var money = 200;
var seconds = parseInt(time/1000,10);
var hash = "HnGEIxZfmcmBEuAZVc6YJ2ezxQpB4NVL";
var iv = "bCpTao9wBv8fZIfV";

var config = {
  PayNotify:"",
  MerchantID:"MS11228939",
  HashKey:hash,
  HashIV:iv,
  PayGateWay:"https://ccore.spgateway.com/MPG/mpg_gateway"
};

// config = {
//   PayNotify:"http://tonyq.org/test",
//   MerchantID:'123456',
//   HashKey:"1A3S21DAS3D1AS65D1",
//   HashIV:"1AS56D1AS24D",
//   PayGateWay:"https://ccore.spgateway.com/MPG/mpg_gateway",
//   // '1403243286',
// };

var newOrder = function(orderNo,price,word,email,config){

  //Test 
  var checkCode = [
    ["HashKey",config.HashKey],
    ["Amt",price],
    ["MerchantID",config.MerchantID],
    ["MerchantOrderNo",orderNo], 
    ["TimeStamp",parseInt(new Date().getTime()/1000,10)],
    // ["TimeStamp","1403243286"],
    ["Version","1.2"],
    ["HashIV",config.HashIV]
  ];

  // checkCode = [
  //  ["HashKey","1A3S21DAS3D1AS65D1"],
  //  ["Amt",200],
  //  ["MerchantID","123456"],
  //  ["MerchantOrderNo","20140901001"],
  //  ["TimeStamp",1403243286], 
  //  ["Version","1.1"],
  //  ["HashIV","1AS56D1AS24D"]
  // ];

  var query = [];
  var map = {};
  checkCode.forEach(function(p){
    query.push(p[0]+"="+p[1]);
    if(p[0] != "HashKey" && p[0] != "HashIV"){
      map[p[0]] = p[1];
    }
  });
  // console.log(query.join("&"))
  var checkcode = sha256(query.join("&")).toUpperCase();

  map["CheckValue"] = checkcode;
  map["RespondType"] = "JSON";
  map["ItemDesc"] = word;
  map["Email"] = email;
  map["LoginType"] = 0;
  map["InstFlag"] = 0;
  map["NotifyURL"] = config.PayNotify;

  map['Receipt'] = 1;//doc.register;
  // map['Nickname'] = doc.register;
  //map['ExpireDate'] = '2017-03-15';
  map['CVS'] = 0;

  // map['ReceiptTitle'] = doc.dn_name;

  // map['PaymentTEL'] = doc.phone.replace(/ /gi,"");
  // map['PaymentMAIL'] = doc.email;
  // map['PaymentRegisterAddress'] = doc.donate_address;
  // map['PaymentHomeAddress'] = doc.address;
  // map['PaymentName'] = doc.username;
  // map['PaymentReceiptAddress'] = doc.address;
  // map['PaymentMailAddress'] = doc.address;

  // map["RespondType"] = 'JSON';

  // map.ok = true;
  // map.Templates ="donate";
  map['action'] = config.PayGateWay;
  // console.log(JSON.stringify(map) );
  return map;
}



var concatBuyURL = function(money,orderNo,time){

  var token = "Amt="+money+"&MerchantID=MS11228939&MerchantOrderNo="+orderNo+"&TimeStamp="+time+"&Version=1.2";

  return token;
};


var concatCheckString = function(money,orderNo,time,hash,iv){
  //Test 
  var checkCode = [
    ["HashKey",hash],
    ["Amt",money],
    ["MerchantID","MS11228939"],
    ["MerchantOrderNo",orderNo], 
    ["TimeStamp",time],
    // ["TimeStamp","1403243286"],
    ["Version","1.2"],
    ["HashIV",iv]
  ];

  // checkCode = [
  //  ["HashKey","1A3S21DAS3D1AS65D1"],
  //  ["Amt",200],
  //  ["MerchantID","123456"],
  //  ["MerchantOrderNo","20140901001"],
  //  ["TimeStamp",1403243286], 
  //  ["Version","1.1"],
  //  ["HashIV","1AS56D1AS24D"]
  // ];

  var query = [];
  var map = {};
  checkCode.forEach(function(p){
    query.push(p[0]+"="+p[1]);
    if(p[0] != "HashKey" && p[0] != "HashIV"){
      map[p[0]] = p[1];
    }
  });
  // console.log(query.join("&"))
  var checkcode = sha256(query.join("&")).toUpperCase();
  return checkcode;
  // return SHA256(all_token).toString().toUpperCase();
};


// console.log(concatCheckString(money,time,seconds,hash,iv));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,
    data:newOrder(new Date().getTime(),
      200,"hello","",config)
  });
});

router.post('/pay', function(req, res, next) {
  res.render('form', { title: 'Express' ,
    data:newOrder(new Date().getTime(),
      100 * parseInt(req.body.num,10),
      "花 "+ req.body.num + " 朵","",config)
  });
});


router.post('/receive', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
