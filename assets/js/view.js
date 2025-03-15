const createModal = document.getElementById('createModal');
const createForm = document.getElementById('createForm');
const createBtn = document.getElementById('createBtn');
const cancelCreateBtn = document.getElementById('cancelCreate');

// Show modal when clicking Create Product button
createBtn.addEventListener('click', () => {
    createModal.classList.remove('hidden');
    createModal.classList.add('flex');
});

// Hide modal when clicking Cancel
cancelCreateBtn.addEventListener('click', () => {
    createModal.classList.add('hidden');
    createModal.classList.remove('flex');
});

// Handle form submission
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Success!',
        text: 'Car has been created successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#1B4E6B'
    }).then(() => {
        // Close modal and reset form
        createModal.classList.add('hidden');
        createModal.classList.remove('flex');
        createForm.reset();
    });
});

// Close modal when clicking outside
createModal.addEventListener('click', (e) => {
    if (e.target === createModal) {
        createModal.classList.add('hidden');
        createModal.classList.remove('flex');
    }
})