
//var clientListData = [];
var sortField = 0;

$(document).ready(function () {

    getClients();

    // ---------- обработчик отправки формы
    $('.contentHeader form').on('submit', function() {
        addClient();
        //$(".clientItem").remove();
        setTimeout(function(){
            getClients();
        }, 100);

    });

    // ---------- обработчик сортировки по полю

    $(".contentContainerSmall tr.success td").on("click", function(){

        sortField = $(this).index() + 1;
        //$(".clientItem").remove();
        getClients();
    });


    $('.contentContainerSmall').on('click', 'tr.clientItem', showClientInfo);


});

                                                                                // ---------- getClients() - функция читает файл с данными и отображает данные в таблице


function getClients() {

    $(".clientItem").remove();

    var tableContent = '';

    $.getJSON('/data/clientsList.json', function( data ) {

        switch (sortField) {
            case 1: data.sort(compare.compareFirstName);break;
            case 2: data.sort(compare.compareLastName); break;
            case 3: data.sort(compare.comparePhone); break;
            case 4: data.sort(compare.compareGender); break;
            case 5: data.sort(compare.compareAge); break;
        }

        $(".contentContainerSmall tr.success td").css({"color":"#353535", "font-weight":"normal"});
        $(".contentContainerSmall tr.success td:nth-child("+ sortField +")").css({"color":"#000", "font-weight":"bold"});

        data.forEach(function(item, index){

            tableContent += '<tr class="clientItem">';
            tableContent += '<td>' + item.firstName + '</td>';
            tableContent += '<td>' + item.lastName + '</td>';
            tableContent += '<td>' + item.phone + '</td>';
            tableContent += '<td>' + item.gender + '</td>';
            tableContent += '<td>' + item.age + '</td>';
            tableContent += '<td>' + index + '</td>';
            tableContent += '</tr>';

        });

        $('.contentContainerSmall table').append(tableContent);

    });
}

                                                                                // ---------- addClient() - функция добавления нового клиента чрезе форму

function addClient() {
    //event.preventDefault();

    var errorCount = 0;
    $('.contentHeader input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {

        var newClient = {
            firstName: $('.contentHeader input#inputFirstName').val(),
            lastName: $('.contentHeader input#inputLastName').val(),
            phone: $('.contentHeader input#inputPhone').val(),
            gender: $('.contentHeader input#inputGender').val(),
            age: $('.contentHeader input#inputAge').val()
        }

        $.post("/clients/saveClient", newClient, function (result) {});

        $('.contentHeader form input').val('');

    }
    else {
        alert('Please fill in all fields');
        return false;
    }

}

                                                                                // ---------- showClientInfo() - функция открывает запись на редактирование или удаление

function showClientInfo() {

var numTable = ( parseInt($(this).index()) + 1);

var clientInfo = '';
clientInfo += '<div class="clientInfoContainer">';
clientInfo += '<a></a>';
clientInfo += '<form class="clientInfoMediumContainer">';
clientInfo += '<input class="input-xlarge" type="text" value="'+ $(this).find("td:nth-child(1)").text() +'"></input>';
clientInfo += '<input class="input-xlarge" type="text" value="'+ $(this).find("td:nth-child(2)").text() +'"></input>';
clientInfo += '<input class="input-xlarge" type="text" value="'+ $(this).find("td:nth-child(3)").text() +'"></input>';
clientInfo += '<input class="input-xlarge" type="text" value="'+ $(this).find("td:nth-child(4)").text() +'"></input>';
clientInfo += '<input class="input-xlarge" type="text" value="'+ $(this).find("td:nth-child(5)").text() +'"></input>';
clientInfo += '<input class="input-xlarge" type="text" value="'+ $(this).find("td:nth-child(6)").text() +'"></input>';
clientInfo += '<div class="btn buttonCancel">Cancel</div>';
clientInfo += '<div class="btn buttonApply">Apply</div>';
clientInfo += '<div class="btn buttonDelete">Delete</div>';
clientInfo += '</form>';

clientInfo += '</div>';

$('.contentHeader ').append(clientInfo);

// -------- buttonCancel

$('.buttonCancel').on('click', function() {
$('.clientInfoContainer').remove();
});

// -------- buttonApply

$('.buttonApply').on('click', function() {

var clientInfoObj = {
firstName: $(".clientInfoMediumContainer input:nth-child(1)").val(),
lastName: $(".clientInfoMediumContainer input:nth-child(2)").val(),
phone: $(".clientInfoMediumContainer input:nth-child(3)").val(),
gender: $(".clientInfoMediumContainer input:nth-child(4)").val(),
age: $(".clientInfoMediumContainer input:nth-child(5)").val(),
num: $(".clientInfoMediumContainer input:nth-child(6)").val()
}

$('.clientItem:nth-child('+ (numTable) +') td:nth-child(1)').text(clientInfoObj.firstName);
$('.clientItem:nth-child('+ (numTable) +') td:nth-child(2)').text(clientInfoObj.lastName);
$('.clientItem:nth-child('+ (numTable) +') td:nth-child(3)').text(clientInfoObj.phone);
$('.clientItem:nth-child('+ (numTable) +') td:nth-child(4)').text(clientInfoObj.gender);
$('.clientItem:nth-child('+ (numTable) +') td:nth-child(5)').text(clientInfoObj.age);
$('.clientItem:nth-child('+ (numTable) +') td:nth-child(6)').text(clientInfoObj.num);

$.post("/clients/applyClient", clientInfoObj, function (result) {});

});

// -------- buttonDelete

$('.buttonDelete').on('click', function() {
var clientDel = {
num: $(".clientInfoMediumContainer input:nth-child(6)").val()
}

$.post("/clients/delClient", clientDel, function (result) {});

$('.clientInfoContainer').remove();
$('.clientItem:nth-child('+ (numTable) +')').remove();

});

}
