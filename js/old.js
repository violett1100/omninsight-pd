// navbar
$('.toggle').click(function() {
    $('.nav-list').toggleClass('active')
    $('.nav-bg').toggleClass('active')
    $('.toggle').toggleClass('active')
});

$('.nav-item').click(function() {
    $('.nav-list').removeClass('active')
    $('.nav-bg').removeClass('active')
    $('.toggle').removeClass('active')
});

// privacy & copyright{
$('a[href="#privacy"]').on('click', function() {
    $('#privacy').addClass('show');
})
$('a[href="#copyright"]').on('click', function() {
    $('#copyright').addClass('show');
})
$('.close').on('click', function() {
    $('#privacy').removeClass('show');
    $('#copyright').removeClass('show');

})

// 錨點
$('.top, .home').click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000, 'swing');
    return false;
});

// menu錨點
$('a.nav-item').click(function() {
    let getID = $(this).attr("href")
    var secTop = $(getID).offset().top - 80;
    $("html, body").animate({ scrollTop: secTop }, 1000, 'swing');
    return false;
});


//換圖
if ($(window).width() < 576) {
    var titleImg = '<img src="./media/images/t-2-2-sm.png" alt="">'
    $('.sec2-2 h2 span').html(titleImg)
}


// 換字
if ($(window).width() < 992) {
    $('.sec-main .row').append($('.sec-main h3.subtitle'));
    $('.sec-main .row').append($('.sec-main p.para'));
}



// heartlline
$('svg').ready();
var X = 0;
var Y = 0;

$(window).scroll(function() {
    var N = $(window).scrollTop()

    var lineAnimation = $('.line-animation')
    $.each(lineAnimation, function(i, item) {
        var P = $(item).offset().top - 600; /*從最上方偏移多少*/
        if (N > P) {
            $(item).find('.heartline').addClass('ani')
            $(item).removeClass('line-animation')
        }

    })


    // top
    if (N > 600) {
        $('.top').addClass('show-top')

    } else {
        $('.top').removeClass('show-top')

    }


    // bar chart
    var barChart = $('.sec1-1').offset().top; /*從最上方偏移多少*/
    if (N > barChart) {
        $('.bar').addClass('grow')
    }


    // count
    if (X == 0) {
        var countTop = $('.sec1-4').offset().top - 200;

        if (N > countTop) {
            $('a[data-num="36"]').click();
            X++;
        }

    }


    // VS
    if (Y == 0) {
        var vsTop = $('.sec1-5').offset().top - 100;

        if (N > vsTop) {
            $('a[data-pdNum="47"]').click();
            Y++;
        }
    }
    // console.log(X)
})


var countSwitch = false;

$('.count-num').on('click', function() {
    if (countSwitch || $(this).hasClass('active')) {
        return
    }
    countSwitch = true;
    let noColor = '<img src="./media/images/icon1-4-3.png" alt="">'

    $('.icon-box').removeClass('color').html(noColor);
    $('.count-num').removeClass('active');
    $(this).addClass('active');
    num = $(this).attr('data-num');
    sec = $(this).attr('data-sec');
    count(num, sec);
})

function count(num, sec) {
    var now = 0;
    var stepTime = sec / num;

    let fullColor = '<img src="./media/images/icon1-4-1.png" alt="">'
    let halfColor = '<img src="./media/images/icon1-4-2.png" alt="">'
    var timer = setInterval(function() {
        now += 1;
        var i = Math.floor(now / 10);

        if (now > (i - 1) * 10) {
            j = num - (i) * 10;
            if (j >= 2 && j < 8) {
                png(i + 1, halfColor)
            } else if (j >= 8) {
                png(i + 1, fullColor)
            }
        }

        // console.log(now);
        if (now > num) {
            window.clearInterval(timer);
            countSwitch = false;
        } else {
            $('.count').text(Math.ceil(now));
        }
    }, stepTime);

    function png(i, img) {
        $('.icon-box:nth-child(' + i + ')').addClass('color')
        setTimeout(function() {
            $('.icon-box:nth-child(' + i + ')').html(img);
        }, 500);
    }


}

// VS
var vsSwitch = false;

$('.vs').on('click', function() {
    if (vsSwitch || $(this).hasClass('active')) {
        return
    }
    vsSwitch = true;
    $('.bb-bg').removeClass('click');
    $('.vs').removeClass('active');
    $(this).addClass('active');
    pd = $(this).attr('data-pdNum');
    hd = $(this).attr('data-hdNum');
    text = $(this).attr('data-text');
    pdCount(pd, text);
    hdCount(hd, text);
})



function pdCount(pd, text) {
    var now = 0;
    var stepTime = 20;
    var timer = setInterval(function() {
        now += 1;
        if (now > pd) {

            window.clearInterval(timer);
            vsSwitch = false;
        } else {
            $('.pd .percent span').text(Math.ceil(now));
            $('.pd p span').text(text);
            $('.bb-bg').addClass('click');
        }
    }, stepTime);
}

