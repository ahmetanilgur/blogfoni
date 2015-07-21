/// <reference path="../../typings/jquery/jquery.d.ts"/>
$("p").each(function () {
    if ($(this).text().length>140) {
        $(this).text($(this).text().substr(0, 140) + "...");
    }
});
$('b').each(function () {
    if ($(this).text().length>50) {
        $(this).text($(this).text().substr(0, 50) + "...");
    }
});