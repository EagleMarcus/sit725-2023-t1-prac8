// const cardList = [
//     {
//         title: "Kitten 2",
//         image: "images/kitten-2.jpg",
//         link: "About Kitten 2",
//         description: "Hi from Kitten 2, cuteness is of same level as Kitten 1"
//     },
//     {
//         title: "Kitten 3",
//         image: "images/kitten-3.jpg",
//         link: "About Kitten 3",
//         description: "Hello from Kitten 3, I am in Good Company with 1 and 2"
//     }
// ];

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

function clickMe() {
   
}

// function submitForm() {
//     let formData = {};
//     formData.first_name = $('#first_name').val();
//     formData.last_name = $('#last_name').val();
//     console.log(formData);
// }

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
        url: 'api/cat',
        data: cat,
        type: 'POST',
        success: (result) => {
            console.log(result.data);
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