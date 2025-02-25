document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.classList.add('loaded');
    });

    // Activity filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activityCards = document.querySelectorAll('.activity-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.dataset.filter;

            activityCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Yearbook photo filtering
    const yearBookFilters = document.querySelectorAll('.yearbook-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (yearBookFilters && galleryItems) {
        yearBookFilters.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                yearBookFilters.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.dataset.filter;

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // Member filtering
    const memberFilters = document.querySelectorAll('.member-filters .filter-btn');
    const memberCards = document.querySelectorAll('.member-card');

    if (memberFilters && memberCards) {
        memberFilters.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                memberFilters.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.dataset.filter;

                memberCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Ảnh %1 / %2',
        'fadeDuration': 300
    });

    // Form Validation
    function validateForm(event) {
        event.preventDefault();
        const form = document.getElementById('inquiry-form');
        const submitBtn = form.querySelector('.submit-btn');
        
        // Custom validation rules
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Name validation
        if (!name.value.match(/^[A-Za-zÀ-ỹ\s]{2,}$/)) {
            showError(name, 'Vui lòng nhập họ tên hợp lệ');
            isValid = false;
        }
        
        // Phone validation
        if (!phone.value.match(/^(0[0-9]{9})$/)) {
            showError(phone, 'Vui lòng nhập số điện thoại hợp lệ');
            isValid = false;
        }
        
        // Email validation
        if (!email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            showError(email, 'Vui lòng nhập email hợp lệ');
            isValid = false;
        }
        
        // Message validation
        if (message.value.length < 10) {
            showError(message, 'Nội dung phải có ít nhất 10 ký tự');
            isValid = false;
        }
        
        if (isValid) {
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                alert('Gửi thắc mắc thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.');
                form.reset();
                updateCharCount();
            }, 1500);
        }
        
        return false;
    }

    function showError(input, message) {
        input.setCustomValidity(message);
        input.reportValidity();
        setTimeout(() => input.setCustomValidity(''), 3000);
    }

    // Real-time character counter
    function updateCharCount() {
        const message = document.getElementById('message');
        const counter = document.querySelector('.char-count');
        const maxLength = 500;
        const currentLength = message?.value.length || 0;
        
        if (counter) {
            counter.textContent = `${currentLength}/${maxLength} ký tự`;
            counter.style.color = currentLength > maxLength ? '#dc3545' : '#6c757d';
        }
    }

    // Initialize form handlers
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', updateCharCount);
        updateCharCount(); // Initialize counter
    }
    
    // Add input validation feedback
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.add('valid');
                this.classList.remove('invalid');
            } else {
                this.classList.add('invalid');
                this.classList.remove('valid');
            }
        });
    });
    
    // Character counter for message
    document.getElementById('message')?.addEventListener('input', function() {
        const charCount = this.value.length;
        const maxLength = 500;
        const counter = this.parentElement.querySelector('.char-count');
        if (counter) {
            counter.textContent = `${charCount}/${maxLength} ký tự`;
            counter.style.color = charCount > maxLength ? '#dc3545' : '#6c757d';
        }
    });

    // Initialize form validation
    const form = document.getElementById('inquiry-form');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
        
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            if (!this.value) {
                this.setCustomValidity('Vui lòng điền thông tin này');
            }
        });
    });

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const button = form.querySelector('.submit-button');
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }
        
        // Show loading state
        button.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            button.classList.remove('loading');
            alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại sớm nhất có thể.');
            form.reset();
            updateCharCount();
        }, 1500);
        
        return false;
    }

    // Character counter for message
    const messageArea = document.querySelector('#message');
    if (messageArea) {
        messageArea.addEventListener('input', function() {
            const counter = this.parentElement.querySelector('.char-counter');
            const count = this.value.length;
            const max = 500;
            counter.textContent = `${count}/${max}`;
            counter.style.color = count > max ? '#dc3545' : '#7f8c8d';
        });
    }

    // Add floating label behavior
    document.querySelectorAll('.form-floating input, .form-floating select, .form-floating textarea').forEach(element => {
        // Add placeholder to make the floating label work
        element.setAttribute('placeholder', ' ');
        
        // Handle validation styling
        element.addEventListener('invalid', () => {
            element.classList.add('is-invalid');
        });
        
        element.addEventListener('input', () => {
            if (element.checkValidity()) {
                element.classList.remove('is-invalid');
                element.classList.add('is-valid');
            }
        });
    });

    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('button');
        
        // Show loading state
        button.classList.add('loading');
        button.querySelector('i').classList.remove('fa-paper-plane');
        button.querySelector('i').classList.add('fa-spinner');
        
        // Simulate form submission
        setTimeout(() => {
            // Show success state
            button.classList.remove('loading');
            button.classList.add('success');
            button.querySelector('i').classList.remove('fa-spinner');
            button.querySelector('i').classList.add('fa-check');
            button.querySelector('span').textContent = 'Đã Gửi!';
            
            // Reset form
            setTimeout(() => {
                this.reset();
                button.classList.remove('success');
                button.querySelector('i').classList.remove('fa-check');
                button.querySelector('i').classList.add('fa-paper-plane');
                button.querySelector('span').textContent = 'Gửi Tin Nhắn';
            }, 2000);
        }, 1500);
    });

    // Smooth scroll function
    const newsButton = document.querySelector('a[href="#news"]');
    if (newsButton) {
        newsButton.addEventListener('click', function(e) {
            e.preventDefault();
            const newsSection = document.getElementById('news');
            newsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

// Add page transition element
document.body.insertAdjacentHTML('afterbegin', '<div class="page-transition"></div>');

// Handle page transitions
document.addEventListener('DOMContentLoaded', () => {
    const transitionElement = document.querySelector('.page-transition');
    document.body.classList.add('loaded');

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const target = this.href;

                transitionElement.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            }
        });
    });
});

// Handle page load
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        document.querySelector('.page-transition').classList.remove('active');
    }
});
