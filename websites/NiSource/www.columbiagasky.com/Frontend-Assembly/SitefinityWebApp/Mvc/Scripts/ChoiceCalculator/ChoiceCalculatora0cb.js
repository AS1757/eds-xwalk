
function costCompareInit(id) {
    var container = document.getElementById(id);
    var theSlider = $(container).find('input[type="range"]');

    // Put asterisk next to value if there's a disclaimer
    if (container.getElementsByClassName("disclaimer")[0] != null && container.getElementsByClassName("disclaimer")[0].innerHTML !== "") {
        container.getElementsByClassName("disclaimer-asterisk")[0].innerHTML = "<sup>*</sup>";
    }

    sliderVal(container.getElementsByClassName('slider-label')[0].innerHTML, id);

    // Make Slider work on different browsers and environments
    var winNav = window.navigator,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIE = winNav.userAgent.indexOf("MSIE") > -1,
        isIE11 = winNav.userAgent.indexOf("rv:11.0") > -1;

    if (isIEedge === false && isIE === false && isIE11 === false) {
        setTheSliderBackground(container);

        theSlider.bind('mousemove',
            function () {
                var slider = this;
                loadSliderColors(container, slider);
            });

        theSlider.bind('touchmove',
            function () {
                var slider = this;
                loadSliderColors(container, slider);
            });
    }
}

// Get slider value and trigger calculation.  This method is directly on the slider in the HTML
function sliderVal(size, id) {
    var container = document.getElementById(id);
    container.getElementsByClassName('slider-label')[0].innerHTML = Number(size).toFixed(0);
    calculateSavings(id);
}

// Check that the fields are valid numbers and not 0
function fieldValueChecker(theValue) {
    var patt1 = /^(\d+)?\.?\d+$/g;
    var result = theValue.match(patt1);

    if (theValue !== "0" && result !== null) {
        return true;
    }

    return false;
}

function calculateSavings(id) {

    var container = document.getElementById(id);
    var savingsBetweenValuesMessage = container.getElementsByClassName("savings-between-values-message")[0].innerHTML;
    var modeFields = container.getElementsByClassName("modefields")[0].innerHTML;

    var firstFieldValue = container.getElementsByClassName("first-field")[0].value;
    var secondFieldValue = container.getElementsByClassName("second-field")[0].value;
    var thirdFieldValue = 0;
    var fourthFieldValue = 0;
    var fifthFieldValue = 0;
    var sixthFieldValue = 0;
    if (modeFields == 1 || modeFields == 2) {
        console.log("Getting other fields");
        thirdFieldValue = container.getElementsByClassName("third-field")[0].value;
        fourthFieldValue = container.getElementsByClassName("fourth-field")[0].value;
    }
    if (modeFields == 2) {
        console.log("Getting other fields");
        fifthFieldValue = container.getElementsByClassName("fifth-field")[0].value;
        sixthFieldValue = container.getElementsByClassName("sixth-field")[0].value;
    }

    if (fieldValueChecker(firstFieldValue) && fieldValueChecker(secondFieldValue)) {
        var monthlyMultiplier = Number(container.getElementsByClassName("savings-monthly-multiplier")[0].innerHTML);
        var savingsBetweenValues = (firstFieldValue - secondFieldValue) + (thirdFieldValue - fourthFieldValue) + (fifthFieldValue - sixthFieldValue);
        var totalSaving = savingsBetweenValues * container.getElementsByClassName('slider-label')[0].innerHTML * monthlyMultiplier;

        if (savingsBetweenValues < 0) {
            savingsBetweenValues = Math.abs(savingsBetweenValues.toFixed(4));
            savingsBetweenValues = savingsBetweenValuesMessage.replace("{0}", "-$" + ((Math.floor((savingsBetweenValues * 100).toFixed(2)) >= (savingsBetweenValues * 100).toFixed(2) && (Math.floor(savingsBetweenValues) < savingsBetweenValues)) ? savingsBetweenValues.toFixed(2) : savingsBetweenValues));
        } else {
            savingsBetweenValues = Math.abs(savingsBetweenValues.toFixed(4));
            savingsBetweenValues = savingsBetweenValuesMessage.replace("{0}", "$" + ((Math.floor((savingsBetweenValues * 100).toFixed(2)) >= (savingsBetweenValues * 100).toFixed(2) && (Math.floor(savingsBetweenValues) < savingsBetweenValues)) ? savingsBetweenValues.toFixed(2) : savingsBetweenValues));
        }

        if (totalSaving < 0) {
            container.getElementsByClassName("estimated-savings-amount")[0].innerHTML = "-$" + Math.round(Math.abs(totalSaving)).toFixed(0);
        } else {

            container.getElementsByClassName("estimated-savings-amount")[0].innerHTML = "$" + Math.round(totalSaving).toFixed(0);
        }

        container.getElementsByClassName("savings-message")[0].innerHTML = savingsBetweenValues;
        container.getElementsByClassName("savings-message")[0].style.display = 'block';

    } else {
        container.getElementsByClassName("estimated-savings-amount")[0].innerHTML = "$--";
        container.getElementsByClassName("savings-message")[0].style.display = 'none';
    }
}


function loadSliderColors(container, slider) {
    var val = ($(slider).val() - $(slider).attr('min')) / ($(slider).attr('max') - $(slider).attr('min')) * 100;
    var theGradient = 'linear-gradient(to right,  #0077da 0%,#0077da ' + val + '%,#e2e2e2 ' + val + '%,#e2e2e2 ' + val + '%,#e2e2e2 100%)';

    $(container).find('input[type="range"]')
        .css('background', theGradient);
};

function setTheSliderBackground(container) {
    var val = ($(container).find('input[type="range"]').val() - $('input[type="range"]').attr('min')) / ($('input[type="range"]').attr('max') - $('input[type="range"]').attr('min')) * 100;
    var theGradient = 'linear-gradient(to right,  #0077da 0%,#0077da ' + val + '%,#e2e2e2 ' + val + '%,#e2e2e2 ' + val + '%,#e2e2e2 100%)';

    $(container).find('input[type="range"]')
        .css('background', theGradient);
    $('input[type="range"]').css('background-clip', 'content-box');
}
