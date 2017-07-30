var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var client = require('mongodb').MongoClient;
var glob = require("glob");
//var winston = require('winston');
//require('date-utils');
var dateFormat = require('dateformat');
var now = new Date();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var mvjson = require('/root/homepage/public/assets/etc/sungsimmv.json');


var logpath = '/root/homepage/public/log.txt';
var insupath = '/root/homepage/public/insu.txt';
var slogpath = '/root/homepage/public/slog.txt';
var sinsupath = '/root/homepage/public/sinsu.txt';
var saramsu = 0;
var ssaramsu = 0;

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'jade');
app.set('views', './views');
app.locals.pretty = true;

app.use(express.static('public'));
app.listen('80', () => {
  console.log('port 80!');
});

app.get('/', (req, res) => {
  var text = `

  <!-- 페이스북 -->
  <!DOCTYPE html>
  <html lang="ko" style="background-color: #110c05;">
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>대동수도설비공사</title>
  <meta property="og:title"           content="대구 대동설비공사"/>
  <meta property="og:site_name"       content="대구 대동설비공사"/>
  <meta property="og:type"            content="website"/>
  <meta property="og:url"             content="http://samek86.iptime.org/daedong/"/>
  <meta property="og:image"           content="http://samek86.iptime.org/assets/img/2nd-400.png"/>
  <meta property="og:description"     content="대구 달서구, 리모델링, 옥상방수전문, 설비, 수도, 누수, 창호, 단열 공사"/>
  <meta name="description" content="대구 달서구, 리모델링, 옥상방수전문, 설비, 수도, 누수, 창호, 단열 공사">
  <!-- 트위터 -->
  <meta name="twitter:card"           content="website">
  <meta name="twitter:title"          content="대구 대동설비공사">
  <meta name="twitter:site"           content="대구 대동설비공사">
  <meta name="twitter:creator"        content="윤준호">
  <meta name="twitter:image"          content="http://samek86.iptime.org/assets/img/2nd-400.png">
  <meta name="twitter:description"    content="대구 달서구, 리모델링, 옥상방수전문, 설비, 수도, 누수, 창호, 단열 공사">

  <!-- 미투데이 -->
  <meta property="me2:post_body"      content="대구 대동설비공사"/>
  <meta property="me2:image"          content="http://samek86.iptime.org/assets/img/2nd-400.png"/>

  <meta http-equiv="refresh" content="0;url=http://daedong.o-r.kr">

  <!-- 모바일앱 -->
  <!-- <meta property="al:ios:url" content="applinks://docs">
  <meta property="al:ios:app_store_id" content="12345">
  <meta property="al:ios:app_name" content="App Links">
  <meta property="al:android:url" content="applinks://docs">
  <meta property="al:android:app_name" content="App Links">
  <meta property="al:android:package" content="org.applinks"> -->
  <meta property="al:web:url" content="http://samek86.iptime.org/daedong/">

  <link rel="canonical" href="http://samek86.iptime.org/daedong.html">

</head>
<body>
<!--<img src="/assets/img/daedonglogo.jpg" style="width:100%;">-->
<div style="background-color:#0a0e1d;display:none;">
리모델링에서부터 옥상방수, 건축수리, 수도누수탐지, 인테리어, 결로, 보일러공사, 가옥수리,
단열공사, 목공사 등 집과 관련된 모든 공사를 책임지고 해드립니다.

<article class="Bottom">
  <div class="big">
    주소 : 대구광역시 달서구 송현1동 1983-38 대구광역시 달서구 송현2동 1926-4<br/>
    사업자등록번호 : 514-10-38120 | 전문건설업 1종허가업체 (28 -1 -23호) 가스류시공허가 (27 -2 -166호)  | 특정열사용기자재  열관리협회가입업체<br/>
    대표 : 윤태현 | 상호명 : 대구 대동설비공사 | 개인정보관리자 : 윤준호 | 전화번호 : 010-9847-1006 | 메일 : ttiis@naver.com  <br/>
  </div>
<div class="small">
  주소 : 대구광역시 달서구 송현1동 1983-38 <br/>대구광역시 달서구 송현2동 1926-4<br/>
  사업자등록번호 : 514-10-38120 <br/>전문건설업 1종허가업체 (28 -1 -23호) <br/>가스류시공허가 (27 -2 -166호)  <br/>특정열사용기자재  열관리협회가입업체<br/>
  대표 : 윤태현 | 상호명 : 대구 대동설비공사 <br/>개인정보관리자 : 윤준호 | 전화번호 : 010-9847-1006 <br/>메일 : ttiis@naver.com  <br/>
</div>
</article>
</div>
</body>

  `
  res.send(text);
  //res.render('daedongmain');
})

