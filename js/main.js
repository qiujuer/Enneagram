// JavaScript source code
var nine_value = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var index = 0;
var radar;


function nineOut(callback) {
    $("#nine_c_one").fadeOut(180);
    $("#nine_c_two").fadeOut(200, callback);
};

function nineIn() {
    $("#nine_c_one").fadeIn(150, function () {
        $("#nine_c_two").fadeIn(150);
    });
};

function setValues(i) {
    var nine = datas[i];
    var count = i + 1;
    $("#nine_title").text("No. " + count + " - 144");
    var value = nine[0];
    $("#nine_c_one").text(value.name).attr("value", value.value);
    value = nine[1];
    $("#nine_c_two").text(value.name).attr("value", value.value);
};

function getValues(item) {
    var i = item.attr("value");
    nine_value[i]++;
};

function nineEnd() {
    $("#nine_title").text("Oh~ Good Nice!");
    $("#nine_select").hide();
    $("#canvas").show();

    for (var i = 0; i < nine_value.length; i++) {
        radar.datasets[0].points[i].value = nine_value[i];
    }
    radar.update();
};

$(document).ready(function () {
    var ctx = document.getElementById("canvas").getContext("2d");
    var radarChartData = {
        labels: ["完美型", "助人型", "成就型", "自我型", "理智型", "疑惑型", "活跃型", "领袖型", "和平型"],
        datasets: [
            {
                label: "Nine",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: nine_value
            }
        ]
    };
    radar = new Chart(ctx).Radar(radarChartData, {
        responsive: true
    });

    $("#canvas").hide();

    $("button[name='nine_c']").click(function () {
        index++;
        if (index >= datas.length)
            nineEnd();
        else {
            var item = $(this);
            nineOut(function () {
                getValues(item);
                setValues(index);
                nineIn();
            });
        }
    });

    // First call set 
    setValues(index);
});