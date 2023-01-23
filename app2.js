const dropArea = document.querySelector('.drop-area');
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
let files;

button.addEventListener('click', () => {
    input.click();
});

input.addEventListener('change', () => {
    files = input.files;
    dropArea.classList.add('active');
    showFiles(files);
    dropArea.classList.remove('active');
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
    dragText.textContent = 'Suelta para subir los archivos';
});

dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    dragText.textContent = 'Arrastra y suelta los archivos aquí';
});

dropArea.addEventListener('drop', (e) => {
     e.preventDefault();
     files = e.dataTransfer.files;
        showFiles(files);
     dropArea.classList.remove('active');
     dragText.textContent = 'Arrastra y suelta los archivos aquí';
});

function showFiles(files) {
    if(files.length > 0) {
        for(const file of files) {
            processFile(file);
        }
    }else{
        processFile(files);
    }
}

function processFile(file) {
     const docType = file.type;
     const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if(validExtensions.includes(docType)) {
          const fileReader = new FileReader();
          const id = `file-${Math.random().toString(32).substring(7)}`;

        
          fileReader.addEventListener('load', (e) => { 
            const fileUrl = fileReader.result;
            const image = `
                <div id="${id}" class="file-container">
                    <img src="${fileUrl}" alt="${file.name}" width=100>
                    <div class="status">
                        <span>${file.name}</span>
                        <span class="status-text">
                            Loading ...
                        </span>                
                    </div>
                </div>
            `;
        const html = document.querySelector('#preview').innerHTML;
        document.querySelector('#preview').innerHTML = html + image;    
        });
        fileReader.readAsDataURL(file); 
        uploadFile(file, id);

        }else{
            alert('El archivo no es válido');
        }
     
}

function uploadFile(file) {}