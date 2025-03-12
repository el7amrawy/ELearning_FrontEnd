const createCarModal = document.getElementById('createCarModal');
const createCarForm = document.getElementById('createCarForm');
const createProductBtn = document.getElementById('createProductBtn');
const cancelCreateCarBtn = document.getElementById('cancelCreateCar');

// Show modal when clicking Create Product button
createProductBtn.addEventListener('click', () => {
    createCarModal.classList.remove('hidden');
    createCarModal.classList.add('flex');
});

// Hide modal when clicking Cancel
cancelCreateCarBtn.addEventListener('click', () => {
    createCarModal.classList.add('hidden');
    createCarModal.classList.remove('flex');
});

// Handle form submission
createCarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    Swal.fire({
        title: 'Success!',
        text: 'Car has been created successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#1B4E6B'
    }).then(() => {
        // Close modal and reset form
        createCarModal.classList.add('hidden');
        createCarModal.classList.remove('flex');
        createCarForm.reset();
    });
});

// Close modal when clicking outside
createCarModal.addEventListener('click', (e) => {
    if (e.target === createCarModal) {
        createCarModal.classList.add('hidden');
        createCarModal.classList.remove('flex');
    }
});





//upload photo
        const uploadBtn = document.getElementById('upload-btn');
        const fileInput = document.getElementById('file-input');
        const filePathInput = document.getElementById('file-path');
        const imagePreview = document.getElementById('image-preview');
        const defaultPreview = document.getElementById('default-preview');
        const saveBtn = document.getElementById('save-btn');

        uploadBtn.addEventListener('click', function () {
            fileInput.click();
        });

        function updateFileName(input) {
            if (input.files && input.files[0]) {
                const fileName = input.files[0].name;
                filePathInput.value = "C:" + fileName;

                // عرض الصورة المختارة
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    imagePreview.classList.remove('hidden');
                    defaultPreview.classList.add('hidden');
                };
                reader.readAsDataURL(input.files[0]);
            }
        }



