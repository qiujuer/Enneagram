// JavaScript source code
var nine_value = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var index = 0;
var radar;


function nineOut(callback) {
    $("#nine_c_one").fadeOut(100);
    $("#nine_c_two").fadeOut(100, callback);
};

function nineIn() {
    $("#nine_c_one").fadeIn("fast", function () {
        $(this).removeAttr("data-upgraded");
        componentHandler.upgradeElement(document.getElementById('nine_c_one'));
    });
    $("#nine_c_two").fadeIn("fast", function () {
        $(this).removeAttr("data-upgraded");
        componentHandler.upgradeElement(document.getElementById('nine_c_two'));
    });
};

function setValues(i) {
    var nine = datas[i];
    var count = i + 1;
    $("#nine_title").html("No. " + count + " - " + (((count * 100 / 144).toFixed(0))) + "%");
    var value = nine[0];
    $("#nine_c_one").html(value.name).val(value.value);
    value = nine[1];
    $("#nine_c_two").html(value.name).val(value.value);
};

function getValues(item) {
    var i = item.attr("value");
    nine_value[i]++;
};

function nineEnd() {
    $("#nine_title").text("Oh~ Good Nice!");
    $("#nine_select").hide();
    $("#ninie_result").show();
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
                fillColor: "rgba(156, 39, 176, 0.4)",
                strokeColor: "rgba(156, 39, 176, 1)",
                pointColor: "rgba(156, 39, 176, 0.8)",
                pointStrokeColor: "#7b1fa2",
                pointHighlightFill: "#7b1fa2",
                pointHighlightStroke: "rgba(156, 39, 176, 1)",
                data: nine_value
            }
        ]
    };
    radar = new Chart(ctx).Radar(radarChartData, {
        responsive: true
    });

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

    $("#nine_start").click(function () {
        $("#nine_help").fadeOut(300, function () {
            $(this).hide();
            setValues(index);
            $("#nine_select").show();
            nineIn();
        });
    });

    // First 
    $("#canvas").hide();
    $("#nine_select").hide();
    $("#ninie_result").hide();
});