app.get('/daedongmain', (req, res) => {
  res.render('daedongmain');
})

app.get('/Sibelius', (req, res) => {
  res.redirect('/Sibelius.zip');
})

app.get('/daedong2', (req, res)=>{
  res.redirect('/daedong2.html');
})

app.get('/daedong', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var gigi = req.headers['user-agent'];
  var nalja = dateFormat(new Date(), "yyyy년 mm월 dd일 ddd, TT h시 MM분 ");
  fs.open(logpath, 'a+', function(err, fd) {
    if (err)
      throw err;
    if (fd == '9') {
      console.log('file create.' + logpath);
    } else {
      totalsaram();
      fs.readFile(insupath, 'utf8', (err, data) => {
        if (err)
          throw err;
        fs.appendFile(logpath, data + ' : ' + nalja + ip + '/' + gigi + '<p>', function(err) {
          if (err)
            throw err;
          }
        );
      });
    }
  });
  res.redirect('/daedong.html')
})

function totalsaram() {
  fs.readFile(insupath, 'utf8', (err, data) => {
    if (err)
      throw err;
    console.log(data);
    var insu = data;
    insu *= 1;
    insu++;
    saramsu = insu;
    fs.writeFile(insupath, insu, (err) => {
      if (err)
        throw err;
      }
    );
  });
}

function stotalsaram() {
  fs.readFile(sinsupath, 'utf8', (err, data) => {
    if (err)
      throw err;
    console.log(data);
    var sinsu = data;
    sinsu *= 1;
    sinsu++;
    ssaramsu = sinsu;
    fs.writeFile(sinsupath, sinsu, (err) => {
      if (err)
        throw err;
      }
    );
  });
}

app.get('/daedonglog', (req, res) => {
  var style = `
  <style>
    html{
      background-color : #0a121b;
      color: #ddd;
    }
  </style>
  `
  fs.open(logpath, 'a+', function(err, fd) {
    if (err)
      throw err;
    if (fd == '9') {
      console.log('file create.' + logpath);
    } else {
      fs.readFile(logpath, 'utf8', function(err, data) {
        res.send(style + '<h4>' + data + '</h4>');
      });
    }
  });
})

app.get('/daedonglogdel', (req, res) => {

  fs.unlink(logpath, function(err) {
    if (err)
      throw err;
    res.send('<h1>successfully deleted</h1>')
    console.log('successfully deleted');
  });
})

app.post('/mailsender', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var tel = req.body.tel;
  var message = req.body.message;


  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'samek86@gmail.com',
      pass: 'En42qNp0'
    }
  });

  var mailOptions = {
    from: email,
    //to: 'ttiis@naver.com',
    to: 'hyun7271a@naver.com',
    subject: '[문의]'+name+'님의 문의 메일입니다',
    //text: 'Plaintext version of the message',
    html: '<h2>전화번호 : '+ tel +'<br>'+ '메세지 : '+ message+'</h2>'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      // 메일 발송 오류
      console.log(error);
      result.resCode = resCode.FAILED;
    } else {
      // 메일 발송 성공
      console.log("Message sent : " + info.response);
      result.resCode = resCode.SUCCESS;
    }
    transporter.close();
    header.sendJSON(result, res);
  });
  res.redirect('/daedong')
})

