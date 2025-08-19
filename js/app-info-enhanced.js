// 개선된 내정보 페이지
window.app = window.app || {};

window.app.loadInfoPage = function() {
    const mainContent = document.getElementById('mainContent');
    const memberData = this.memberData || {};
    
    // 편집 모드 상태
    let isEditMode = false;
    
    // 임시 데이터 저장
    let tempData = JSON.parse(JSON.stringify(memberData));
    
    // 추가 상세 정보
    const detailedInfo = {
        birth: '1975.08.15',
        phone: '031-8008-7001',
        mobile: '010-1234-5678',
        email: 'kimys@gg.go.kr',
        office: '경기도의회 본관 501호',
        homepage: 'www.kimys-gg.kr',
        facebook: 'facebook.com/kimysgg',
        instagram: '@kimys_gg',
        blog: 'blog.naver.com/kimysgg',
        education: [
            '서울대학교 법학과 졸업 (1998)',
            '하버드대학교 케네디스쿨 석사 (2005)',
            '연세대학교 행정대학원 박사과정 수료 (2015)'
        ],
        career: [
            '前 법무부 검사 (2000-2010)',
            '前 서울시 정책특보 (2010-2015)',
            '前 경기도 행정부지사 자문관 (2015-2020)',
            '現 경기도의회 교육위원회 위원장 (2020-현재)',
            '現 예산결산특별위원회 위원 (2020-현재)'
        ],
        awards: [
            '2023 대한민국 의정대상',
            '2022 경기도 우수의원상',
            '2021 청년정책 공로상'
        ],
        interests: [
            '교육정책', '청년복지', '지역경제', '환경보호'
        ]
    };
    
    function renderInfoPage() {
        mainContent.innerHTML = `
            <div class="page-container">
                <!-- 헤더 영역 -->
                <div class="info-header">
                    <h2 class="page-title">내 정보</h2>
                    <button id="editToggleBtn" class="edit-toggle-btn">
                        <i class="fas ${isEditMode ? 'fa-times' : 'fa-edit'}"></i>
                        <span>${isEditMode ? '취소' : '수정'}</span>
                    </button>
                </div>
                
                <!-- 프로필 카드 -->
                <div class="profile-card-enhanced">
                    <div class="profile-main">
                        <div class="profile-photo-container">
                            <img src="${memberData.photo || 'images/annomimus.jpg'}" 
                                 alt="프로필 사진" class="profile-photo">
                            ${isEditMode ? '<button class="photo-edit-btn"><i class="fas fa-camera"></i></button>' : ''}
                        </div>
                        <div class="profile-basic">
                            <div class="info-row">
                                <label class="info-label">성명</label>
                                ${isEditMode ? 
                                    `<input type="text" class="info-input" id="name" value="${tempData.name}">` :
                                    `<span class="info-value">${memberData.name}</span>`
                                }
                            </div>
                            <div class="info-row">
                                <label class="info-label">의원번호</label>
                                <span class="info-value">${memberData.memberId}</span>
                            </div>
                            <div class="info-row">
                                <label class="info-label">소속정당</label>
                                ${isEditMode ? 
                                    `<input type="text" class="info-input" id="party" value="${tempData.party}">` :
                                    `<span class="info-value">${memberData.party}</span>`
                                }
                            </div>
                            <div class="info-row">
                                <label class="info-label">지역구</label>
                                ${isEditMode ? 
                                    `<input type="text" class="info-input" id="district" value="${tempData.district}">` :
                                    `<span class="info-value">${memberData.district}</span>`
                                }
                            </div>
                            <div class="info-row">
                                <label class="info-label">당선정보</label>
                                <span class="info-value">${memberData.term} (${memberData.generation})</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 상세 정보 탭 -->
                <div class="info-tabs">
                    <div class="tab-header">
                        <button class="tab-btn active" data-tab="contact">연락처</button>
                        <button class="tab-btn" data-tab="education">학력</button>
                        <button class="tab-btn" data-tab="career">경력</button>
                        <button class="tab-btn" data-tab="committee">위원회</button>
                        <button class="tab-btn" data-tab="sns">SNS</button>
                    </div>
                    
                    <div class="tab-content">
                        <!-- 연락처 탭 -->
                        <div class="tab-pane active" id="contact-tab">
                            <div class="info-section">
                                <div class="info-row">
                                    <label class="info-label"><i class="fas fa-birthday-cake"></i> 생년월일</label>
                                    ${isEditMode ? 
                                        `<input type="text" class="info-input" id="birth" value="${detailedInfo.birth}">` :
                                        `<span class="info-value">${detailedInfo.birth}</span>`
                                    }
                                </div>
                                <div class="info-row">
                                    <label class="info-label"><i class="fas fa-phone"></i> 사무실</label>
                                    ${isEditMode ? 
                                        `<input type="text" class="info-input" id="phone" value="${detailedInfo.phone}">` :
                                        `<span class="info-value">${detailedInfo.phone}</span>`
                                    }
                                </div>
                                <div class="info-row">
                                    <label class="info-label"><i class="fas fa-mobile-alt"></i> 휴대폰</label>
                                    ${isEditMode ? 
                                        `<input type="text" class="info-input" id="mobile" value="${detailedInfo.mobile}">` :
                                        `<span class="info-value">${detailedInfo.mobile}</span>`
                                    }
                                </div>
                                <div class="info-row">
                                    <label class="info-label"><i class="fas fa-envelope"></i> 이메일</label>
                                    ${isEditMode ? 
                                        `<input type="email" class="info-input" id="email" value="${detailedInfo.email}">` :
                                        `<span class="info-value">${detailedInfo.email}</span>`
                                    }
                                </div>
                                <div class="info-row">
                                    <label class="info-label"><i class="fas fa-building"></i> 사무실</label>
                                    ${isEditMode ? 
                                        `<input type="text" class="info-input" id="office" value="${detailedInfo.office}">` :
                                        `<span class="info-value">${detailedInfo.office}</span>`
                                    }
                                </div>
                                <div class="info-row">
                                    <label class="info-label"><i class="fas fa-globe"></i> 홈페이지</label>
                                    ${isEditMode ? 
                                        `<input type="text" class="info-input" id="homepage" value="${detailedInfo.homepage}">` :
                                        `<span class="info-value"><a href="http://${detailedInfo.homepage}" target="_blank">${detailedInfo.homepage}</a></span>`
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <!-- 학력 탭 -->
                        <div class="tab-pane" id="education-tab">
                            <div class="info-section">
                                ${isEditMode ? 
                                    `<div class="editable-list">
                                        ${detailedInfo.education.map((edu, idx) => `
                                            <div class="list-item-edit">
                                                <input type="text" class="info-input" value="${edu}">
                                                <button class="btn-remove"><i class="fas fa-times"></i></button>
                                            </div>
                                        `).join('')}
                                        <button class="btn-add"><i class="fas fa-plus"></i> 추가</button>
                                    </div>` :
                                    `<ul class="info-list">
                                        ${detailedInfo.education.map(edu => `<li>${edu}</li>`).join('')}
                                    </ul>`
                                }
                            </div>
                        </div>
                        
                        <!-- 경력 탭 -->
                        <div class="tab-pane" id="career-tab">
                            <div class="info-section">
                                ${isEditMode ? 
                                    `<div class="editable-list">
                                        ${detailedInfo.career.map((car, idx) => `
                                            <div class="list-item-edit">
                                                <input type="text" class="info-input" value="${car}">
                                                <button class="btn-remove"><i class="fas fa-times"></i></button>
                                            </div>
                                        `).join('')}
                                        <button class="btn-add"><i class="fas fa-plus"></i> 추가</button>
                                    </div>` :
                                    `<ul class="info-list">
                                        ${detailedInfo.career.map(car => `<li>${car}</li>`).join('')}
                                    </ul>`
                                }
                            </div>
                        </div>
                        
                        <!-- 위원회 탭 -->
                        <div class="tab-pane" id="committee-tab">
                            <div class="info-section">
                                <div class="committee-cards">
                                    ${memberData.committees.map(com => `
                                        <div class="committee-card">
                                            <i class="fas fa-users"></i>
                                            <span>${com}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <!-- SNS 탭 -->
                        <div class="tab-pane" id="sns-tab">
                            <div class="info-section">
                                <div class="info-row">
                                    <label class="info-label"><i class="fab fa-facebook"></i> Facebook</label>
                                    ${isEditMode ? 
                                        `<input type="text" class="info-input" id="facebook" value="${detailedInfo.facebook}">` :
                                        `<span class="info-value"><a href="https://${detailedInfo.facebook}" target="_blank">${detailedInfo.facebook}</a></span>`
                                    }
                                </div>
                                <div class="info-row">
                                    <label class="info-label"><i class="fab fa-instagram"></i> Instagram</label>
                                    ${isEditMode ? 
                                        `<input type="text" class="info-input" id="instagram" value="${detailedInfo.instagram}">` :
                                        `<span class="info-value">${detailedInfo.instagram}</span>`
                                    }
                                </div>
                                <div class="info-row">
                                    <label class="info-label"><i class="fas fa-blog"></i> Blog</label>
                                    ${isEditMode ? 
                                        `<input type="text" class="info-input" id="blog" value="${detailedInfo.blog}">` :
                                        `<span class="info-value"><a href="https://${detailedInfo.blog}" target="_blank">${detailedInfo.blog}</a></span>`
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 추가 정보 섹션 -->
                <div class="additional-info">
                    <div class="info-card">
                        <h3 class="info-card-title"><i class="fas fa-trophy"></i> 수상 경력</h3>
                        <ul class="info-list">
                            ${detailedInfo.awards.map(award => `<li>${award}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="info-card">
                        <h3 class="info-card-title"><i class="fas fa-heart"></i> 관심 분야</h3>
                        <div class="interest-tags">
                            ${detailedInfo.interests.map(interest => `
                                <span class="interest-tag">${interest}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- 저장 버튼 -->
                ${isEditMode ? `
                    <div class="action-buttons">
                        <button id="saveBtn" class="btn-save">
                            <i class="fas fa-save"></i> 저장
                        </button>
                        <button id="cancelBtn" class="btn-cancel">
                            <i class="fas fa-times"></i> 취소
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        // 이벤트 리스너 설정
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // 편집 토글 버튼
        const editToggleBtn = document.getElementById('editToggleBtn');
        if (editToggleBtn) {
            editToggleBtn.addEventListener('click', toggleEditMode);
        }
        
        // 탭 버튼들
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                switchTab(this.dataset.tab);
            });
        });
        
        // 저장 버튼
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveChanges);
        }
        
        // 취소 버튼
        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', cancelEdit);
        }
    }
    
    function toggleEditMode() {
        isEditMode = !isEditMode;
        if (isEditMode) {
            tempData = JSON.parse(JSON.stringify(memberData));
        }
        renderInfoPage();
    }
    
    function switchTab(tabName) {
        // 모든 탭 버튼과 패널 비활성화
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // 선택된 탭 활성화
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }
    
    function saveChanges() {
        // 입력된 값들을 수집
        const inputs = document.querySelectorAll('.info-input');
        inputs.forEach(input => {
            const field = input.id;
            if (field && tempData[field] !== undefined) {
                tempData[field] = input.value;
            }
        });
        
        // 실제 데이터에 반영
        Object.assign(memberData, tempData);
        
        // localStorage에 저장
        localStorage.setItem('memberData', JSON.stringify(memberData));
        
        // 편집 모드 종료
        isEditMode = false;
        renderInfoPage();
        
        // 성공 메시지
        alert('정보가 성공적으로 저장되었습니다.');
    }
    
    function cancelEdit() {
        isEditMode = false;
        tempData = JSON.parse(JSON.stringify(memberData));
        renderInfoPage();
    }
    
    // 초기 렌더링
    renderInfoPage();
};