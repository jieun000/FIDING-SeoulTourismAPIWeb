$(function(){
    $('.map').maphilight();
});

$(function() {
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

    $('area').mouseover(function() {
        var areaId = $(this).attr('id');
        var areaContent = getAreaContent(areaId);

        var offsetX = event.pageX;
        var offsetY = event.pageY;

        $('#infoBox').html(areaContent);
        $('#infoBox').css({
            top: offsetY + 'px',
            left: offsetX + 'px',
            display: 'block'
        });
    }).mouseout(function() {
        $('#infoBox').css('display', 'none');
    });

    var infoBox = $('<div id="infoBox"></div>');
    $('body').append(infoBox);

    function getAreaContent(areaId) {
        switch (areaId) {
            case 'area1':
                return "남아공"
            case 'area2':
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
});