function hdCount(hd, text) {
    var now = 0;
    var stepTime = 20;
    var timer = setInterval(function() {
        now += 1;
        if (now > hd) {

            window.clearInterval(timer);
            vsSwitch = false;
        } else {
            $('.hd .percent span').text(Math.ceil(now));
            $('.hd p span').text(text);
            $('.bb-bg').addClass('click');
        }
    }, stepTime);
}



// chart js

$('.submit').on('click', function() {
    var showChart = '<div><canvas id="myChart"></canvas><div class="chart-shadow"><div class="white-circle"></div></div></div>';
    var showText = '<div class="chart-text"><div class="text-center"><p>工作收入減少</p><p><b>10,000至20,000元</b></p><p>的腎友為</p><p class="big">59%</p></div></div>';

    if ($(window).width() < 992) {
        $('.mob-show-chart').html(showChart);
        $('.mob-show-chart>div').append(showText);


    } else {
        $('.show-chart').html(showChart);
        $('.show-chart>div').append(showText);

    }

    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                '5,000元以下',
                '5,000至10,000元',
                '10,000至20,000元',
                '20,000至30,000元',
                '30,000元以上',
                '沒有減少'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [1.2, 14.8, 12.3, 7.8, 4.9, 59],
                backgroundColor: [
                    '#ffe6a9',
                    '#ffe6a9',
                    '#ffe6a9',
                    '#ffe6a9',
                    '#ffe6a9',
                    '#ffe6a9',
                ],
                hoverBackgroundColor: '#fec300',
                borderColor: [
                    '#56401f',
                ],
                borderWidth: 2,
            }],
        },
        options: {
            onClick: (e) => {
                let index = myChart.getActiveElements()[0].index;
                let count = myChart.data.datasets[0].data.length;

                let dataNum = myChart.data.datasets[0].data[index];
                let dataText = myChart.data.labels[index];

                for (let i = 0; i < count; i++) {
                    myChart.data.datasets[0].backgroundColor[i] = (i == index) ? '#fec300' : '#ffe6a9';
                }

                $('.chart-text p>b').html(dataText);
                $('.chart-text p.big').html(dataNum + '%');

                myChart.update();
            },
            cutout: 100,
            elements: {
                arc: {
                    // spacing: -10,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },

                tooltip: {
                    enabled: false,
                    displayColors: false,
                    events: ['click'],
                },
            }
        }

    });

    myChart.data.datasets[0].backgroundColor[$('#salary').val()] = '#fec300';
    dataNum = myChart.data.datasets[0].data[$('#salary option:selected').val()];
    dataText = $('#salary option:selected').text();

    $('.chart-text p>b').html(dataText);
    $('.chart-text p.big').html(dataNum + '%');

    myChart.update();

    $(this).addClass('disable');
    $(this).off('click');

});

$('.submit').on('click', function() {
    $('.chart-text').css('opacity', '1');
    setTimeout(function() {
        $('.chart-shadow').addClass('active');


    }, 1000);
});
$('.submit').on('click', function() {
    setTimeout(function() {
        $('.chart-shadow').addClass('tran')
    }, 1200);
});



// gsap
// gsap.to('.subtitle', { duration: 2, x: 200 });

gsap.utils.toArray(".slideIn").forEach(function(section) {
    var media = section;
    gsap.from(media, {
        duration: 0.8,
        autoAlpha: 0,
        x: -100,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            // markers: true
        },
    });
});

gsap.utils.toArray(".fadeIn").forEach(function(section) {
    var media = section;
    gsap.from(media, {
        opacity: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            // markers: true
        },
    });
});

gsap.from('.g1', {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.g1',
    },
});

gsap.from('.g1-2-chat', {
    opacity: 0,
    y: 40,
    stagger: 0.4,
    scrollTrigger: {
        trigger: '.g1-2-chat',
    },
});


var wrapper = gsap.utils.toArray(".g-wrapper");
wrapper.forEach(wrap => {
    const boxes = wrap.querySelectorAll('.g-text')
    gsap.from(boxes, {
        scrollTrigger: {
            trigger: wrap,
            start: 'top 80%',
            // markers: true
        },
        opacity: 0,
        y: 40,
        stagger: 0.2,
    });
});


gsap.from('.bb-group', {
    opacity: 0,
    delay: 0.5,
    duration: 1.2,
    // scaleY: 0.5,
    // scaleX: 0.5,
    // transformOrigin: 'center',
    scrollTrigger: {
        trigger: '.bb-group',
    },
});


gsap.utils.toArray(".scaleShow").forEach(function(section) {
    var media = section;
    gsap.from(media, {
        opacity: 0,
        duration: 0.8,
        scaleY: 0.7,
        scaleX: 0.7,
        transformOrigin: 'center',
        scrollTrigger: section,
    });
});