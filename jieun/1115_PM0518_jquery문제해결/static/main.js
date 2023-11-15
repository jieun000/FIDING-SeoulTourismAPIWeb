var chk = [true, true, true, false];
function chked_data(data, chk) {
  return data.filter((_, i) => chk[i]);
}
function make_chart(myChart, labels, label, data) {
  // Create the chart
  const ctx = document.getElementById(myChart)//.getContext("2d");
  console.log(ctx)
  $('#' + myChart).css({'background-color': 'white','border-radius': '5%'});
  // Check if the chart instance exists
  if (window.myChartInstance) {
    // window.myChartInstance.destroy();
  }

  window.myChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels, // x-axis labels (dates)
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: "rgba(255, 0, 235, 0.2)",
          borderColor: "rgba(0, 255, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
$('area').click(function() {
  var areaId = $(this).attr('id');
  var $areaBox = $('#' + areaId + 'Box');
  $.ajax({
    type: "get", // 타입 (get, post, put 등등)
    url: "/ajax", // 요청할 서버 url    async : true, // 비동기화 여부 (default : true)
    data: { chk: chk },
    dataType: "json",
    success: function (data) {
      console.log("요청 성공", data);
      // Prepare the data for the chart
      const labels = chked_data(
        [
          "total_cases",
          "total_deaths",
          "people_vaccinated",
          "population",
        ],
        chk
      );
      console.log(data["USA"]);
      const SAF = chked_data(Object.values(data["SAF"]), chk);
      const AFR = chked_data(Object.values(data["AFR"]), chk);
      const ASIA = chked_data(Object.values(data["ASIA"]), chk);
      const CHN = chked_data(Object.values(data["CHN"]), chk);
      const KOR = chked_data(Object.values(data["KOR"]), chk);
      const AUS = chked_data(Object.values(data["AUS"]), chk);
      const JPN = chked_data(Object.values(data["JPN"]), chk);
      const RSI = chked_data(Object.values(data["RSI"]), chk);
      const EEU = chked_data(Object.values(data["EEU"]), chk);
      const WEU = chked_data(Object.values(data["WEU"]), chk);
      const NAM = chked_data(Object.values(data["NAM"]), chk);
      const USA = chked_data(Object.values(data["USA"]), chk);
      const SAM = chked_data(Object.values(data["SAM"]), chk);

      const loc_name_list = ['남아프리카공화국','아프리카','아시아','중국','한국','오세아니아','일본','러시아','동유럽','서유럽','남아메리카','미국','서아메리카']
      const loc_data_list = [SAF,AFR,ASIA,CHN,KOR,AUS,JPN,RSI,EEU,WEU,NAM,USA,SAM]
      const chart_id_list = [
        'area1_chart','area2_chart','area3_chart','area4_chart','area5_chart','area6_chart','area7_chart',
        'area8_chart','area9_chart','area10_chart','area11_chart','area12_chart','area13_chart'
      ];
      for (let i = 0; i < loc_data_list.length; i++) {
        const chart_name = chart_id_list[i];
        const loc_code = loc_name_list[i];
        const loc_data = loc_data_list[i];

        make_chart(chart_name, labels, loc_code, loc_data);
      }
    },
  });
  $areaBox.toggle()
});
$('.areaBox').click(function() {
    $(this).hide();
});

// jQuery 문서가 준비되면 실행
$(function(){
    // 'map' 클래스 maphilight() 초기화
    $('.map').maphilight();

    // maphilight default 값 설정
    $.fn.maphilight.defaults = {
        fill: true,
        fillColor: 'CCCCCC',
        fillOpacity: 0.5,
        stroke: true,
        strokeColor: 'FFFFFF',
        strokeOpacity: 1,
        strokeWidth: 1
    }
    $('img[usemap]').maphilight();

    // 구역 별로 정보 반환
    function getAreaContent(areaId) {
        var areaContents = {
            'area1': '남아공','area2': '아프리카','area3': '아시아','area4': '중국','area5': '한국','area6': '오세아니아',
            'area7': '일본','area8': '러시아','area9': '동유럽','area10': '서유럽','area11': '북아메리카','area12': '미국',
            'area13': '남아메리카'
        };
        return areaContents[areaId];
    }

    // 호버 시 국가 이름
    $('area').hover(function (event) {
    var areaContent = getAreaContent($(this).attr('id'));

    $('#infoBox').html(areaContent).css({
        top: event.pageY + 'px',
        left: event.pageX + 'px',
        display: 'block'
    });
    }, function () {
    $('#infoBox').css('display', 'none');
    });

    $('body').append('<div id="infoBox"></div>');
});



