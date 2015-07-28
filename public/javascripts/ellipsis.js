/// <reference path="../../typings/jquery/jquery.d.ts"/>

/**TODO : Move into a config file */
var clientSideConfig = {
    elements : {
        parapraph  : 'p'
    },
    styles : {
        bold  : 'b'
    }
}

$(clientSideConfig.elements.parapraph).each(function () {
    if ($(this).text().length>140) {
        $(this).text($(this).text().substr(0, 140) + "...");
    }
});

$(clientSideConfig.styles.bold).each(function () {
    if ($(this).text().length>50) {
        $(this).text($(this).text().substr(0, 50) + "...");
    }
});