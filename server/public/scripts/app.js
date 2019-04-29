$(document).ready(onReady);

let equationType = '';

function onReady() {
    $('#js-btn-equal').on('click', clickEqual);
    $('#js-btn-add').on('click', clickAdd);
    $('#js-btn-sub').on('click', clickSub);
    $('#js-btn-mul').on('click', clickMul);
    $('#js-btn-div').on('click', clickDiv);
    $('#js-btn-C').on('click', clearInputs);
    $('#js-btn-clear').on('click', clearHistory);

    getInfo();
}

function clickAdd() {
    equationType = 'add';
}

function clickSub() {
    equationType = 'sub';
}

function clickMul() {
    equationType = 'mul';
}

function clickDiv() {
    equationType = 'div';
}

function clearInputs() {
    $('#value1').val('');
    $('#value2').val('');
}

function clearHistory() {
    clearInputs();

    $.ajax({
        type: 'GET',
        url: '/clear'
    }).then(function (response){
        render(response);
    });
}

function clickEqual() {
    const value1 = $('#value1').val();
    const value2 = $('#value2').val();

    let mathObject = {
        value1,
        value2,
        equationType
    }

    console.log(mathObject);
    postInfo(mathObject);
}

function postInfo(postObject) {
    $.ajax({
        type: 'POST',
        url: '/math',
        data: postObject
    }).then(function(response){
        getInfo();
    });
}

function getInfo() {
    $.ajax({
        type: 'GET',
        url: '/math'
    }).then(function(response){
        render(response);
    });
}

function render(mathArray) {
    $("#container").empty();
    for (let mathEntry of mathArray){
        let symbol = '';

        if (mathEntry.equationType == 'add') {
            symbol = '+';
        } else if ((mathEntry.equationType == 'sub')) {
            symbol = '-';
        } else if ((mathEntry.equationType == 'mul')) {
            symbol = '*';
        } else if ((mathEntry.equationType == 'div')) {
            symbol = '/';
        }

        $("#container").append(`
            <div>
                <p>${mathEntry.value1} ${symbol} ${mathEntry.value2} = ${mathEntry.answer}</p>
            <div>
        `);
    }
}