const ajaxMarker = 'ajax';
const fetchMarker = 'fetch';
const url = 'https://api.jsonbin.io/b/60c16d359fc30168f1cb4add/2'

const ajaxButton = document.getElementsByClassName('ajax_button')[0];
const fetchButton = document.getElementById('fetch');
let httpRequest;


function makeRequest(){
    console.log('in ajax request');
    performance.measure(ajaxMarker);
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);
    httpRequest.send();

}
function alertContents(){
    if (httpRequest.readyState === XMLHttpRequest.DONE){
        if(httpRequest.status === 200 ){
            parseResults(JSON.parse(httpRequest.responseText), 'ajax_list');
        }else{
            console.log('error');
        }
    }
    //performance.measure(ajaxMarker);
    console.log(performance.getEntriesByType("measure"));
}

function parseResults(results, location) {
    let dataDiv = document.getElementsByClassName(location)[0];
    console.log(dataDiv);
    dataDiv.classList.remove('hide');
    const list = document.getElementById(location);
    list.classList.add('fade-in-text')
    results.My_Degrees.forEach((degree) => {
        let listItem = document.createElement('li');
        listItem.innerText = `School: ${degree.degree.school},
                        Program: ${degree.degree.program}
                        Degree Type: ${degree.degree.type}
                        Year: ${degree.degree.Year_Conferred}`
        list.appendChild(listItem);
    })
}

function fetchData(){
    performance.measure(fetchMarker);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            parseResults(data, 'fetch_list');
        })
.catch((error) =>{
        console.log(error);
    });
    console.log(performance.getEntriesByType('measure'));
}
ajaxButton.addEventListener('click', makeRequest);
fetchButton.addEventListener('click', fetchData);
