// 홈페이지 내정보 섹션 - 마이데이터 기능
window.app.loadHomePageWithMyData = function() {
    const data = MemberDataManager.defaultMemberData;
    const privacy = MemberDataManager.privacySettings;
    
    const html = `
        <div class="page-container">
            <!-- Government Notice -->
            <div class="gov-notice">
                <i class="fas fa-info-circle mr-2"></i>
                <span>2025년도 제372회 경기도의회(임시회) 진행중</span>
            </div>
            
            <!-- Enhanced Profile Card with MyData -->
            <div class="gov-card mb-4" style="position: relative;">
                <!-- 편집 모드 토글 버튼 -->
                <div style="position: absolute; top: 16px; right: 16px; z-index: 10;">
                    <button id="editModeBtn" onclick="app.toggleEditMode()" 
                            class="btn-secondary" 
                            style="padding: 6px 12px; font-size: 12px; display: flex; align-items: center; gap: 6px;">
                        <i class="fas fa-edit"></i>
                        <span id="editModeText">편집</span>
                    </button>
                </div>
                
                <div class="flex items-center justify-between mb-3">
                    <h3 class="gov-title">
                        <i class="fas fa-user-shield text-blue-600 mr-2"></i>
                        내정보
                        <span style="font-size: 12px; color: #7c3aed; margin-left: 8px;">
                            <i class="fas fa-lock"></i> 마이데이터
                        </span>
                    </h3>
                </div>
                
                <!-- 의원 정보 섹션 -->
                <div style="background: linear-gradient(to right, #f3f4f6, #ffffff); padding: 20px; border-radius: 12px; margin-bottom: 16px;">
                    <div class="flex items-start" style="gap: 24px;">
                        <!-- 사진 -->
                        <div style="position: relative;">
                            <div class="photo-container photo-lg member-photo-circle" style="flex-shrink: 0; width: 120px; height: 120px;">
                                <img src="${data.photo || 'images/annomimus.jpg'}" alt="${data.name} 의원">
                                ${privacy.photo ? '' : '<div style="position: absolute; inset: 0; background: rgba(0,0,0,0.7); border-radius: 50%; display: flex; align-items: center; justify-content: center;"><i class="fas fa-lock text-white"></i></div>'}
                            </div>
                            <button onclick="app.uploadProfilePhoto()" class="edit-only" style="display: none; position: absolute; bottom: 0; right: 0; width: 32px; height: 32px; background: #003d7a; color: white; border: none; border-radius: 50%; cursor: pointer;">
                                <i class="fas fa-camera"></i>
                            </button>
                        </div>
                        
                        <!-- 기본 정보 -->
                        <div class="flex-1">
                            <div class="mb-3">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                                    <h2 class="text-xl font-bold text-gray-900 editable-field" 
                                        data-field="name" 
                                        contenteditable="false">
                                        ${privacy.name ? data.name : '***'}
                                    </h2>
                                    <span class="text-lg text-gray-600 editable-field" 
                                          data-field="nameHanja" 
                                          contenteditable="false">
                                        ${privacy.name ? `(${data.nameHanja})` : ''}
                                    </span>
                                    <span class="text-sm text-gray-500 editable-field" 
                                          data-field="birthYear" 
                                          contenteditable="false">
                                        ${privacy.birthYear ? data.birthYear + '년생' : ''}
                                    </span>
                                    ${app.renderInlinePrivacy('name', privacy.name)}
                                </div>
                                
                                <div style="display: grid; gap: 8px;">
                                    <!-- 소속정당 -->
                                    <div class="info-row">
                                        <span class="info-label">소속정당</span>
                                        <span class="info-value editable-field" data-field="party" contenteditable="false">
                                            ${privacy.party ? data.party : '비공개'}
                                        </span>
                                        ${app.renderInlinePrivacy('party', privacy.party)}
                                    </div>
                                    
                                    <!-- 선거구 -->
                                    <div class="info-row">
                                        <span class="info-label">선거구</span>
                                        <span class="info-value editable-field" data-field="district" contenteditable="false">
                                            ${privacy.district ? data.district : '비공개'}
                                        </span>
                                        ${app.renderInlinePrivacy('district', privacy.district)}
                                    </div>
                                    
                                    <!-- 선거구 상세 -->
                                    <div class="info-row">
                                        <span class="info-label">관할지역</span>
                                        <span class="info-value editable-field" data-field="districtDetail" contenteditable="false" style="font-size: 13px;">
                                            ${privacy.districtDetail ? data.districtDetail : '비공개'}
                                        </span>
                                        ${app.renderInlinePrivacy('districtDetail', privacy.districtDetail)}
                                    </div>
                                    
                                    <!-- 소속위원회 -->
                                    <div class="info-row">
                                        <span class="info-label">소속위원회</span>
                                        <span class="info-value">
                                            <span class="editable-field" data-field="committee" contenteditable="false">
                                                ${privacy.committee ? data.committee : '비공개'}
                                            </span>
                                            <span class="editable-field" data-field="committeeRole" contenteditable="false">
                                                ${privacy.committee ? data.committeeRole : ''}
                                            </span>
                                        </span>
                                        ${app.renderInlinePrivacy('committee', privacy.committee)}
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 배지 -->
                            <div class="flex items-center mt-3 space-x-2">
                                <span class="gov-badge gov-badge-active">재직중</span>
                                <span class="gov-badge">초선</span>
                                <span class="gov-badge">제11대</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 연락처 정보 -->
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <h4 style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 12px;">
                            <i class="fas fa-address-card mr-2"></i>연락처 정보
                        </h4>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                            <!-- 전화 -->
                            <div class="info-row">
                                <span class="info-label"><i class="fas fa-phone text-gray-400 mr-1"></i>전화</span>
                                <span class="info-value editable-field" data-field="phone" contenteditable="false">
                                    ${privacy.phone ? data.phone : '비공개'}
                                </span>
                                ${app.renderInlinePrivacy('phone', privacy.phone)}
                            </div>
                            
                            <!-- 정책지원관 -->
                            <div class="info-row">
                                <span class="info-label"><i class="fas fa-user-tie text-gray-400 mr-1"></i>정책지원관</span>
                                <span class="info-value editable-field" data-field="phonePolicy" contenteditable="false">
                                    ${privacy.phonePolicy ? data.phonePolicy : '비공개'}
                                </span>
                                ${app.renderInlinePrivacy('phonePolicy', privacy.phonePolicy)}
                            </div>
                            
                            <!-- 팩스 -->
                            <div class="info-row">
                                <span class="info-label"><i class="fas fa-fax text-gray-400 mr-1"></i>팩스</span>
                                <span class="info-value editable-field" data-field="fax" contenteditable="false">
                                    ${privacy.fax ? data.fax : '비공개'}
                                </span>
                                ${app.renderInlinePrivacy('fax', privacy.fax)}
                            </div>
                            
                            <!-- 이메일 -->
                            <div class="info-row">
                                <span class="info-label"><i class="fas fa-envelope text-gray-400 mr-1"></i>이메일</span>
                                <span class="info-value editable-field" data-field="email" contenteditable="false">
                                    ${privacy.email ? data.email : '비공개'}
                                </span>
                                ${app.renderInlinePrivacy('email', privacy.email)}
                            </div>
                            
                            <!-- 의원실 -->
                            <div class="info-row">
                                <span class="info-label"><i class="fas fa-door-open text-gray-400 mr-1"></i>의원실</span>
                                <span class="info-value editable-field" data-field="office" contenteditable="false">
                                    ${privacy.office ? data.office : '비공개'}
                                </span>
                                ${app.renderInlinePrivacy('office', privacy.office)}
                            </div>
                            
                            <!-- 지역상담소 -->
                            <div class="info-row">
                                <span class="info-label"><i class="fas fa-building text-gray-400 mr-1"></i>지역상담소</span>
                                <span class="info-value editable-field" data-field="consultingOffice" contenteditable="false">
                                    ${privacy.consultingOffice ? data.consultingOffice : '비공개'}
                                </span>
                                ${app.renderInlinePrivacy('consultingOffice', privacy.consultingOffice)}
                            </div>
                        </div>
                    </div>
                    
                    <!-- 편집 모드 버튼들 -->
                    <div class="edit-only" style="display: none; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: right;">
                        <button onclick="app.cancelEdit()" class="btn-secondary" style="margin-right: 8px;">
                            <i class="fas fa-times mr-2"></i>취소
                        </button>
                        <button onclick="app.saveHomeProfile()" class="btn-primary">
                            <i class="fas fa-save mr-2"></i>저장
                        </button>
                    </div>
                </div>
                
                <!-- 마이데이터 안내 -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 16px; border-radius: 8px; font-size: 13px;">
                    <i class="fas fa-shield-alt mr-2"></i>
                    <strong>마이데이터 보호:</strong> 
                    <span style="opacity: 0.9;">각 정보의 자물쇠 아이콘을 클릭하여 공개/비공개를 설정할 수 있습니다.</span>
                    <a href="#" onclick="app.navigateTo('member-profile'); return false;" style="color: white; text-decoration: underline; margin-left: 8px;">
                        상세 설정 →
                    </a>
                </div>
            </div>
            
            <!-- Quick Stats Grid (기존 통계) -->
            <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="gov-stat-card" onclick="app.navigateTo('attendance')">
                    <div class="gov-stat-icon bg-blue-100 text-blue-600">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="gov-stat-content">
                        <div class="gov-stat-value">98.5%</div>
                        <div class="gov-stat-label">본회의 출석률</div>
                        <div class="gov-stat-detail">197회/200회</div>
                    </div>
                </div>
                
                <div class="gov-stat-card" onclick="app.navigateTo('bill')">
                    <div class="gov-stat-icon bg-green-100 text-green-600">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="gov-stat-content">
                        <div class="gov-stat-value">32건</div>
                        <div class="gov-stat-label">발의 법안</div>
                        <div class="gov-stat-detail">가결 18건</div>
                    </div>
                </div>
                
                <div class="gov-stat-card" onclick="app.navigateTo('speech')">
                    <div class="gov-stat-icon bg-purple-100 text-purple-600">
                        <i class="fas fa-microphone"></i>
                    </div>
                    <div class="gov-stat-content">
                        <div class="gov-stat-value">15회</div>
                        <div class="gov-stat-label">본회의 발언</div>
                        <div class="gov-stat-detail">5분발언 8회</div>
                    </div>
                </div>
                
                <div class="gov-stat-card" onclick="app.navigateTo('civil')">
                    <div class="gov-stat-icon bg-orange-100 text-orange-600">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="gov-stat-content">
                        <div class="gov-stat-value">248건</div>
                        <div class="gov-stat-label">민원 처리</div>
                        <div class="gov-stat-detail">처리율 94%</div>
                    </div>
                </div>
            </div>
            
            <!-- 이하 기존 내용 유지 -->
        </div>
        
        <style>
            .info-row {
                display: flex;
                align-items: center;
                gap: 8px;
                position: relative;
            }
            
            .info-label {
                font-size: 12px;
                color: #6b7280;
                min-width: 80px;
            }
            
            .info-value {
                font-size: 14px;
                color: #111827;
                font-weight: 500;
                flex: 1;
            }
            
            .editable-field {
                transition: all 0.2s;
                padding: 2px 4px;
                border-radius: 4px;
            }
            
            .editable-field[contenteditable="true"] {
                background: white;
                border: 1px solid #3b82f6;
                box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
            }
            
            .privacy-toggle {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .privacy-toggle.public {
                background: #10b981;
                color: white;
            }
            
            .privacy-toggle.private {
                background: #6b7280;
                color: white;
            }
            
            .privacy-toggle:hover {
                transform: scale(1.1);
            }
            
            .edit-only {
                transition: all 0.3s;
            }
        </style>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
    
    // 차트 초기화 등 기존 로직 유지
    setTimeout(() => {
        if (document.getElementById('monthlyChart')) {
            // 기존 차트 로직
        }
    }, 100);
};

// 인라인 프라이버시 토글 렌더
window.app.renderInlinePrivacy = function(field, isPublic) {
    return `
        <button class="privacy-toggle ${isPublic ? 'public' : 'private'}" 
                onclick="app.togglePrivacy('${field}')" 
                title="${isPublic ? '공개' : '비공개'}">
            <i class="fas fa-${isPublic ? 'lock-open' : 'lock'}" style="font-size: 10px;"></i>
        </button>
    `;
};

// 편집 모드 토글
window.app.toggleEditMode = function() {
    const isEditing = document.querySelector('.editable-field[contenteditable="true"]');
    
    if (isEditing) {
        // 편집 모드 종료
        app.cancelEdit();
    } else {
        // 편집 모드 시작
        document.querySelectorAll('.editable-field').forEach(field => {
            field.contentEditable = 'true';
        });
        document.querySelectorAll('.edit-only').forEach(el => {
            el.style.display = 'block';
        });
        document.getElementById('editModeText').textContent = '취소';
        document.getElementById('editModeBtn').classList.add('btn-primary');
        document.getElementById('editModeBtn').classList.remove('btn-secondary');
    }
};

// 편집 취소
window.app.cancelEdit = function() {
    document.querySelectorAll('.editable-field').forEach(field => {
        field.contentEditable = 'false';
    });
    document.querySelectorAll('.edit-only').forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById('editModeText').textContent = '편집';
    document.getElementById('editModeBtn').classList.remove('btn-primary');
    document.getElementById('editModeBtn').classList.add('btn-secondary');
    
    // 원래 데이터로 복원
    app.loadHomePageWithMyData();
};

// 홈 프로필 저장
window.app.saveHomeProfile = function() {
    document.querySelectorAll('.editable-field').forEach(field => {
        const fieldName = field.dataset.field;
        const value = field.textContent.trim();
        MemberDataManager.updateField(fieldName, value);
    });
    
    app.showToast('정보가 저장되었습니다.');
    app.cancelEdit();
};

// 프라이버시 토글
window.app.togglePrivacy = function(field) {
    const currentValue = MemberDataManager.privacySettings[field];
    MemberDataManager.updatePrivacy(field, !currentValue);
    app.loadHomePageWithMyData();
};

// 기존 loadHomePage 함수 오버라이드
window.app.loadHomePage = window.app.loadHomePageWithMyData;