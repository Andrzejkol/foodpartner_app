/*var viewportScale =  window.innerWidth/540;
 if(viewportScale<=1){viewportScale=1};
 $("#viewport").attr("content","user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi");
 */
var myPosition = {lat: 0, lng: 0};
var myMarker;
var nextMarker;
var map;
var mapdata;
var bounds;
var marker = Array();
var markers;
var serverip = t['serverip'];
var serverip_dev = t['serverip_dev'];
var serverip_local = t['serverip_localhost'];
var settings;
var PositionSender;
var jsonObj = {};
var json;
var driver;
var temp_points = {};
var temp_points_set = Array();
var markercluster = Array();
var markerClusterer;
var geowatch_listener;
$('.right-sidebar .wrapper').find('script').remove();
var rightwrapper_html = $('.right-sidebar .wrapper').html();
$('#left_list_all').find('script').remove();
var leftpointlist_html = $('#left_list_all').html();
var login;
var work_started;
var nextPosition;
var online = true;
var alldelivered = true;
var scrolltotop;
var tempvar;

function rightsidebar_toggle(iMarker) {

    if ($('.right-sidebar').css('opacity') === '0') {

        $('.right-sidebar .wrapper').empty();
        if (Array.isArray(iMarker)) {

            $('.right-sidebar').addClass('multiplepoints');
            for (var i = 0; i < iMarker.length; i++) {
                $('.right-sidebar .wrapper').append(rightwrapper_html);

                $('.right-sidebar .wrapper .pointlist_item').last().attr('data-pointno', mapdata[iMarker[i]].id_route_position);
                $('.right-sidebar .wrapper .pointlist_item').last().attr('id', 'pointno_' + mapdata[iMarker[i]].id_route_position);
                //  $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery-details #d_name .group-control').text(mapdata[iMarker[i]].client_first_name + ' ' + mapdata[iMarker[i]].client_last_name);*/
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery-details #d_name .list_no').text(parseInt(iMarker[i]) + 1);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery-details #d_name .group-control').text(mapdata[iMarker[i]].address.replace(/[0-9][0-9]-[0-9][0-9][0-9]/, '').replace('ul. ', ''));
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery-details #d_delivery_type .group-control').html(mapdata[iMarker[i]].day_delivery_type + '<br>' + mapdata[iMarker[i]].day_from_hour.slice(0, -3) + '-' + mapdata[iMarker[i]].day_to_hour.slice(0, -3));
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery-details #d_address .group-control').text(mapdata[iMarker[i]].address);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery-details #d_diet_type .group-control').text(mapdata[iMarker[i]].diet_name);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery-details #d_phone .group-control').html('<a href="tel:' + mapdata[iMarker[i]].day_phone + '">' + mapdata[iMarker[i]].day_phone + '</a>');
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery-details #d_driver_comments .group-control').text(mapdata[iMarker[i]].driver_comments);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('#mycomment').val(mapdata[iMarker[i]].new_comment);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery_control #delivered').attr('data-pointno', mapdata[iMarker[i]].id_route_position);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery_control #lauchnav').attr('data-pointno', mapdata[iMarker[i]].id_route_position);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery_control #lauchnav').attr('data-lnglat', mapdata[iMarker[i]].lat + ", " + mapdata[iMarker[i]].lng);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery_control #show_on_map').attr('data-pointno', mapdata[iMarker[i]].id_route_position);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery_control #show_on_map').attr('data-lnglat', mapdata[iMarker[i]].lat + ", " + mapdata[iMarker[i]].lng);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery_control #not_delivered').attr('data-pointno', mapdata[iMarker[i]].id_route_position);
                $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).find('.delivery_control #savecomment').attr('data-pointno', mapdata[iMarker[i]].id_route_position);


                if (mapdata[iMarker[i]].delivery_status === '1') {
                    $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).addClass('point-delivered');
                } else if (mapdata[iMarker[i]].delivery_status === '2') {
                    $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).addClass('point-notdelivered');
                }

                $('.right-sidebar h3 .point_count').text(iMarker.length);
                var deliverytext = t['delivery'];
                if (iMarker.length < 4) {
                    deliverytext = t['delivery'];
                }
                $('.right-sidebar h3 .point_count_txt').text(deliverytext);
                if (mapdata[iMarker[i]].day_delivery_type == "DO RĘKI") {
                    $('.right-sidebar #pointno_' + mapdata[iMarker[i]].id_route_position).addClass('hand_point');
                }


            }
        } else {
            $('.right-sidebar').removeClass('multiplepoints');
            $('.right-sidebar .wrapper').append(rightwrapper_html);
            $('.right-sidebar .wrapper .pointlist_item').addClass('unfolded');
            $('.right-sidebar .wrapper .pointlist_item').last().attr('data-pointno', mapdata[iMarker].id_route_position);
            $('.right-sidebar .wrapper .pointlist_item').last().attr('id', 'pointno_' + mapdata[iMarker].id_route_position);

            /* $('.right-sidebar .delivery-details #d_name .group-control').text(mapdata[iMarker].client_first_name + ' ' + mapdata[iMarker].client_last_name);*/
            $('.right-sidebar .delivery-details #d_name .list_no').text(parseInt(iMarker) + 1);
            $('.right-sidebar .delivery-details #d_name .group-control').text(mapdata[iMarker].address.replace(/[0-9][0-9]-[0-9][0-9][0-9]/, '').replace('ul. ', ''));
            $('.right-sidebar .delivery-details #d_delivery_type .group-control').html(mapdata[iMarker].day_delivery_type + '<br>' + mapdata[iMarker].day_from_hour.slice(0, -3) + '-' + mapdata[iMarker].day_to_hour.slice(0, -3));
            $('.right-sidebar .delivery-details #d_address .group-control').text(mapdata[iMarker].address);
            $('.right-sidebar .delivery-details #d_diet_type .group-control').text(mapdata[iMarker].diet_name);
            $('.right-sidebar .delivery-details #d_phone .group-control').html('<a href="tel:' + mapdata[iMarker].day_phone + '">' + mapdata[iMarker].day_phone + '</a>');
            $('.right-sidebar .delivery-details #d_driver_comments .group-control').text(mapdata[iMarker].driver_comments);
            $('.right-sidebar .delivery-details #mycomment').val(mapdata[iMarker].new_comment);
            $('.right-wrapper.pointdetails').attr('data-pointno', mapdata[iMarker].id_route_position);
            $('.right-wrapper.pointdetails').attr('id', 'pointno_' + mapdata[iMarker].id_route_position);
            $('.right-sidebar .delivery_control #delivered').attr('data-pointno', mapdata[iMarker].id_route_position);
            $('.right-sidebar .delivery_control #lauchnav').attr('data-lnglat', mapdata[iMarker].lat + ", " + mapdata[iMarker].lng);
            $('.right-sidebar .delivery_control #lauchnav').attr('data-pointno', mapdata[iMarker].id_route_position);
            $('.right-sidebar .delivery_control #show_on_map').attr('data-lnglat', mapdata[iMarker].lat + ", " + mapdata[iMarker].lng);
            $('.right-sidebar .delivery_control #show_on_map').attr('data-pointno', mapdata[iMarker].id_route_position);
            $('.right-sidebar .delivery_control #not_delivered').attr('data-pointno', mapdata[iMarker].id_route_position);
            $('.right-sidebar .delivery_control #savecomment').attr('data-pointno', mapdata[iMarker].id_route_position);
            if (mapdata[iMarker].id_route_position === '1') {
                $('.right-sidebar #pointno_' + mapdata[iMarker].id_route_position).addClass('point-delivered');
            } else if (mapdata[iMarker].id_route_position === '2') {
                $('.right-sidebar #pointno_' + mapdata[iMarker].id_route_position).addClass('point-notdelivered');
            }

            $('.right-sidebar h3 .point_count').text('1');
            $('.right-sidebar h3 .point_count_txt').text(t['delivery']);

            if (mapdata[iMarker].day_delivery_type == "DO RĘKI") {
                $('.right-sidebar .delivery_control').addClass('hand_point');
            }
        }
        $('.right-sidebar').show();
        $('.right-sidebar').css('opacity', '1');
        $('.right-sidebar').animate({
            right: '0px'
        }, 500, function () {
            $('.right-sidebar .right-overlay').hide('slow');
        });
        $('.left-sidebar').animate({
            left: '-100%',
        }, 500, function () {
            $('.left-sidebar').css('opacity', '0');
        });
        setHeights();
    } else {
        $('.right-sidebar .wrapper').empty();
        $('.right-sidebar').removeClass('multiplepoints');
        $('.right-sidebar').animate({
            right: '-100%',
            opacity: '0'
        }, 500, function () {
            $('.right-sidebar .right-overlay').show();
            $('.right-sidebar').hide();
        });
    }
}