app.get('/sungsim', (req, res) => {

  var sip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var sgigi = req.headers['user-agent'];
  var snalja = dateFormat(new Date(), "yyyy년 mm월 dd일 ddd, TT h시 MM분 ");
  fs.open(slogpath, 'a+', function(err, fd) {
    if (err)
      throw err;
    if (fd == '9') {
      console.log('file create.' + slogpath);
    } else {
      stotalsaram();
      fs.readFile(sinsupath, 'utf8', (err, data) => {
        if (err)
          throw err;
        fs.appendFile(slogpath, data + ' : ' + snalja + sip + '/' + sgigi + '<p>', function(err) {
          if (err)
            throw err;
          }
        );
      });
    }
  });

  var mvlist = JSON.parse(JSON.stringify(mvjson));
  res.render('sungsim', {list : mvlist});
})

app.post('/sungsimsearch/', (req, res)=>{
  var id = req.body.title;
  var obj = JSON.parse(JSON.stringify(mvjson));
  var name = obj.filter(function(item) {
    if(item.title.indexOf(id)!=-1){
      var sresult = item.title
    }
    return sresult
  });
  res.render('sungsim', {list : name});
})

app.get('/sungsim/:id', (req, res) => {
  var id = req.params.id;
  var obj = JSON.parse(JSON.stringify(mvjson));
  var name = obj.filter(function(item) {
    return item.no == id;
  });
  var filelist = "";

  var sip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var sgigi = req.headers['user-agent'];
  var snalja = dateFormat(new Date(), "yyyy년 mm월 dd일 ddd, TT h시 MM분 ");
  fs.open(slogpath, 'a+', function(err, fd) {
    if (err)
      throw err;
    if (fd == '9') {
      console.log('file create.' + slogpath);
    } else {
      stotalsaram();
      fs.readFile(sinsupath, 'utf8', (err, data) => {
        if (err)
          throw err;
        fs.appendFile(slogpath, data + ' : ' + snalja + sip + '/ ' + id +' : '+name[0].title+ '<p>', function(err) {
          if (err)
            throw err;
          }
        );
      });
    }
  });

  fs.readdir('/root/homepage/public/sungsim/mv/' + id, (err, files) => {
    if (err)
      throw err;
    var partfile = new Array();
    var partname = new Array();
    files.forEach((file) => {
      if(file.indexOf('all')!=-1||file.indexOf('All')!=-1){
        partfile.push(file);
        partname.push('전체듣기');
      }
      if(file.indexOf('ex')!=-1||file.indexOf('Ex')!=-1){
        partfile.push(file);
        partname.push('예제듣기');
      }
      if(file.indexOf('des')!=-1||file.indexOf('Des')!=-1){
        partfile.push(file);
        partname.push('데스칸트');
      }
      if(file.indexOf('solo')!=-1||file.indexOf('Solo')!=-1){
        partfile.push(file);
        partname.push('솔로');
      }
      if(file.indexOf('sop')!=-1||file.indexOf('Sop')!=-1){
        partfile.push(file);
        partname.push('소프라노');
      }
      if(file.indexOf('sp2')!=-1||file.indexOf('Sp2')!=-1){
        partfile.push(file);
        partname.push('소프라노2');
      }
      if(file.indexOf('alt')!=-1||file.indexOf('Alt')!=-1){
        partfile.push(file);
        partname.push('알토');
      }
      if(file.indexOf('ten')!=-1||file.indexOf('Ten')!=-1){
        partfile.push(file);
        partname.push('테너');
      }
      if(file.indexOf('bas')!=-1||file.indexOf('Bas')!=-1){
        partfile.push(file);
        partname.push('베이스');
      }
      if(file.indexOf('pia')!=-1||file.indexOf('Pia')!=-1){
        partfile.push(file);
        partname.push('반주만');
      }
      if(file.indexOf('cel')!=-1||file.indexOf('Cel')!=-1){
        partfile.push(file);
        partname.push('첼로');
      }
    })
    res.render('sungsimOne', {file : partfile, part : partname, id : id, name : name});
    // files.forEach((file) => {
    //   filelist = filelist + '<a href="/sungsim/mv/' + id + '/' + file + '">' + file + '</a><br>';
    // })
    // res.send(filelist);
  })
})

