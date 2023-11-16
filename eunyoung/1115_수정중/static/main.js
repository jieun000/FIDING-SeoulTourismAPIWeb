
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



