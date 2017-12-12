var map;
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navBarHeight = $('header').outerHeight();

$('#sidebarCollapseBtn').on('click', function (e) {
    e.stopPropagation();
    var sidebar = $('#sidebar');
    $('body').toggleClass('noscroll');
    sidebar.toggleClass('opened');
    $(this).toggleClass('active');
    sidebar.css({'top':lastScrollTop});
});

$('body').click(function(){
    var sidebar = $('#sidebar');
    if(sidebar.hasClass('opened')){
        sidebar.toggleClass('opened');
        $('body').toggleClass('noscroll');
        $('#sidebarCollapseBtn').toggleClass('active');
    }
});

$(window).scroll(function(){
    didScroll = true;
});


function initMap() {
    var uluru = {lat: 36.1014662, lng: -80.243257};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
function hasScrolled() {
    var myHeader = $('header');
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop-st) <= delta) return;
    if (st > lastScrollTop && st > navBarHeight) {
        if (!myHeader.hasClass('nav-up')){
            myHeader.addClass('nav-up');
        }
    } else {
        if (st + $(window).height() < $(document).height()){
            if(myHeader.hasClass('nav-up')){
                myHeader.removeClass('nav-up');
            }
        }
    }

    lastScrollTop = st;
}

setInterval(function(){
    if(didScroll){
        hasScrolled();
        didScroll = false;
    }
}, 250);