app.get('/sungsimlog', (req, res) => {
  var style = `
  <style>
    html{
      background-color : #0a121b;
      color: #ddd;
    }
  </style>
  `
  fs.open(slogpath, 'a+', function(err, fd) {
    if (err)
      throw err;
    if (fd == '9') {
      console.log('file create.' + slogpath);
    } else {
      fs.readFile(slogpath, 'utf8', function(err, data) {
        res.send(style + '<h4>' + data + '</h4>');
      });
    }
  });
})

app.get('/sungsimlogdel', (req, res) => {

  fs.unlink(slogpath, function(err) {
    if (err)
      throw err;
    res.send('<h1>successfully deleted</h1>')
    console.log('successfully deleted');
  });
})

app.get('/torrent', (req, res)=>{
  res.redirect('http://samek86.iptime.org:9091/transmission/web/');
})

app.get('/tdown', (req, res)=>{
  fs.readdir('/root/homepage/public/torrentdown', (err, files)=>{
     res.render('tdown', {item : files});
  })
})

app.get('/torrentdown/:id', (req, res)=>{
  var id = req.params.id;
  fs.readdir('/root/homepage/public/torrentdown/'+id, (err, files)=>{
     res.render('tdownOne', {item : files, name : id});
  })
})


app.get('/tdel', (req, res)=>{
  fs.readdir('/root/homepage/public/torrentdown', (err, files)=>{
     res.render('tdel', {item : files});
  })
})

app.get('/tdelone/:id', (req, res)=>{
  var id = req.params.id;
  fs.readdir('/root/homepage/public/torrentdown/'+id, (err, files)=>{
     res.render('tdelOne', {item : files, name : id});
  })
})

app.get('/tdel/:id', (req, res)=>{
  var id = req.params.id;
  var path = '/root/homepage/public/torrentdown/';
  if(id.indexOf('*f')!=-1){
    var sid1 = id.substring(0, id.indexOf('*f'));
    var sid2 = id.substring(id.indexOf('*f')+2, id.length);
    console.log(sid1+'/'+sid2);
    fs.unlink(path+sid1+'/'+sid2, (err) => {
      if (err) throw err;
      res.redirect('/tdown');
    });
  }else if(id.indexOf('*d')!=-1){
    var did = id.substring(2, id.length);
    fs.readdirSync(path+did).forEach(function(file,index){
      var curPath = path+did +'/'+ file;
      fs.unlinkSync(curPath);
    });
    fs.rmdirSync(path+did, (err) => {
      if (err) throw err;
    });
    res.redirect('/tdown');
  }else{
    fs.unlink(path+id, (err) => {
      if (err) throw err;
      res.redirect('/tdown');
    });
  }
})

app.get('/margin', (req, res)=>{
  res.render('margin');
})

app.post('/marginre', (req, res)=>{
  var wonga = req.body.wonga;
  var margin = req.body.margin;
  var panme = wonga / ((100-margin)/100);
  var text = `
  <html>
  <body background-color="black">
  "<h1>"+panme+"</h1>"
  </body>
  </html>
  `
  res.send(text);

})

// app.all('/*', (req, res) => {
//     fs.appendFile('/log.txt', '누적 접속자수 : ' + saramsu + '//', encoding = 'utf8', function(err) {
//         if (err) console.log('접속자 에러');
//     });
//     console.log('접속자 발생');
//     saramsu++;
// })

// app.get('/', (req, res) => {
//   client.connect('mongodb://samek86.iptime.org/ex1', function(err, db) {
//     if (err != null)
//       console.log("에러 내용", + err);
//     db.collection("memo").find().toArray(function(err, items) {
//       for (var item in items) {
//         console.log(items[item].title);
//         content = content + '<h1>제목 : ' + items[item].title + ' 내용 : ' + items[item].desc+'<br></h1>';
//       }
//       res.send(content)
//     });
//   });
// });