function leftsidebar_toggle() {
    if ($('.left-sidebar').css('opacity') === '0') {
        $('.left-sidebar').show();
        $('.left-sidebar').css('opacity', '1');
        $('.left-sidebar').animate({
            left: '0px',
        }, 500);
        $('.right-sidebar').animate({
            right: '-100%',
        }, 500, function () {
            $('.right-sidebar').css('opacity', '0');
        });
        setHeights();
    } else {
        $('.left-sidebar').animate({
            left: '-100%'
        }, 500, function () {
            $('.left-sidebar').css('opacity', '0');
            $('.left-sidebar').hide();
        });
    }
    if ($('.left-sidebar .pointlist_item.nextpoint').length > 0) {
        scrolltotop = $('.left-sidebar .points_as_list').scrollTop() + $('.left-sidebar .pointlist_item.nextpoint').position().top;
        $('.left-sidebar .points_as_list').animate({scrollTop: scrolltotop});
    }
}

function CenterControl(controlDiv, map) {

    var controlUI = document.createElement('div');
    controlUI.style.padding = '5px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.width = '85px';
    controlUI.style.height = '85px';
    controlUI.style.textAlign = 'center';
    controlUI.style.marginRight = '5px';
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement('div');
    controlText.style.cursor = 'pointer';
    controlText.style.textAlign = 'center';
    controlText.style.width = '85px';
    controlText.style.height = '85px';
    controlText.style.backgroundImage = 'url("mapicon/centerpos.png")';
    controlText.style.backgroundSize = 'contain';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', function () {

        var pos_lng = parseFloat(myPosition.lng);
        var pos_lat = parseFloat(myPosition.lat);
        map.setZoom(13);
        map.panTo({lat: pos_lat, lng: pos_lng});
    });
}

function ZoomControl(controlDiv, map) {

    controlDiv.style.padding = '5px';

    var controlWrapper = document.createElement('div');
    controlWrapper.style.cursor = 'pointer';
    controlWrapper.style.textAlign = 'center';
    controlWrapper.style.width = '85px';
    controlWrapper.style.height = '156px';
    controlWrapper.style.marginRight = '5px';

    controlDiv.appendChild(controlWrapper);

    var zoomInButton = document.createElement('div');
    zoomInButton.style.width = '85px';
    zoomInButton.style.height = '78px';
    zoomInButton.style.backgroundImage = 'url("mapicon/zoomin.png")';
    zoomInButton.style.backgroundSize = 'contain';
    controlWrapper.appendChild(zoomInButton);

    var zoomOutButton = document.createElement('div');
    zoomOutButton.style.width = '85px';
    zoomOutButton.style.height = '79px';
    zoomOutButton.style.marginTop = '-1px';
    zoomOutButton.style.backgroundImage = 'url("mapicon/zoomout.png")';
    zoomOutButton.style.backgroundSize = 'contain';
    controlWrapper.appendChild(zoomOutButton);

    google.maps.event.addDomListener(zoomInButton, 'click', function () {
        map.setZoom(map.getZoom() + 1);
    });

    google.maps.event.addDomListener(zoomOutButton, 'click', function () {
        map.setZoom(map.getZoom() - 1);
    });

}

