let messageMap = {
    0:"Have you had a glass of Water?",
    1:"Have you meditated Today?",
    2:"Did you go out in Park today?",
    3:"Have you Looked Away from Monitor today?"
}

let socket = io();
socket.on('number', (message) => {
    console.log('random number: ' + message);
    alert(messageMap[message]);
});

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
        '<div class="card medium red-card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.link+'">'+
        '</div><div class="card-content">'+
        '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#" class="black-text">'+item.description+'</a></p></div>'+
        '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text black-text">'+item.description+'</p>'+
        '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
}

function submitForm() {
    let formData = {};
    formData.title = $('#title').val();
    formData.path = $('#path').val();
    formData.link = $('#link').val();
    formData.description = $('#description').val();

    console.log("Form Data Submitted: ", formData);
    postCat(formData);
}

function getCats() {
    console.log("Test for Debugging");
    $.get('api/cats', (response) => {
        console.log(response.data);
        if (response.data) {
            addCards(response.data);
        } else {
            console.log("Error getting cat data. Handle the error here.");
        }
    });
}

function postCat(cat) {
    $.ajax({
        url: '/api/cats',
        data: cat,
        type: 'POST',
        success: (result) => {
            console.log(result.data);
            console.log('Data submitted successfully:', cat); // Log the submitted data
            console.log('Server response:', result.data);
            location.reload();
        },
        error: (xhr, status, error) => {
            console.error('Error submitting data:', error); // Log any errors
            // Handle the error (e.g., show an error message to the user)
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    getCats();
    $('.modal').modal();
    //$('#clickMeButton').click(()=>{});
    $('#formSubmit').click(()=>{
        submitForm();
    });
    
});