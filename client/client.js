function upload() {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://127.0.0.1:8080/upload', true);

    xhr.setRequestHeader('X-Filename', fileInput.files[0].name);

    xhr.upload.onprogress = function (event) {
        let percentage = (event.loaded / event.total) * 100;
        percentage = Math.floor(percentage);
        uploadProgressDisplay.innerText = 'uploaded ' + percentage + '%' + ' of file...';

    }

    xhr.send(fileInput.files[0]);
}


const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const uploadProgressDisplay = document.getElementById('upload-progress');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    upload();
});