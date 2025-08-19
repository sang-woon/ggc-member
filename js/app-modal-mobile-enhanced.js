// Modal Mobile UI/UX Enhancement
(function() {
    'use strict';
    
    // Override the showModal function with mobile-optimized version
    const originalShowModal = window.app.showModal;
    
    window.app.showModal = function(modalId, options = {}) {
        console.log('🔵 Enhanced Mobile Modal:', modalId, options);
        
        // Close any existing modal
        this.closeModal();
        
        // Create modal container
        const modal = document.createElement('div');
        modal.id = 'dynamic-modal';
        modal.className = 'mobile-modal-container';
        
        // Determine modal size
        const size = options.size || 'default';
        const sizeClasses = {
            'sm': 'mobile-modal-sm',
            'default': 'mobile-modal-default',
            'lg': 'mobile-modal-lg',
            'xl': 'mobile-modal-xl',
            'full': 'mobile-modal-full'
        };
        
        // Create modal content wrapper
        const modalWrapper = document.createElement('div');
        modalWrapper.className = `mobile-modal-wrapper ${sizeClasses[size]}`;
        
        // Build modal HTML
        let html = '';
        
        // Modal header
        if (options.title) {
            html += `
                <div class="mobile-modal-header">
                    <h3 class="mobile-modal-title">${options.title}</h3>
                    <button class="mobile-modal-close" onclick="app.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }
        
        // Modal body
        html += `
            <div class="mobile-modal-body ${options.scrollable !== false ? 'scrollable' : ''}">
                ${options.content || ''}
            </div>
        `;
        
        // Modal footer with buttons
        if (options.confirmText || options.cancelText || options.buttons) {
            html += '<div class="mobile-modal-footer">';
            
            if (options.buttons) {
                // Custom buttons
                options.buttons.forEach((button, index) => {
                    const btnClass = button.class || (index === 0 ? 'mobile-btn-secondary' : 'mobile-btn-primary');
                    const icon = button.icon ? `<i class="${button.icon}"></i>` : '';
                    html += `
                        <button onclick="${button.onclick}" class="mobile-modal-btn ${btnClass}">
                            ${icon}
                            <span>${button.text}</span>
                        </button>
                    `;
                });
            } else {
                // Standard confirm/cancel buttons
                if (options.cancelText) {
                    html += `
                        <button onclick="app.closeModal()" class="mobile-modal-btn mobile-btn-secondary">
                            <i class="fas fa-times"></i>
                            <span>${options.cancelText}</span>
                        </button>
                    `;
                }
                if (options.confirmText) {
                    const confirmAction = options.onConfirm ? options.onConfirm : 'app.closeModal()';
                    html += `
                        <button onclick="${confirmAction}" class="mobile-modal-btn mobile-btn-primary">
                            <i class="fas fa-check"></i>
                            <span>${options.confirmText}</span>
                        </button>
                    `;
                }
            }
            
            html += '</div>';
        }
        
        modalWrapper.innerHTML = html;
        modal.appendChild(modalWrapper);
        
        // Add to DOM
        document.body.appendChild(modal);
        
        // Add animation class after a brief delay
        setTimeout(() => {
            modal.classList.add('mobile-modal-active');
        }, 10);
        
        // Event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Handle swipe down to close on mobile
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        
        modalWrapper.addEventListener('touchstart', (e) => {
            if (e.target.closest('.mobile-modal-header')) {
                startY = e.touches[0].clientY;
                isDragging = true;
            }
        });
        
        modalWrapper.addEventListener('touchmove', (e) => {
            if (isDragging) {
                currentY = e.touches[0].clientY;
                const diff = currentY - startY;
                if (diff > 0) {
                    modalWrapper.style.transform = `translateY(${diff}px)`;
                }
            }
        });
        
        modalWrapper.addEventListener('touchend', (e) => {
            if (isDragging) {
                const diff = currentY - startY;
                if (diff > 100) {
                    this.closeModal();
                } else {
                    modalWrapper.style.transform = '';
                }
                isDragging = false;
            }
        });
    };
    
    // Enhanced close modal function
    const originalCloseModal = window.app.closeModal;
    
    window.app.closeModal = function() {
        const modal = document.getElementById('dynamic-modal');
        if (modal) {
            modal.classList.remove('mobile-modal-active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    };
    
    // Inject enhanced modal styles
    const styles = `
        /* Mobile Modal Container */
        .mobile-modal-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0);
            display: flex;
            align-items: flex-end;
            justify-content: center;
            z-index: 9999;
            transition: background 0.3s ease;
        }
        
        .mobile-modal-container.mobile-modal-active {
            background: rgba(0, 0, 0, 0.5);
        }
        
        /* Modal Wrapper */
        .mobile-modal-wrapper {
            background: white;
            border-radius: 16px 16px 0 0;
            width: 100%;
            max-width: 100%;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            transform: translateY(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
            box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.15);
        }
        
        .mobile-modal-active .mobile-modal-wrapper {
            transform: translateY(0);
        }
        
        /* Modal sizes */
        .mobile-modal-sm {
            max-height: 40vh;
        }
        
        .mobile-modal-default {
            max-height: 70vh;
        }
        
        .mobile-modal-lg {
            max-height: 85vh;
        }
        
        .mobile-modal-xl {
            max-height: 90vh;
        }
        
        .mobile-modal-full {
            max-height: 100vh;
            border-radius: 0;
        }
        
        /* Modal Header */
        .mobile-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
            position: relative;
            flex-shrink: 0;
        }
        
        .mobile-modal-header::before {
            content: '';
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background: #d1d5db;
            border-radius: 2px;
        }
        
        .mobile-modal-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin: 0;
            flex: 1;
        }
        
        .mobile-modal-close {
            width: 44px;
            height: 44px;
            border: none;
            background: #f3f4f6;
            border-radius: 50%;
            color: #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.2s;
            margin-left: 12px;
        }
        
        .mobile-modal-close:active {
            background: #e5e7eb;
            transform: scale(0.95);
        }
        
        /* Modal Body */
        .mobile-modal-body {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        
        .mobile-modal-body.scrollable {
            padding-bottom: 30px;
        }
        
        /* Modal Footer */
        .mobile-modal-footer {
            padding: 16px 20px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 12px;
            flex-shrink: 0;
            background: white;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
        }
        
        /* Mobile Modal Buttons */
        .mobile-modal-btn {
            flex: 1;
            min-height: 50px;
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
        }
        
        .mobile-modal-btn i {
            font-size: 16px;
        }
        
        /* Primary Button */
        .mobile-btn-primary {
            background: linear-gradient(135deg, #003d7a 0%, #0056b3 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(0, 61, 122, 0.2);
        }
        
        .mobile-btn-primary:active {
            transform: scale(0.98);
            box-shadow: 0 1px 4px rgba(0, 61, 122, 0.2);
        }
        
        /* Secondary Button */
        .mobile-btn-secondary {
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #e5e7eb;
        }
        
        .mobile-btn-secondary:active {
            background: #e5e7eb;
            transform: scale(0.98);
        }
        
        /* Success Button */
        .mobile-btn-success {
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(5, 150, 105, 0.2);
        }
        
        .mobile-btn-success:active {
            transform: scale(0.98);
            box-shadow: 0 1px 4px rgba(5, 150, 105, 0.2);
        }
        
        /* Danger Button */
        .mobile-btn-danger {
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
        }
        
        .mobile-btn-danger:active {
            transform: scale(0.98);
            box-shadow: 0 1px 4px rgba(220, 38, 38, 0.2);
        }
        
        /* Warning Button */
        .mobile-btn-warning {
            background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(217, 119, 6, 0.2);
        }
        
        .mobile-btn-warning:active {
            transform: scale(0.98);
            box-shadow: 0 1px 4px rgba(217, 119, 6, 0.2);
        }
        
        /* Info Button */
        .mobile-btn-info {
            background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(8, 145, 178, 0.2);
        }
        
        .mobile-btn-info:active {
            transform: scale(0.98);
            box-shadow: 0 1px 4px rgba(8, 145, 178, 0.2);
        }
        
        /* Ghost Button */
        .mobile-btn-ghost {
            background: transparent;
            color: #003d7a;
            border: 2px solid #003d7a;
        }
        
        .mobile-btn-ghost:active {
            background: rgba(0, 61, 122, 0.05);
            transform: scale(0.98);
        }
        
        /* Full width button for single actions */
        .mobile-modal-footer .mobile-modal-btn:only-child {
            flex: 1;
        }
        
        /* Tablet and Desktop Adjustments */
        @media (min-width: 768px) {
            .mobile-modal-container {
                align-items: center;
                padding: 20px;
            }
            
            .mobile-modal-wrapper {
                max-width: 500px;
                border-radius: 16px;
                transform: scale(0.9) translateY(20px);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
            }
            
            .mobile-modal-active .mobile-modal-wrapper {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
            
            .mobile-modal-header::before {
                display: none;
            }
            
            .mobile-modal-full {
                border-radius: 16px;
            }
        }
        
        /* Improve existing button styles globally */
        .btn-primary, .btn-secondary, .btn-success, .btn-warning, .btn-danger {
            min-height: 44px !important;
            padding: 12px 20px !important;
            font-size: 15px !important;
            border-radius: 10px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Fix button hover states on mobile */
        @media (hover: none) {
            .btn-primary:hover, .btn-secondary:hover {
                transform: none !important;
            }
        }
        
        /* Ensure modal content looks good */
        .mobile-modal-body h3,
        .mobile-modal-body h4 {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 12px 0;
        }
        
        .mobile-modal-body p {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.5;
            margin: 0 0 12px 0;
        }
        
        .mobile-modal-body input,
        .mobile-modal-body select,
        .mobile-modal-body textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 16px; /* Prevents zoom on iOS */
            margin-bottom: 12px;
        }
        
        /* List items in modals */
        .mobile-modal-body ul,
        .mobile-modal-body ol {
            padding-left: 20px;
            margin: 0 0 12px 0;
        }
        
        .mobile-modal-body li {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 6px;
        }
        
        /* Alert/Info boxes in modals */
        .mobile-modal-body .alert,
        .mobile-modal-body .info-box {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 16px;
        }
        
        .mobile-modal-body .alert-success {
            background: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }
        
        .mobile-modal-body .alert-error {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        
        .mobile-modal-body .alert-warning {
            background: #fef3c7;
            color: #92400e;
            border: 1px solid #fde68a;
        }
        
        .mobile-modal-body .alert-info {
            background: #dbeafe;
            color: #1e40af;
            border: 1px solid #bfdbfe;
        }
    `;
    
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    console.log('✅ Modal Mobile UI/UX Enhancement loaded');
})();