function initMap() {
    bounds = new google.maps.LatLngBounds();
    var mapzoom = 8;
    map = new google.maps.Map(document.getElementById('main_map'), {
        maxZoom: 21,
        zoom: mapzoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        scaleControl: true,
        disableDefaultUI: true,
    });
    myMarker = new google.maps.Marker({
        position: {lat: 0, lng: 0},
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10
        },
        zIndex: 10,
        map: map
    });
    nextMarker = new google.maps.Marker({
        position: {lat: 0, lng: 0},
        icon: "mapicon/nextpoint.png",
        zIndex: 20,
        title: '0',
        map: map
    });
    google.maps.event.addListener(nextMarker, "click", function () {
        event.stopPropagation();
        map.panTo(this.position);
        rightsidebar_toggle(this.title);
    });

    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
    var zoomControlDiv = document.createElement('div');
    var zoomControl = new ZoomControl(zoomControlDiv, map);
    zoomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);

    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);


}

function onBackKeyDown() {
    if ($('.left-sidebar').css('opacity') !== '0') {
        leftsidebar_toggle();
    } else
    if ($('.right-sidebar').css('opacity') !== '0') {
        rightsidebar_toggle(0);
    } else {
        $('#exit_dialog').show();
    }
}

function setHeights() {
    var minheight = 480;
    var setheight = window.innerHeight;
    if (window.innerWidth < 480) {
        if (setheight < minheight) {
            setheight = minheight;
        }
    } else {
        if (setheight < minheight) {
            setheight = 630;
        }
    }
    $('.sidebar').css('height', window.innerHeight);
    /* $('body').css('height', setheight);*/
    /* $('.page').css('height', setheight);*/

    $('#left_list_all').css('height', setheight - $('.left-sidebar .left-wrapper').innerHeight());
    $('.right-sidebar .wrapper').css('height', setheight - $('.right-sidebar #right_menu').innerHeight());
    /* $('.page3 #main_list_all').css('height', setheight - $('.page3 .page3_top').innerHeight());*/
    $('.page.menu_map').css('height', window.innerHeight);

}

function alertbox(alerttext) {
    $('#alert_dialog .popup_text h2').text(alerttext);
    $('#alert_dialog').show();
}

function change_nextPosition() {
    var nextLat = 0;
    var nextLng = 0;
    var temp_position;
    var temp_marker;
    // markerClusterer.clearMarkers();
    for (var i = 0; i < mapdata.length; i++) {
        if (mapdata[i].delivery_status == '0') {
            if (nextLat === 0) {
                nextLat = parseFloat(mapdata[i].lat);
                nextLng = parseFloat(mapdata[i].lng);
                nextPosition = new google.maps.LatLng(nextLat, nextLng);
                nextMarker.setPosition({lat: nextLat, lng: nextLng});
                nextMarker.setTitle(i.toString());

                map.panTo({lat: nextLat, lng: nextLng});
                map.setZoom(18);

                $('.nextpoint').removeClass('nextpoint');
                if ($('.left-sidebar  #pointno_' + mapdata[i].id_route_position).next('.pointlist_item').length > 0) {
                    $('.left-sidebar  #pointno_' + mapdata[i].id_route_position).addClass('nextpoint');
                } else {
                    $('.left-sidebar  #pointno_' + mapdata[i].id_route_position).prev('.pointlist_item').addClass('nextpoint');
                }
                if ($('.left-sidebar .pointlist_item.nextpoint').length > 0) {
                    scrolltotop = $('.left-sidebar .points_as_list').scrollTop() + $('.left-sidebar .pointlist_item.nextpoint').position().top;
                    $('.left-sidebar .points_as_list').animate({scrollTop: scrolltotop});
                }
            }


        } else {
            if (work_started) {
                markerClusterer.removeMarker(marker[i]);
            }
        }

    }
}

function appClose() {
    jsonObj = {};
    jsonObj["driver_id"] = driver.driver_id;
    jsonObj["route_token"] = settings.route_token;
    jsonObj["route_points"] = temp_points_set;
    json = "";
    json = JSON.stringify(jsonObj);
    $.ajax({/* JSON wysylania punktow*/
        method: "POST",
        url: serverip + "/driver_api/route_in",
        async: false,
        data: {'data': json},
        dataType: 'json'
    })
            .success(function (data) {
                temp_points_set = [];
            })
            .fail(function (data) {
                /* Błąd wysyłania pozycji*/
                alertbox(t['send_position_error']);
            });

    jsonObj = {};
    jsonObj["driver_id"] = driver.driver_id;
    jsonObj["route_token"] = settings.route_token;
    json = "";
    json = JSON.stringify(jsonObj);
    $.ajax({/* JSON koniec trasy*/
        method: "POST",
        url: serverip + "/driver_api/route_stop",
        async: false,
        data: {'data': json},
        dataType: 'json'

    }).success(function (data) {
        work_started = false;
        login = false;
        localStorage.clear();
        navigator.app.exitApp();
    }).fail(function (data) {
        if (data.type == "error") {
            alertbox(data.msg);
        }
    });
}

function hide_commentvalidate() {
    $('.showalert').removeClass('showalert');

    $('.mycomment_validate').hide();
}

