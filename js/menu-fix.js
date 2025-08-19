// 햄버거 메뉴 수정 스크립트
(function() {
    'use strict';
    
    // DOM 로드 완료 후 실행
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🍔 메뉴 수정 스크립트 시작...');
        
        // 필요한 요소들 가져오기
        const menuToggle = document.getElementById('menuToggle');
        const sideMenu = document.getElementById('sideMenu');
        let overlay = document.querySelector('.overlay');
        
        // 오버레이가 없으면 생성
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
            console.log('✅ 오버레이 생성됨');
        }
        
        // 메뉴 토글 함수
        function toggleMenu() {
            const isActive = sideMenu.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        // 메뉴 열기
        function openMenu() {
            console.log('📂 메뉴 열기');
            sideMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // 메뉴 닫기
        function closeMenu() {
            console.log('📁 메뉴 닫기');
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // 햄버거 버튼 클릭 이벤트
        if (menuToggle) {
            // 기존 이벤트 리스너 제거
            menuToggle.replaceWith(menuToggle.cloneNode(true));
            const newMenuToggle = document.getElementById('menuToggle');
            
            newMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🍔 햄버거 메뉴 클릭!');
                toggleMenu();
            });
            
            console.log('✅ 햄버거 메뉴 이벤트 등록 완료');
        } else {
            console.error('❌ 햄버거 메뉴 버튼을 찾을 수 없음');
        }
        
        // 오버레이 클릭 시 메뉴 닫기
        overlay.addEventListener('click', function() {
            console.log('🎭 오버레이 클릭');
            closeMenu();
        });
        
        // 메뉴 아이템 클릭 시 페이지 이동 및 메뉴 닫기
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                console.log('📄 메뉴 아이템 클릭:', page);
                
                if (page) {
                    // 페이지 이동
                    if (window.app && window.app.navigateTo) {
                        window.app.navigateTo(page);
                    } else if (window.app && window.app.loadPage) {
                        window.app.loadPage(page);
                    }
                    
                    // 메뉴 닫기
                    closeMenu();
                }
            });
        });
        
        // ESC 키로 메뉴 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // 하단 네비게이션 이벤트
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                console.log('📱 하단 네비 클릭:', page);
                
                if (page) {
                    // 활성 상태 업데이트
                    document.querySelectorAll('.bottom-nav-item').forEach(nav => {
                        nav.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // 페이지 이동
                    if (window.app && window.app.navigateTo) {
                        window.app.navigateTo(page);
                    } else if (window.app && window.app.loadPage) {
                        window.app.loadPage(page);
                    }
                }
            });
        });
        
        console.log('✅ 메뉴 수정 스크립트 완료');
        
        // 디버깅용: 현재 상태 출력
        console.log('메뉴 토글 버튼:', menuToggle);
        console.log('사이드 메뉴:', sideMenu);
        console.log('오버레이:', overlay);
    });
})();