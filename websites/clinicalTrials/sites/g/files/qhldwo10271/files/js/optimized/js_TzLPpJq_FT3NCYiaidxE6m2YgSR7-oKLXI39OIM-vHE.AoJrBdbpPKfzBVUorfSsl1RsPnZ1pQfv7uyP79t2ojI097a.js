jQuery(document).ready(function () {
    jQuery('option[value="contains"]').text('By Phrase');
    jQuery('option[value="allwords"]').text('All Words');
    jQuery('option[value="word"]').text('Near Words');
    jQuery('option[value="regular_expression"]').text('Either Word');
});