$(function () {



    var MyPositionWatch = navigator.geolocation.getCurrentPosition(
            function (position) {
                myPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
                myMarker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
            },
            function (error) {
                /* Gdy nie można złapać gpsa*/
            },
            {maximumAge: 0, timeout: 9000, enableHighAccuracy: true});

    login = false;
    work_started = false;

    setHeights();

    $('#alert_dialog #btn_ok').click(function () {
        $('#alert_dialog').hide();
    });

    $('#exit_dialog #btn_yes').click(function () {
        alldelivered = true;
        if (!login || !work_started) {
            navigator.app.exitApp();
        } else {
            for (var i = 0; i < mapdata.length; i++) {
                if (mapdata[i].delivery_status === '0') {
                    alldelivered = false;
                }
            }

            if (!alldelivered) {
                alertbox(t['no_all_points']);
                $('#exit_dialog').hide();
            } else {
                appClose();
            }
        }
    });
    $('#exit_dialog #btn_no').click(function () {
        $('#exit_dialog').hide();
    });
    $('#end_dialog #btn_yes').click(function () {
        /* sprawdzenie statusu punktów */
        alldelivered = true;
        for (var i = 0; i < mapdata.length; i++) {
            if (mapdata[i].delivery_status === '0') {
                alldelivered = false;
            }
        }
        if (!alldelivered) {
            alertbox(t['no_all_points']);
            $('#end_dialog').hide();
        } else {
            jsonObj = {};
            jsonObj["driver_id"] = driver.driver_id;
            jsonObj["route_token"] = settings.route_token;
            jsonObj["route_points"] = temp_points_set;
            json = "";
            json = JSON.stringify(jsonObj);
            $.ajax({/* JSON wysylania punktow*/
                method: "POST",
                url: serverip + "/driver_api/route_in",
                async: false,
                data: {'data': json},
                dataType: 'json'
            })
                    .success(function (data) {
                        temp_points_set = [];
                    })
                    .fail(function (data) {
                        /* Błąd wysyłania pozycji*/
                        alertbox(t['send_position_error']);
                    });

            jsonObj = {};
            jsonObj["driver_id"] = driver.driver_id;
            jsonObj["route_token"] = settings.route_token;
            json = "";
            json = JSON.stringify(jsonObj);
            $.ajax({/* JSON koniec trasy*/
                method: "POST",
                url: serverip + "/driver_api/route_stop",
                async: false,
                data: {'data': json},
                dataType: 'json'

            }).success(function (data) {
                if (data.type == "success") {
                    alertbox(t['work_stopped']);
                    work_started = false;
                    login = false;
                    $('#end_dialog').hide();
                    leftsidebar_toggle();
                    $(".menu_map").css('visibility', 'hidden');
                    $(".menu_map").css('display', 'none');
                    $('.page3').stop().hide();
                    $('.page2').stop().show();
                    localStorage.clear();


                } else if (data.type == "error") {
                    alertbox(data.msg);
                }
            }).fail(function (data) {
                if (data.type == "error") {
                    alertbox(data.msg);
                }
            });


        }
    });
    $('#end_dialog #btn_no').click(function () {
        $('#end_dialog').hide();
    });




    $('body').on('click', '#main_map', function (e) {
        if (($('.left-sidebar').css('left') != "0px" && $('.left-sidebar').css('opacity') != "0") || ($('.right-sidebar').css('right') != "0px" && $('.right-sidebar').css('opacity') != "0")) {
            e.stopPropagation();
        }
    });
    $('#left_list_all').empty();

    $('.page1 .btn').on('click', function () {
        /*  alertbox('logowanie');*/
        if (online !== true) {
            alertbox(t['no_internet']);
        } else {
            if ($('.page1 #login').val() == "") {
                alertbox(t['insert_login']);
            } else {
                if ($('.page1 #password').val() == "")
                {
                    alertbox(t['insert_password']);
                } else {
                    jsonObj = {};
                    if ($('.page1 #login').val().substring(0, 2) === "d_" || $('.page1 #login').val().substring(0, 2) === "D_") {
                         jsonObj["email"] = $('.page1 #login').val().substring('2');
                        serverip = serverip_dev;
                    } else if ($('.page1 #login').val().substring(0, 2) === "l_" || $('.page1 #login').val().substring(0, 2) === "L_") {
                        jsonObj["email"] = $('.page1 #login').val().substring('2');
                        serverip = serverip_local;
                    } else {
                        jsonObj["email"] = $('.page1 #login').val();
                    }
					
                    jsonObj["passwd"] = $('.page1 #password').val();
                    json = "";
					
                    json = JSON.stringify(jsonObj);
                    $.ajax({/* JSON logowania*/
                        method: "POST",
                        url: serverip + "/driver_api/login",
                        async: false,
                        cache: false,
                        crossDomain: true,
                        /*timeout:10000,*/
                        data: {'data': json},
                        dataType: 'json'

                    }).success(function (data) {
                        if (data.type == "success") {
                            login = true;
                            driver = {
                                id_user: data.value.id_user,
                                driver_id: data.value.driver_id,
                                first_name: data.value.first_name,
                                last_name: data.value.last_name,
                                role_id: data.value.role_id,
                                route_no: data.value.route_no};
                            if ($('.page1 #login').val() === "devtest" || $('.page1 #login').val() === "Devtest") {
                                driver.route_no = '20160809_14';
                            } else
                            if ($('.page1 #login').val() === "localhost") {
                                driver.route_no = '20160809_14';
                            }
                            $('.page2 #driver_name').text($('.page1 #login').val());
                        } else if (data.type == "error") {
                            login = false;
                            alertbox(data.msg);
                        }
                    }).fail(function (data) {
                        if (data.type == "error") {
                            login = false;
                            alertbox(t['login_error']);
                        }
                    });
                    jsonObj = {};
                    jsonObj["driver_id"] = driver.driver_id;
                    jsonObj["route_no"] = driver.route_no;
                    json = "";
                    json = JSON.stringify(jsonObj);
                    $.ajax({/* JSON pobierania info do mapy*/
                        method: "POST",
                        url: serverip + "/driver_api/map_data",
                        async: false,
                        data: {'data': json},
                        dataType: 'json'

                    }).success(function (data) { /* ten if success powinien obejmować wywołanie mapy*/
                        if (data.type == "success") {
                            mapdata = data.value;
                            markers = [];
                            var marker_temp = [];
                            for (var i = 0; i < mapdata.length; i++) {
                                marker_temp[0] = i.toString();
                                marker_temp[1] = mapdata[i].lat;
                                marker_temp[2] = mapdata[i].lng;
                                markers.push(marker_temp);
                                marker_temp = [];
                            }
                            nextPosition = new google.maps.LatLng(mapdata[0].lat, mapdata[0].lng);


                            myPosition = {lat: mapdata[0].lat, lng: mapdata[0].lng};


                            /*  alertbox('mapcluster');*/
                            markercluster = Array();
                            for (var i = 0; i < markers.length; i++) {
                                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                                bounds.extend(position);
                                marker[i] = new google.maps.Marker({
                                    position: position,
                                    map: map,
                                    title: markers[i][0],
                                    zIndex: 1
                                });
                                if (mapdata[i].delivery_status == "0") {

                                    marker[i].setMap(map);
                                    markercluster.push(marker[i]);
                                } else {
                                    marker[i].setMap(null);
                                }

                                google.maps.event.addListener(marker[i], "click", function () {
                                    event.stopPropagation();
                                    map.panTo(this.position);
                                    rightsidebar_toggle(this.title);
                                });
                            }

                            markerClusterer = new MarkerClusterer(map, markercluster, {
                                styles: [
                                    {
                                        height: 55,
                                        url: "mapicon/m1.png",
                                        width: 55
                                    },
                                    {
                                        height: 55,
                                        url: "mapicon/m2.png",
                                        width: 55
                                    },
                                    {
                                        height: 55,
                                        url: "mapicon/m3.png",
                                        width: 55
                                    },
                                    {
                                        height: 55,
                                        url: "mapicon/m4.png",
                                        width: 55
                                    },
                                    {
                                        height: 55,
                                        url: "mapicon/m5.png",
                                        width: 55
                                    }]
                            });
                            google.maps.event.addListener(markerClusterer, "click", function (c) {
                                var m = c.getMarkers();
                                var p = [];
                                var ids = [];
                                var equal = true;
                                for (var i = 0; i < m.length; i++) {
                                    p.push(m[i].getPosition());
                                    ids.push(m[i].getTitle());
                                }
                                for (var i = 0; i < m.length - 1; i++) {
                                    if (JSON.stringify(p[i]) !== JSON.stringify(p[i + 1])) {
                                        equal = false;
                                    }
                                }
                                if (equal) {
                                    rightsidebar_toggle(ids);
                                }
                            });

                            nextMarker.setPosition({lat: parseFloat(mapdata[0].lat), lng: parseFloat(mapdata[0].lng)});
                            change_nextPosition();
                            map.fitBounds(bounds);
                            if (login === true) {/* sprawdzenie logowania, otrzymanie wszystkich danych, konfiguracji */
                                $('.page1').hide();
                                $('.page2').show();
                                $('#left_list_all').empty();
                                for (var i = 0; i < mapdata.length; i++) {
                                    if (mapdata[i].day_delivery_type == "0") {
                                        mapdata[i].day_delivery_type = t['earlier'];
                                    }
                                    if (mapdata[i].day_delivery_type == "R") {
                                        mapdata[i].day_delivery_type = t['hand'];
                                    }
                                    $('#left_list_all').append(leftpointlist_html);
                                    $('#left_list_all .pointdetails').last().attr('data-pointno', mapdata[i].id_route_position);
                                    $('#left_list_all .pointdetails').last().attr('id', 'pointno_' + mapdata[i].id_route_position);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#d_name .list_no').text(i + 1);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#d_name .group-control').text(mapdata[i].address.replace(/[0-9][0-9]-[0-9][0-9][0-9]/, '').replace('ul. ', ''));
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#d_delivery_type .group-control').html(mapdata[i].day_delivery_type + '<br>' + mapdata[i].day_from_hour.slice(0, -3) + '-' + mapdata[i].day_to_hour.slice(0, -3));
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#d_address .group-control').text(mapdata[i].address);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#d_diet_type .group-control').text(mapdata[i].diet_name);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#d_phone .group-control').html('<a href="tel:' + mapdata[i].day_phone + '">' + mapdata[i].day_phone + '</a>');
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#d_driver_comments .group-control').text(mapdata[i].driver_comments);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#mycomment').val(mapdata[i].comment);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#delivered').attr('data-pointno', mapdata[i].id_route_position);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#lauchnav').attr('data-pointno', mapdata[i].id_route_position);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#lauchnav').attr('data-lnglat', mapdata[i].lat + ", " + mapdata[i].lng);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#show_on_map').attr('data-pointno', mapdata[i].id_route_position);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#show_on_map').attr('data-lnglat', mapdata[i].lat + ", " + mapdata[i].lng);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#not_delivered').attr('data-pointno', mapdata[i].id_route_position);
                                    $('#left_list_all #pointno_' + mapdata[i].id_route_position).find('#savecomment').attr('data-pointno', mapdata[i].id_route_position);
                                    if (mapdata[i].day_delivery_type == "DO RĘKI") {
                                        $('#left_list_all #pointno_' + mapdata[i].id_route_position).addClass('hand_point');
                                    }

                                    if (mapdata[i].delivery_status === '1') {
                                        $('#left_list_all #pointno_' + mapdata[i].id_route_position).addClass('point-delivered');
                                    } else if (mapdata[i].delivery_status === '2') {
                                        $('#left_list_all #pointno_' + mapdata[i].id_route_position).addClass('point-notdelivered');
                                    } else {
                                        if ($('#left_list_all .nextpoint').length == 0) {
                                            $('#left_list_all #pointno_' + mapdata[i].id_route_position).addClass('nextpoint');
                                        }
                                    }
                                }
                            }
                        } else if (data.type == "error") {
                            alertbox(data.msg);
                        }
                    }).fail(function (data) {
                        if (data.type == "error") {
                            alertbox(data.msg);
                        }
                    });


                }


            }
        }
    });
    $('#menu_start').on('click', function (e) {
        e.stopPropagation();
        $(".page").stop();
        jsonObj = {};
        jsonObj["driver_id"] = driver.driver_id;
        jsonObj["route_no"] = driver.route_no;
        json = "";
        json = JSON.stringify(jsonObj);
        $.ajax({/* JSON startu trasy*/
            method: "POST",
            url: serverip + "/driver_api/route_go",
            async: false,
            data: {'data': json},
            dataType: 'json'
        }).success(function (data) {
            work_started = true;
            /*data.value.route_token*/
            settings = {
                route_token: data.value.route_token,
                position_time: data.value.position_time,
                position_save: data.value.position_save};
            geowatchfirst = navigator.geolocation.getCurrentPosition(
                    function (position) {
                        /* GPS złapany */

                        /*    bounds.extend(myMarker.position);
                         map.fitBounds(bounds);*/

                        if (!position.coords.latitude > 0 || position.coords.latitude == 'undefined') {
                            temp_points["lat"] = position.coords.latitude;
                            temp_points["lat"] = parseFloat(temp_points["lat"]);
                            temp_points["lng"] = position.coords.longitude;
                            temp_points["lng"] = parseFloat(temp_points["lng"]);
                            temp_points_set.push(temp_points);
                        } else {

                            temp_points = {};
                            temp_points["lat"] = position.coords.latitude;
                            temp_points["lat"] = parseFloat(temp_points["lat"]);
                            temp_points["lng"] = position.coords.longitude;
                            temp_points["lng"] = parseFloat(temp_points["lng"]);
                            temp_points_set.push(temp_points);
                            myPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
                            myMarker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});

                        }

                    },
                    function (error) {


                    },
                    {maximumAge: 0, timeout: 9000, enableHighAccuracy: true});
            map.panTo(nextPosition);
            geowatch_listener = setInterval(function () {
                if (login) {
                    geowatch = navigator.geolocation.getCurrentPosition(
                            function (position) {
                                /* GPS złapany */

                                /*    bounds.extend(myMarker.position);
                                 map.fitBounds(bounds);*/
                                if (!position.coords.latitude > 0 || position.coords.latitude == 'undefined') {
                                    temp_points["lat"] = position.coords.latitude;
                                    temp_points["lat"] = parseFloat(temp_points["lat"]);
                                    temp_points["lng"] = position.coords.longitude;
                                    temp_points["lng"] = parseFloat(temp_points["lng"]);
                                    temp_points_set.push(temp_points);
                                } else {
                                    temp_points = {};
                                    temp_points["lat"] = position.coords.latitude;
                                    temp_points["lat"] = parseFloat(temp_points["lat"]);
                                    temp_points["lng"] = position.coords.longitude;
                                    temp_points["lng"] = parseFloat(temp_points["lng"]);
                                    temp_points_set.push(temp_points);
                                    myPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
                                    myMarker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});

                                }
                            },
                            function (error) {
                                /* Gdy nie można złapać gpsa*/
                            },
                            {maximumAge: 0, timeout: 9000, enableHighAccuracy: true});
                    if (temp_points_set.length >= parseInt(settings.position_save)) {

                        jsonObj = {};
                        jsonObj["driver_id"] = driver.driver_id;
                        jsonObj["route_token"] = settings.route_token;
                        jsonObj["route_points"] = temp_points_set;
                        json = "";
                        json = JSON.stringify(jsonObj);
                        $.ajax({/* JSON wysylania punktow*/
                            method: "POST",
                            url: serverip + "/driver_api/route_in",
                            async: false,
                            timeout: parseInt(settings.position_time) * 1000,
                            data: {'data': json},
                            dataType: 'json'
                        })
                                .success(function (data) {
                                    temp_points_set = [];
                                })
                                .fail(function (data) {
                                    /* Błąd wysyłania pozycji*/

                                });
                    }
                }
            }, (parseInt(settings.position_time) * 1000));
        }).fail(function (data) { /* błąd pobierania konfiguracji*/
            work_started = false;
            alertbox(t['config_error']);
        });
    });
    $('body').on('click', '#show_on_map', function () {
        if ($('.left-sidebar').css('opacity') !== '0') {
            leftsidebar_toggle();
        }

        if ($('.right-sidebar').css('opacity') !== '0') {
            rightsidebar_toggle();
        }
        var this_lnglat = $(this).attr('data-lnglat');
        this_lnglat = this_lnglat.split(', ');
        map.setZoom(18);
        map.panTo({lat: parseFloat(this_lnglat[0]), lng: parseFloat(this_lnglat[1])});
    });
    $('.menuitem').on('click', function () {
        $('.page1').stop().hide();
        $('.page2').stop().hide();
        $('.sidebar #menu_backtomain').show();

        $('.sidebar').removeClass('not_started');
        $('body').find('.' + $(this).attr('id')).stop().show();
        if ($(this).attr('id') === 'menu_map') {
            $('.sidebar #menu_backtomain').show();
            $('.sidebar #menu_end').hide();
            $('.sidebar').addClass('not_started');
            map.panTo(nextPosition);
            $('body').find('.' + $(this).attr('id')).css('visibility', 'visible');
        }
        if ($(this).attr('id') === 'menu_start') {
            $('.sidebar #menu_backtomain').hide();
            $('.sidebar #menu_end').show();

            $(".menu_map").css('visibility', 'visible');
            $(".menu_map").css('display', 'block');
            leftsidebar_toggle();
        }
        if ($(this).attr('id') === 'menu_list') {

            $('.page3').stop().show();
            $('#main_list_all').empty();
            for (var i = 0; i < mapdata.length; i++) {
                $('#main_list_all').append(leftpointlist_html);
                $('#main_list_all .pointdetails').last().attr('data-pointno', mapdata[i].id_route_position);
                $('#main_list_all .pointdetails').last().attr('id', 'pointno_' + mapdata[i].id_route_position);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#d_name .list_no').text(i + 1);
                /* $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#d_name .group-control').text(mapdata[i].client_first_name + ' ' + mapdata[i].client_last_name);*/
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#d_name .group-control').text(mapdata[i].address.replace(/[0-9][0-9]-[0-9][0-9][0-9]/, '').replace('ul. ', ''));

                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#d_delivery_type .group-control').html(mapdata[i].day_delivery_type + '<br>' + mapdata[i].day_from_hour.slice(0, -3) + '-' + mapdata[i].day_to_hour.slice(0, -3));
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#d_address .group-control').text(mapdata[i].address);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#d_diet_type .group-control').text(mapdata[i].diet_name);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#d_phone .group-control').html('<a href="tel:' + mapdata[i].day_phone + '">' + mapdata[i].day_phone + '</a>');
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#d_driver_comments .group-control').text(mapdata[i].driver_comments);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#mycomment').val(mapdata[i].comment);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#lauchnav').attr('data-lnglat', mapdata[i].lat + ", " + mapdata[i].lng);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#lauchnav').attr('data-pointno', mapdata[i].id_route_position);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#show_on_map').attr('data-lnglat', mapdata[i].lat + ", " + mapdata[i].lng);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#show_on_map').attr('data-pointno', mapdata[i].id_route_position);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#not_delivered').attr('data-lnglat', mapdata[i].lat + ", " + mapdata[i].lng);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#delivered').attr('data-pointno', mapdata[i].id_route_position);
                $('#main_list_all #pointno_' + mapdata[i].id_route_position).find('#savecomment').attr('data-pointno', mapdata[i].id_route_position);
                if (mapdata[i].day_delivery_type == "DO RĘKI") {
                    $('#main_list_all #pointno_' + mapdata[i].id_route_position).addClass('hand_point');
                }
                if (mapdata[i].delivery_status === '1') {
                    $('#main_list_all #pointno_' + mapdata[i].id_route_position).addClass('point-delivered');
                } else if (mapdata[i].delivery_status === '2') {
                    if ($('#main_list_all .nextpoint').length == 0) {
                        $('#main_list_all #pointno_' + mapdata[i].id_route_position).addClass('point-notdelivered');
                    }
                }
            }
            setHeights();
        }
        if ($(this).attr('id') === 'menu_back') {
            $('.page1').stop().hide();
            $('.page3').stop().hide();
            $('.page2').stop().show();
        }
    });
    $('body').on('click', '.multiplepoints .right-wrapper', function () {
        if ($(this).hasClass('unfolded')) {
            $(this).removeClass('unfolded');
        } else {
            $(this).addClass('unfolded');
        }
    });
    $('body').on('click', '.menu_map', function (e) {
        if ($('.left-sidebar').css('opacity') !== '0') {
            leftsidebar_toggle();
        }
        if ($('.right-sidebar').css('opacity') !== '0') {
            rightsidebar_toggle();
        }

    });
    $('#submenu').on('click', function (e) {
        e.stopPropagation();
        leftsidebar_toggle();
    });
    $('body').on('click', '#delivered', function (e) {
        tempvar = $(this);
        e.stopPropagation();
        jsonObj = {};
        jsonObj["driver_id"] = driver.driver_id;
        jsonObj["id_route_position"] = $(this).attr('data-pointno');
        jsonObj["done"] = '1';
        json = "";
        json = JSON.stringify(jsonObj);
        $.ajax({/* JSON dostarczenia*/
            method: "POST",
            url: serverip + "/driver_api/deliver",
            async: false,
            data: {'data': json},
            dataType: 'json'
        }).success(function (data) {
            if (data.type == "success") {
                $('.left-sidebar #pointno_' + tempvar.attr('data-pointno')).removeClass('point-notdelivered');
                $('.left-sidebar #pointno_' + tempvar.attr('data-pointno')).removeClass('unfolded');
                $('.left-sidebar #pointno_' + tempvar.attr('data-pointno')).addClass('point-delivered');
                $('.right-sidebar #pointno_' + tempvar.attr('data-pointno')).removeClass('point-notdelivered');
                $('.right-sidebar #pointno_' + tempvar.attr('data-pointno')).removeClass('unfolded');
                $('.right-sidebar #pointno_' + tempvar.attr('data-pointno')).addClass('point-delivered');

                mapdata[parseInt($('.left-sidebar #pointno_' + jsonObj["id_route_position"]).find('.list_no').text()) - 1].delivery_status = '1';
                marker[parseInt($('.left-sidebar  #pointno_' + jsonObj["id_route_position"]).find('.list_no').text()) - 1].setMap(null);


                change_nextPosition();
            } else if (data.type == "error") {
                alertbox(t['point_delivered']);
            }
        }).fail(function (data) {
            if (data.type == "error") {
                alertbox(data.msg);
            }
        });




    });
    $('body').on('click', '#not_delivered', function () {
        tempvar = $(this);
        if ($(this).closest('.sidebar').find('#pointno_' + $(this).attr('data-pointno')).find('#mycomment').val().trim().length == 0) {
            $('.hideok').removeClass('hideok');
            $(this).closest('.sidebar').find('#pointno_' + $(this).attr('data-pointno')).find('#d_my_comment').addClass('hideok');
            $(this).closest('.sidebar').find('#pointno_' + $(this).attr('data-pointno')).addClass('showalert');
            $(this).closest('.sidebar').find('.mycomment_validate').show();
            $(this).closest('.sidebar').find('.mycomment_validate .validate_wrapper').css('top', $(this).closest('.sidebar').find('.hideok').offset().top - $(this).closest('.sidebar').find('.mycomment_validate .validate_wrapper').innerHeight());

        } else {
            hide_commentvalidate();
            $('.hideok').removeClass('hideok');
            jsonObj = {};
            jsonObj["driver_id"] = driver.driver_id;
            jsonObj["id_route_position"] = $(this).attr('data-pointno');
            jsonObj["done"] = '2';
            json = "";
            json = JSON.stringify(jsonObj);
            $.ajax({/* JSON dostarczenia*/
                method: "POST",
                url: serverip + "/driver_api/deliver",
                async: false,
                data: {'data': json},
                dataType: 'json'
            }).success(function (data) {
                if (data.type == "success") {
                    $('.left-sidebar #pointno_' + tempvar.attr('data-pointno')).addClass('point-notdelivered');
                    $('.left-sidebar #pointno_' + tempvar.attr('data-pointno')).removeClass('unfolded');
                    $('.left-sidebar #pointno_' + tempvar.attr('data-pointno')).removeClass('point-delivered');
                    $('.right-sidebar #pointno_' + tempvar.attr('data-pointno')).addClass('point-notdelivered');
                    $('.right-sidebar #pointno_' + tempvar.attr('data-pointno')).removeClass('unfolded');
                    $('.right-sidebar #pointno_' + tempvar.attr('data-pointno')).removeClass('point-delivered');

                    mapdata[parseInt($('.left-sidebar #pointno_' + jsonObj["id_route_position"]).find('.list_no').text()) - 1].delivery_status = '2';
                    marker[parseInt($('.left-sidebar  #pointno_' + jsonObj["id_route_position"]).find('.list_no').text()) - 1].setMap(null);

                    change_nextPosition();
                } else if (data.type == "error") {
                    alertbox(t['point_delivered']);
                }
            }).fail(function (data) {
                if (data.type == "error") {
                    alertbox(data.msg);
                }
            });
        }
    });
    $('body').on('click', '#lauchnav', function () {
        var lnglat = $(this).attr('data-lnglat');
        navigator.geolocation.getCurrentPosition(
                function (position) {
                    launchnavigator.navigate(lnglat, {
                        start: position.coords.latitude + ", " + position.coords.longitude
                    });
                },
                function (error) {
                    alertbox(t['gps_error']);
                },
                {maximumAge: 0, timeout: 9000, enableHighAccuracy: true});
    });
    $('body').on('click', '#savecomment', function () {
        jsonObj = {};
        jsonObj["driver_id"] = driver.driver_id;
        jsonObj["id_route_position"] = $(this).attr('data-pointno');
        jsonObj["rp_comment"] = $(this).prev('#mycomment').val();
        json = "";
        json = JSON.stringify(jsonObj);
        $.ajax({/* JSON zapis komentarza*/
            method: "POST",
            url: serverip + "/driver_api/comment",
            async: false,
            data: {'data': json},
            dataType: 'json'

        }).success(function (data) {
            if (data.type == "success") {
                alertbox(t['Zapisano komentarz']);
            } else if (data.type == "error") {
                alertbox(data.msg);
            }
        }).fail(function (data) {
            if (data.type == "error") {
                alertbox(data.msg);
            }
        });
    });
    $('body').on('click', '#menu_logout', function () {
        login = false;
        work_started = false;
        window.location.reload();
    });
    $('body').on('click', '.left-sidebar #menu_end', function () {
        $('#end_dialog').show();
    });
    $('body').on('click', '.left-sidebar #menu_backtomain', function () {
        leftsidebar_toggle();
        $(".menu_map").css('visibility', 'hidden');
        $(".menu_map").css('display', 'none');
        $('.page3').stop().hide();
        $('.page2').stop().show();
    });
    $('body').on('click', '.pointlist_item #d_name', function () {
        $('.hideok').removeClass('hideok');

        if ($(this).parents('.pointlist_item').hasClass('unfolded')) {
            $(this).parents('.pointlist_item').removeClass('unfolded');
        } else {
            $('.pointlist_item').removeClass('unfolded');
            $(this).parents('.pointlist_item').addClass('unfolded');
        }
    });
    $('body').on('click', '.page3 .pointlist_item #d_name', function () {
        scrolltotop = $(this).parents('.pointlist_item').offset().top;
        $("body, html").animate({scrollTop: scrolltotop});
    });
    $('body').on('click', '.sidebar .pointlist_item #d_name', function () {
        scrolltotop = $(this).parents('.pointlist_item').parents('.points_as_list').scrollTop() + $(this).parents('.pointlist_item').position().top;
        $(this).parents('.pointlist_item').parents('.points_as_list').animate({scrollTop: scrolltotop});
    });

    $('body').on('click', '.mycomment_validate', function () {
        hide_commentvalidate();
    });
    $('body').on('click', '.showalert #mycomment', function () {
        hide_commentvalidate();
    });
    /*
     $('body').on("swipeleft", function () {
     if ($('.left-sidebar').css('opacity') !== '0') {
     leftsidebar_toggle();
     }
     });
     $('body').on("swiperight", function () {
     if ($('.right-sidebar').css('opacity') !== '0') {
     rightsidebar_toggle();
     }
     
     });*/
    $('body').on('click', '#menu_hide', function () {
        if ($('.right-sidebar').css('opacity') !== '0') {
            rightsidebar_toggle();
        }
        if ($('.left-sidebar').css('opacity') !== '0') {
            leftsidebar_toggle();
        }
    });
});
window.addEventListener("resize", function () {
    setHeights();
}, false);
document.addEventListener("backbutton", onBackKeyDown, false);
document.addEventListener("offline", function () {
    online = false;
}, false);
document.addEventListener("online", function () {
    online = true;
}, false);
window.onbeforeunload = function (e) {
    jsonObj = {};
    jsonObj["driver_id"] = driver.driver_id;
    jsonObj["route_token"] = settings.route_token;
    jsonObj["route_points"] = temp_points_set;
    json = "";
    json = JSON.stringify(jsonObj);
    $.ajax({/* JSON wysylania punktow*/
        method: "POST",
        url: serverip + "/driver_api/route_in",
        async: false,
        timeout: parseInt(settings.position_time) * 1000,
        data: {'data': json},
        dataType: 'json'
    })
            .success(function (data) {
                temp_points_set = [];
            })
            .fail(function (data) {
                /* Błąd wysyłania pozycji*/

            });

    backgroundGeoLocation.stop();
    localStorage.clear();
    navigator.app.exitApp();
};


