!function(e) { //포트폴리오 넘기는거
  function o() { //메뉴바
    var t = 50;
    e("body").scrollspy({target: "#topMenuBar", offset: t});
    var o = e(".jumbotron"),
      a = function() {
        var t = e(document).scrollTop(),
          a = o.height();
        t > a
          ? e("#topMenuBar").addClass("Opaque")
          : e("#topMenuBar").removeClass("Opaque")
      };
    e(document).on("scroll.navbar_theme", function() {
      a()
    }),
    a(),
    e("body").on("click", "a.Smooth", function(o) {
      var a = e(e(this).attr("href")).offset().top - t;
      return e("body,html").animate({
        scrollTop: a
      }, 100, function() {}),
      !1
    })
  };

  function n() { //구글맵
    var l = {
      mapApiKey: "AIzaSyAerSxtogodfNUJ9EweUL8NY-0EDRzijl0",
      mapMarkerPosition1: {
        lat: 35.828742,
        lng: 128.548078
      },
      mapMarkerPosition2: {
        lat: 35.828072,
        lng: 128.553979
      },
      mapCenter: {
        lat: 35.830815,
        lng: 128.550990
      }
    };

    function e() {
      var image = new google.maps.MarkerImage("http://samek86.ipdisk.co.kr:8000/list/HDD1/daedong/assets/img/maker.png", null, null, null, new google.maps.Size(30, 40));
      {
        var e = {
            center: l.mapCenter,
            zoom: 15,
            zoomControl: !0,
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false
          },
          t = new google.maps.Map(document.getElementById("contactMap"), e);
        var marker1 = new google.maps.Marker({position: l.mapMarkerPosition1, map: t, title: "대동설비공사(1호점)", animation: google.maps.Animation.DROP, icon: image})
        var marker2 = new google.maps.Marker({position: l.mapMarkerPosition2, map: t, title: "대동설비공사(2호점)", animation: google.maps.Animation.DROP, icon: image})
      }
      new google.maps.InfoWindow({content: '<a href="http://samek86.ipdisk.co.kr:8000/list/HDD1/daedong/assets/img/1st.jpg"><IMG BORDER="0" ALIGN="Left" SRC="http://samek86.ipdisk.co.kr:8000/list/HDD1/daedong/assets/img/1st.jpg" style="width:50px;"></a><br/>1호점'}).open(t, marker1);
      new google.maps.InfoWindow({content: '<a href="http://samek86.ipdisk.co.kr:8000/list/HDD1/daedong/assets/img/2nd-800.png"><IMG BORDER="0" ALIGN="Left" SRC="http://samek86.ipdisk.co.kr:8000/list/HDD1/daedong/assets/img/2nd-400.png" style="width:50px;"></a><br/>2호점'}).open(t, marker2);

      google.maps.event.addListener(marker1, 'click', function() {
        new google.maps.InfoWindow({content: '<a href="http://samek86.ipdisk.co.kr:8000/list/HDD1/daedong/assets/img/1st.jpg"><IMG BORDER="0" ALIGN="Left" SRC="http://samek86.ipdisk.co.kr:8000/list/HDD1/daedong/assets/img/1st.jpg" style="width:50px;"></a><br/>1호점'}).open(t, marker1);
      });
      google.maps.event.addListener(marker2, 'click', function() {
        new google.maps.InfoWindow({content: '<a href="http://samek86.ipdisk.co.kr:8000/list/HDD1/daedong/assets/img/2nd-800.png"><IMG BORDER="0" ALIGN="Left" SRC="http://samek86.ipdisk.co.kr:8000/list/HDD1/daedong/assets/img/2nd-400.png" style="width:50px;"></a><br/>2호점'}).open(t, marker2);
      });

    }
    function t() {
      var e = document.createElement("script");
      e.type = "text/javascript",
      e.src = "https://maps.googleapis.com/maps/api/js?callback=initializeGoogleMap&key=" + l.mapApiKey,
      document.body.appendChild(e)
    }
    window.initializeGoogleMap = e,
    t();
  };

  var r = function() {};
  window.App = r;
  r.init = function() {
    o(),
    n()
  }
}(jQuery);

$(window).scroll(scrollopacity);
$(document).ready(scrollopacity);
function scrollopacity() {
  var scroll = document.getElementById('scroll');
  if ($(window).scrollTop() >= 510) {
    scroll.style.opacity = 1;
  } else {
    scroll.style.opacity = 0;
  }
}

$(function() {
  $('#scroll').on('click', function(e) {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });
});

function disableselect(e) {
  return false
}

function reEnable() {
  return true
}
//if IE4+
document.onselectstart = new Function("return false")
//if NS6
if (window.sidebar) {
  document.onmousedown = disableselect
  document.onclick = reEnable
}
