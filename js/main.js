// JavaScript source code
var nine_value = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var index = 0;
var radar;

function nineOut(callback) {
    $("#nine_c_two").fadeOut(100, function () {
        $("#nine_c_one").fadeOut(100, callback);
    });
};

function nineIn() {
    $("#nine_c_one").fadeIn("fast", function () {
        $("#nine_c_two").fadeIn("fast");
    });
};

function setValues(i) {
    var nine = datas[i];
    $("#nine_title").text("第" + (i + 1) + "题");
    var value = nine[0];
    $("#nine_c_one").text(value.name).attr("value", value.value);
    value = nine[1];
    $("#nine_c_two").text(value.name).attr("value", value.value);
};

function getValues(item) {
    var i = item.attr("value");
    nine_value[i]++;

    $("#container").text(nine_value);

    nineEnd();
};

function nineEnd() {
    for (var i = 0; i < nine_value.length; i++) {
        radar.datasets[0].points[i].value = nine_value[i];
    }
    radar.update(1);
};

$(document).ready(function () {
    var ctx = document.getElementById("canvas").getContext("2d");
    var radarChartData = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
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

    $("button[name='nine_c']").click(function (i) {
        var item = $(this);
        nineOut(function () {
            getValues(item);

            index++;
            if (index >= datas.length)
                nineEnd();
            else {
                setValues(index);
                nineIn();
            }
        });
    });

    setValues(index);
});