var temp_lat;
var temp_lng;
var bgpos;
var dt;
var time;
var HasNewLocation = false;

document.addEventListener("pause", function () {
    clearInterval(bgpos);
    if (!login) {
        backgroundGeoLocation.stop();

        //    cordova.plugins.backgroundMode.disable();
        localStorage.clear();
        navigator.app.exitApp();
    } else {
        /*
         cordova.plugins.backgroundMode.ondeactivate = function () {
         clearInterval(bgpos);
         backgroundGeoLocation.stop();
         };
         cordova.plugins.backgroundMode.onfailure = function () {
         clearInterval(bgpos);
         backgroundGeoLocation.stop();
         };
         cordova.plugins.backgroundMode.onactivate = function () {*/
        var callbackFn = function (coords) {
            temp_lat = parseFloat(coords.latitude);
            temp_lng = parseFloat(coords.longitude);
            /*  dt = new Date();
             time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();*/
            HasNewLocation = true;
            backgroundGeoLocation.finish();
        };
        var failureFn = function (error) {
            console.log('backgroundGeoLocation error');
        };
        backgroundGeoLocation.configure(callbackFn, failureFn, {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 1,
            interval: 1000,
        });

        if (work_started) {
            backgroundGeoLocation.start();
            bgpos = setInterval(function () {

                /*      console.log(HasNewLocation + ' ' + time + ': lat:' + temp_lat + ' lng:' + temp_lng);*/
                if (HasNewLocation) {
                    temp_points = {};
                    temp_points["lat"] = temp_lat;
                    temp_points["lat"] = parseFloat(temp_points["lat"]);
                    temp_points["lng"] = temp_lng;
                    temp_points["lng"] = parseFloat(temp_points["lng"]);
                    temp_points_set.push(temp_points);

                    myPosition = {lat: temp_lat, lng: temp_lng};
                    myMarker.setPosition({lat: temp_lat, lng: temp_lng});
                    HasNewLocation = false;

                    backgroundGeoLocation.start();
                }
            }, parseInt(settings.position_time) * 1000);
        }
        //  };
        // cordova.plugins.backgroundMode.setDefaults({text: 'Aplikacja pracuje w tle'});
        //  cordova.plugins.backgroundMode.enable();

    }
}, false);

document.addEventListener("resume", function () {

    clearInterval(bgpos);

    backgroundGeoLocation.stop();
    /*  console.log(temp_points_set);*/
    // cordova.plugins.backgroundMode.disable();
}, false);

document.addEventListener("online", function () {
    online = true;
}, false);