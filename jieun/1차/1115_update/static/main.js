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
        switch (areaId) {
            case 'area1':
                window.topPosition = 10
                window.leftPosition = 10
                return "남아공"
            case 'area2':
                window.topPosition = 50
                window.leftPosition = 50
                return "아프리카";
            case 'area3':
                return "아시아";
            case 'area4':
                return "중국";
            case 'area5':
                return "한국";
            case 'area6':
                return "오세아니아";
            case 'area7':
                return "일본";
            case 'area8':
                return "러시아";
            case 'area9':
                return "동유럽";
            case 'area10':
                return "서유럽";
            case 'area11':
                return "북아메리카";
            case 'area12':
                return "미국";
            case 'area13':
                return "남아메리카";
        }
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

    // 클릭 시 차트 넣을 박스
    $('area').click(function() {
        var areaId = $(this).attr('id');
        // var areaContent = getAreaContent(areaId);
        var $areaBox = $('#' + areaId + 'Box');

        $areaBox.toggle().css({
            top: topPosition + 'px',
            left: leftPosition + 'px'
        });
    });
    $('.areaBox').click(function() {
        $(this).hide();
    });

});