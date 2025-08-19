// 의원 정보 조회/수정 페이지
window.app.loadMemberProfilePage = function() {
    const mainContent = document.getElementById('mainContent');
    const data = MemberDataManager.defaultMemberData;
    const privacy = MemberDataManager.privacySettings;
    const sync = MemberDataManager.syncSettings;
    const isEditMode = window.app.profileEditMode || false;
    
    mainContent.innerHTML = `
        <div class="page-container" style="max-width: 800px; margin: 0 auto; padding-bottom: 20px;">
            <!-- 모바일 최적화 헤더 -->
            <div class="gov-card mb-4" style="padding: 16px;">
                <div class="mobile-header">
                    <h3 class="gov-title" style="margin: 0; font-size: 18px;">
                        <i class="fas fa-user-circle text-blue-600 mr-2"></i>
                        <span>의원 정보 관리</span>
                    </h3>
                    <div class="header-buttons">
                        ${!isEditMode ? `
                            <button onclick="app.toggleEditMode(true)" class="mobile-btn-primary">
                                <i class="fas fa-edit"></i>
                                <span class="mobile-btn-text">수정</span>
                            </button>
                        ` : `
                            <button onclick="app.saveMemberProfile()" class="mobile-btn-primary">
                                <i class="fas fa-save"></i>
                                <span class="mobile-btn-text">저장</span>
                            </button>
                            <button onclick="app.toggleEditMode(false)" class="mobile-btn-secondary">
                                <i class="fas fa-times"></i>
                                <span class="mobile-btn-text">취소</span>
                            </button>
                        `}
                        <button onclick="app.exportMemberData()" class="mobile-btn-icon" title="내보내기">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
                
                <!-- 마이데이터 안내 -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px; border-radius: 12px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-shield-alt" style="font-size: 24px;"></i>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px;">마이데이터 보호 모드</div>
                            <div style="font-size: 13px; opacity: 0.9;">각 정보의 공개/비공개를 설정하여 개인정보를 보호할 수 있습니다</div>
                        </div>
                    </div>
                </div>
                
                <!-- 모바일 최적화 탭 메뉴 -->
                <div class="mobile-tabs">
                    <button onclick="app.showProfileTab('basic')" class="mobile-tab active" data-tab="basic">
                        <i class="fas fa-user mobile-tab-icon"></i>
                        <span class="mobile-tab-text">기본정보</span>
                    </button>
                    <button onclick="app.showProfileTab('contact')" class="mobile-tab" data-tab="contact">
                        <i class="fas fa-phone mobile-tab-icon"></i>
                        <span class="mobile-tab-text">연락처</span>
                    </button>
                    <button onclick="app.showProfileTab('career')" class="mobile-tab" data-tab="career">
                        <i class="fas fa-briefcase mobile-tab-icon"></i>
                        <span class="mobile-tab-text">경력</span>
                    </button>
                    <button onclick="app.showProfileTab('privacy')" class="mobile-tab" data-tab="privacy">
                        <i class="fas fa-lock mobile-tab-icon"></i>
                        <span class="mobile-tab-text">공개설정</span>
                    </button>
                    <button onclick="app.showProfileTab('sync')" class="mobile-tab" data-tab="sync">
                        <i class="fas fa-sync mobile-tab-icon"></i>
                        <span class="mobile-tab-text">연동</span>
                    </button>
                </div>
                
                <!-- 기본 정보 탭 -->
                <div id="tab-basic" class="profile-tab-content">
                    <div style="display: grid; gap: 16px;">
                        <!-- 사진 -->
                        <div style="display: flex; gap: 20px; align-items: start; padding: 16px; background: #f9fafb; border-radius: 8px;">
                            <div style="width: 120px; height: 150px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                                <img src="${data.photo || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2U1ZTdlYiIvPgogIDxjaXJjbGUgY3g9IjYwIiBjeT0iNTAiIHI9IjI1IiBmaWxsPSIjOWNhM2FmIi8+CiAgPGVsbGlwc2UgY3g9IjYwIiBjeT0iMTEwIiByeD0iNDAiIHJ5PSI0MCIgZmlsbD0iIzljYTNhZiIvPgo8L3N2Zz4='}" 
                                     alt="의원 사진" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <div style="flex: 1;">
                                <label class="field-label">프로필 사진</label>
                                ${isEditMode ? `
                                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                                        <button onclick="app.uploadMemberPhoto()" class="btn-secondary" style="padding: 6px 12px; font-size: 13px;">
                                            <i class="fas fa-camera"></i> 사진 변경
                                        </button>
                                        <button onclick="app.removeMemberPhoto()" class="btn-secondary" style="padding: 6px 12px; font-size: 13px;">
                                            <i class="fas fa-trash"></i> 삭제
                                        </button>
                                    </div>
                                ` : ''}
                                ${app.renderPrivacyBadge('photo', privacy.photo)}
                            </div>
                        </div>
                        
                        <!-- 이름 -->
                        <div class="mobile-field-group">
                            <div class="mobile-field-header">
                                <label class="mobile-field-label">성명</label>
                                ${app.renderPrivacyBadge('name', privacy.name)}
                            </div>
                            ${isEditMode ? `
                                <div class="mobile-field-inputs">
                                    <input type="text" id="field-name" value="${data.name}" class="mobile-form-input" placeholder="이름">
                                    <input type="text" id="field-nameHanja" value="${data.nameHanja || ''}" placeholder="한자명" class="mobile-form-input">
                                </div>
                            ` : `
                                <div class="mobile-field-value">
                                    ${data.name} ${data.nameHanja ? `(${data.nameHanja})` : ''}
                                </div>
                            `}
                        </div>
                        
                        <!-- 출생연도 -->
                        <div class="mobile-field-group">
                            <div class="mobile-field-header">
                                <label class="mobile-field-label">출생연도</label>
                                ${app.renderPrivacyBadge('birthYear', privacy.birthYear)}
                            </div>
                            ${isEditMode ? `
                                <input type="text" id="field-birthYear" value="${data.birthYear}" class="mobile-form-input" placeholder="예: 1970">
                            ` : `
                                <div class="mobile-field-value">
                                    ${data.birthYear || '-'}
                                </div>
                            `}
                        </div>
                        
                        <!-- 소속정당 -->
                        <div class="mobile-field-group">
                            <div class="mobile-field-header">
                                <label class="mobile-field-label">소속정당</label>
                                ${app.renderPrivacyBadge('party', privacy.party)}
                            </div>
                            ${isEditMode ? `
                                <select id="field-party" class="mobile-form-input">
                                    <option value="국민의힘" ${data.party === '국민의힘' ? 'selected' : ''}>국민의힘</option>
                                    <option value="더불어민주당" ${data.party === '더불어민주당' ? 'selected' : ''}>더불어민주당</option>
                                    <option value="정의당" ${data.party === '정의당' ? 'selected' : ''}>정의당</option>
                                    <option value="무소속" ${data.party === '무소속' ? 'selected' : ''}>무소속</option>
                                </select>
                            ` : `
                                <div class="mobile-field-value">
                                    ${data.party}
                                </div>
                            `}
                        </div>
                        
                        <!-- 선거구 -->
                        <div class="field-group">
                            <label class="field-label">선거구</label>
                            <div style="display: flex; gap: 12px; align-items: center;">
                                ${isEditMode ? `
                                    <input type="text" id="field-district" value="${data.district}" class="form-input" style="flex: 1;">
                                ` : `
                                    <div style="flex: 1; padding: 8px 0; font-size: 15px; color: #111827;">
                                        ${data.district}
                                    </div>
                                `}
                                ${app.renderPrivacyBadge('district', privacy.district)}
                            </div>
                            ${isEditMode ? `
                                <input type="text" id="field-districtDetail" value="${data.districtDetail || ''}" 
                                       placeholder="상세 지역" class="form-input" style="margin-top: 8px;">
                            ` : data.districtDetail ? `
                                <div style="padding: 4px 0; font-size: 14px; color: #6b7280;">
                                    ${data.districtDetail}
                                </div>
                            ` : ''}
                        </div>
                        
                        <!-- 소속위원회 -->
                        <div class="field-group">
                            <label class="field-label">소속위원회</label>
                            <div style="display: flex; gap: 12px; align-items: center;">
                                ${isEditMode ? `
                                    <input type="text" id="field-committee" value="${data.committee}" class="form-input" style="flex: 1;">
                                    <select id="field-committeeRole" class="form-input" style="width: 120px;">
                                        <option value="위원장" ${data.committeeRole === '위원장' ? 'selected' : ''}>위원장</option>
                                        <option value="부위원장" ${data.committeeRole === '부위원장' ? 'selected' : ''}>부위원장</option>
                                        <option value="위원" ${data.committeeRole === '위원' ? 'selected' : ''}>위원</option>
                                    </select>
                                ` : `
                                    <div style="flex: 1; padding: 8px 0; font-size: 15px; color: #111827;">
                                        ${data.committee} (${data.committeeRole})
                                    </div>
                                `}
                                ${app.renderPrivacyBadge('committee', privacy.committee)}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 연락처 탭 -->
                <div id="tab-contact" class="profile-tab-content" style="display: none;">
                    <div style="display: grid; gap: 16px;">
                        <div class="field-group">
                            <label class="field-label">전화번호</label>
                            <div style="display: flex; gap: 12px; align-items: center;">
                                ${isEditMode ? `
                                    <input type="tel" id="field-phone" value="${data.phone}" class="form-input" style="flex: 1;">
                                ` : `
                                    <div style="flex: 1; padding: 8px 0; font-size: 15px; color: #111827;">
                                        ${data.phone || '-'}
                                    </div>
                                `}
                                ${app.renderPrivacyBadge('phone', privacy.phone)}
                            </div>
                        </div>
                        
                        <div class="field-group">
                            <label class="field-label">정책지원관</label>
                            <div style="display: flex; gap: 12px; align-items: center;">
                                ${isEditMode ? `
                                    <input type="tel" id="field-phonePolicy" value="${data.phonePolicy}" class="form-input" style="flex: 1;">
                                ` : `
                                    <div style="flex: 1; padding: 8px 0; font-size: 15px; color: #111827;">
                                        ${data.phonePolicy || '-'}
                                    </div>
                                `}
                                ${app.renderPrivacyBadge('phonePolicy', privacy.phonePolicy)}
                            </div>
                        </div>
                        
                        <div class="field-group">
                            <label class="field-label">팩스</label>
                            <div style="display: flex; gap: 12px; align-items: center;">
                                ${isEditMode ? `
                                    <input type="tel" id="field-fax" value="${data.fax}" class="form-input" style="flex: 1;">
                                ` : `
                                    <div style="flex: 1; padding: 8px 0; font-size: 15px; color: #111827;">
                                        ${data.fax || '-'}
                                    </div>
                                `}
                                ${app.renderPrivacyBadge('fax', privacy.fax)}
                            </div>
                        </div>
                        
                        <div class="field-group">
                            <label class="field-label">이메일</label>
                            <div style="display: flex; gap: 12px; align-items: center;">
                                ${isEditMode ? `
                                    <input type="email" id="field-email" value="${data.email}" class="form-input" style="flex: 1;">
                                ` : `
                                    <div style="flex: 1; padding: 8px 0; font-size: 15px; color: #111827;">
                                        ${data.email || '-'}
                                    </div>
                                `}
                                ${app.renderPrivacyBadge('email', privacy.email)}
                            </div>
                        </div>
                        
                        <div class="field-group">
                            <label class="field-label">의원실</label>
                            <div style="display: flex; gap: 12px; align-items: center;">
                                ${isEditMode ? `
                                    <input type="text" id="field-office" value="${data.office}" class="form-input" style="flex: 1;">
                                ` : `
                                    <div style="flex: 1; padding: 8px 0; font-size: 15px; color: #111827;">
                                        ${data.office || '-'}
                                    </div>
                                `}
                                ${app.renderPrivacyBadge('office', privacy.office)}
                            </div>
                        </div>
                        
                        <div class="field-group">
                            <label class="field-label">지역상담소</label>
                            <div style="display: flex; gap: 12px; align-items: center;">
                                ${isEditMode ? `
                                    <input type="text" id="field-consultingOffice" value="${data.consultingOffice}" class="form-input" style="flex: 1;">
                                ` : `
                                    <div style="flex: 1; padding: 8px 0; font-size: 15px; color: #111827;">
                                        ${data.consultingOffice || '-'}
                                    </div>
                                `}
                                ${app.renderPrivacyBadge('consultingOffice', privacy.consultingOffice)}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 경력사항 탭 -->
                <div id="tab-career" class="profile-tab-content" style="display: none;">
                    <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
                        ${isEditMode ? `
                            <button onclick="app.addCareerItem()" class="btn-primary" style="padding: 8px 16px; font-size: 14px;">
                                <i class="fas fa-plus mr-2"></i>경력 추가
                            </button>
                        ` : '<div></div>'}
                        ${app.renderPrivacyBadge('career', privacy.career)}
                    </div>
                    
                    <div id="career-list" style="display: grid; gap: 12px;">
                        ${data.career.map((item, index) => isEditMode ? `
                            <div class="career-item" style="padding: 12px; background: #f9fafb; border-radius: 8px; display: flex; gap: 12px; align-items: center;">
                                <select class="form-input" style="width: 80px;" onchange="app.updateCareerType(${index}, this.value)">
                                    <option value="현" ${item.type === '현' ? 'selected' : ''}>현</option>
                                    <option value="전" ${item.type === '전' ? 'selected' : ''}>전</option>
                                </select>
                                <input type="text" value="${item.content}" class="form-input" style="flex: 1;" 
                                       onchange="app.updateCareerContent(${index}, this.value)">
                                <button onclick="app.removeCareerItem(${index})" class="btn-secondary" style="padding: 6px 10px;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        ` : `
                            <div class="career-item" style="padding: 12px; background: #f9fafb; border-radius: 8px; display: flex; gap: 12px; align-items: center;">
                                <span style="font-weight: 600; color: ${item.type === '현' ? '#10b981' : '#6b7280'}; min-width: 40px;">
                                    ${item.type}
                                </span>
                                <span style="flex: 1; color: #111827; font-size: 15px;">
                                    ${item.content}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- 공개설정 탭 -->
                <div id="tab-privacy" class="profile-tab-content" style="display: none;">
                    <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 12px; border-radius: 8px; margin-bottom: 20px;">
                        <div style="display: flex; gap: 8px; color: #92400e;">
                            <i class="fas fa-info-circle" style="margin-top: 2px;"></i>
                            <div style="font-size: 14px;">
                                비공개로 설정된 정보는 외부에 공개되지 않으며, 본인만 확인할 수 있습니다.
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: grid; gap: 12px;">
                        ${Object.entries(privacy).map(([key, value]) => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
                                <span style="font-size: 14px; color: #374151;">${app.getFieldLabel(key)}</span>
                                ${isEditMode ? `
                                    <label class="switch">
                                        <input type="checkbox" ${value ? 'checked' : ''} 
                                               onchange="MemberDataManager.updatePrivacy('${key}', this.checked)">
                                        <span class="slider round"></span>
                                    </label>
                                ` : `
                                    <span style="padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
                                                 background: ${value ? '#dcfce7' : '#fee2e2'};
                                                 color: ${value ? '#16a34a' : '#dc2626'};">
                                        ${value ? '공개' : '비공개'}
                                    </span>
                                `}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- 연동관리 탭 -->
                <div id="tab-sync" class="profile-tab-content" style="display: none;">
                    <div style="display: grid; gap: 16px;">
                        <div class="sync-item" style="padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 40px; height: 40px; background: #003d7a; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-landmark" style="color: white; font-size: 20px;"></i>
                                    </div>
                                    <div>
                                        <div style="font-weight: 600; color: #111827;">정부 공공데이터</div>
                                        <div style="font-size: 13px; color: #6b7280;">경기도의회 공식 데이터와 연동</div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    ${sync.governmentAPI ? '<span style="color: #10b981; font-size: 12px;"><i class="fas fa-check-circle"></i> 연동됨</span>' : ''}
                                    <button onclick="app.syncWithService('governmentAPI')" class="btn-primary" style="padding: 6px 12px; font-size: 13px;">
                                        <i class="fas fa-sync"></i> 동기화
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="sync-item" style="padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 40px; height: 40px; background: #4285f4; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fab fa-google" style="color: white; font-size: 20px;"></i>
                                    </div>
                                    <div>
                                        <div style="font-weight: 600; color: #111827;">Google 연락처</div>
                                        <div style="font-size: 13px; color: #6b7280;">Google 계정과 연락처 동기화</div>
                                    </div>
                                </div>
                                <button onclick="app.connectService('google')" class="btn-secondary" style="padding: 6px 12px; font-size: 13px;">
                                    연결하기
                                </button>
                            </div>
                        </div>
                        
                        <div class="sync-item" style="padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 40px; height: 40px; background: #fee500; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-comment" style="color: #3c1e1e; font-size: 20px;"></i>
                                    </div>
                                    <div>
                                        <div style="font-weight: 600; color: #111827;">카카오 프로필</div>
                                        <div style="font-size: 13px; color: #6b7280;">카카오톡 프로필과 연동</div>
                                    </div>
                                </div>
                                <button onclick="app.connectService('kakao')" class="btn-secondary" style="padding: 6px 12px; font-size: 13px;">
                                    연결하기
                                </button>
                            </div>
                        </div>
                        
                        ${sync.lastSync ? `
                            <div style="text-align: center; color: #6b7280; font-size: 13px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                                마지막 동기화: ${new Date(sync.lastSync).toLocaleString('ko-KR')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            /* 모바일 최적화 스타일 */
            .mobile-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
            }
            
            .header-buttons {
                display: flex;
                gap: 8px;
                align-items: center;
            }
            
            .mobile-btn-primary, .mobile-btn-secondary {
                padding: 10px 16px;
                border-radius: 8px;
                border: none;
                font-size: 14px;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 6px;
                cursor: pointer;
                transition: all 0.2s;
                min-height: 44px;
            }
            
            .mobile-btn-primary {
                background: #003d7a;
                color: white;
            }
            
            .mobile-btn-secondary {
                background: #f3f4f6;
                color: #374151;
                border: 1px solid #d1d5db;
            }
            
            .mobile-btn-icon {
                width: 44px;
                height: 44px;
                border-radius: 8px;
                border: 1px solid #d1d5db;
                background: white;
                color: #374151;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            /* 탭 스타일 */
            .mobile-tabs {
                display: flex;
                gap: 4px;
                margin-bottom: 20px;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                padding-bottom: 4px;
            }
            
            .mobile-tab {
                padding: 12px 16px;
                background: #f9fafb;
                border: none;
                border-radius: 8px 8px 0 0;
                color: #6b7280;
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                min-width: 70px;
                transition: all 0.2s;
                white-space: nowrap;
            }
            
            .mobile-tab.active {
                background: #003d7a;
                color: white;
            }
            
            .mobile-tab-icon {
                font-size: 16px;
            }
            
            .mobile-tab-text {
                font-size: 11px;
            }
            
            /* 필드 그룹 스타일 */
            .mobile-field-group {
                background: white;
                padding: 16px;
                border-radius: 12px;
                border: 1px solid #e5e7eb;
                margin-bottom: 12px;
            }
            
            .mobile-field-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .mobile-field-label {
                font-size: 14px;
                font-weight: 600;
                color: #374151;
            }
            
            .mobile-field-value {
                font-size: 16px;
                color: #111827;
                padding: 8px 0;
            }
            
            .mobile-field-inputs {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .mobile-form-input {
                width: 100%;
                padding: 12px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 16px;
                transition: all 0.2s;
            }
            
            .mobile-form-input:focus {
                outline: none;
                border-color: #003d7a;
                box-shadow: 0 0 0 3px rgba(0,61,122,0.1);
            }
            
            /* 기존 스타일 유지 */
            .field-group {
                margin-bottom: 16px;
            }
            
            .field-label {
                display: block;
                font-size: 13px;
                font-weight: 600;
                color: #374151;
                margin-bottom: 6px;
            }
            
            .form-input {
                padding: 8px 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                transition: all 0.2s;
            }
            
            .form-input:focus {
                outline: none;
                border-color: #003d7a;
                box-shadow: 0 0 0 3px rgba(0,61,122,0.1);
            }
            
            .btn-primary {
                background: #003d7a;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
                font-weight: 500;
            }
            
            .btn-primary:hover {
                background: #0056b3;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0,61,122,0.2);
            }
            
            .btn-secondary {
                background: #f3f4f6;
                color: #374151;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
                font-weight: 500;
            }
            
            .btn-secondary:hover {
                background: #e5e7eb;
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            
            /* 모바일 반응형 */
            @media (max-width: 480px) {
                .mobile-btn-text {
                    display: none;
                }
                
                .mobile-btn-primary, .mobile-btn-secondary {
                    padding: 10px;
                    min-width: 44px;
                }
                
                .mobile-tabs {
                    padding: 0 8px;
                }
                
                .gov-card {
                    padding: 12px !important;
                }
            }
            
            .switch {
                position: relative;
                display: inline-block;
                width: 48px;
                height: 24px;
            }
            
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #cbd5e1;
                transition: .4s;
                border-radius: 24px;
            }
            
            .slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .slider {
                background-color: #10b981;
            }
            
            input:checked + .slider:before {
                transform: translateX(24px);
            }
            
            .profile-tab.active {
                color: #003d7a !important;
                border-bottom-color: #003d7a !important;
                font-weight: 600;
            }
        </style>
    `;
};

// 헬퍼 함수들
window.app.renderPrivacyToggle = function(field, isPublic) {
    return `
        <div style="display: flex; align-items: center; gap: 8px;">
            <label class="switch">
                <input type="checkbox" ${isPublic ? 'checked' : ''} 
                       onchange="MemberDataManager.updatePrivacy('${field}', this.checked)">
                <span class="slider round"></span>
            </label>
            <span style="font-size: 12px; color: ${isPublic ? '#10b981' : '#6b7280'};">
                ${isPublic ? '공개' : '비공개'}
            </span>
        </div>
    `;
};

// 읽기 전용 모드에서 공개/비공개 배지 표시 (모바일 최적화)
window.app.renderPrivacyBadge = function(field, isPublic) {
    return `
        <span class="privacy-badge ${isPublic ? 'public' : 'private'}" 
              style="display: inline-flex; align-items: center; padding: 6px 10px; 
                     border-radius: 20px; font-size: 11px; font-weight: 600;
                     background: ${isPublic ? '#dcfce7' : '#fee2e2'};
                     color: ${isPublic ? '#16a34a' : '#dc2626'};
                     white-space: nowrap;">
            <i class="fas ${isPublic ? 'fa-eye' : 'fa-eye-slash'}" style="margin-right: 4px; font-size: 10px;"></i>
            <span class="privacy-text">${isPublic ? '공개' : '비공개'}</span>
        </span>
    `;
};

// 수정 모드 토글
window.app.toggleEditMode = function(editMode) {
    window.app.profileEditMode = editMode;
    
    if (!editMode) {
        // 취소 시 확인
        if (confirm('변경사항을 저장하지 않고 취소하시겠습니까?')) {
            app.loadMemberProfilePage();
        } else {
            window.app.profileEditMode = true;
        }
    } else {
        app.loadMemberProfilePage();
    }
};

window.app.getFieldLabel = function(key) {
    const labels = {
        name: '성명',
        birthYear: '출생연도',
        photo: '사진',
        party: '소속정당',
        district: '선거구',
        districtDetail: '선거구 상세',
        committee: '소속위원회',
        phone: '전화번호',
        phonePolicy: '정책지원관',
        fax: '팩스',
        email: '이메일',
        office: '의원실',
        consultingOffice: '지역상담소',
        career: '경력사항',
        sns: 'SNS',
        statistics: '의정활동 통계'
    };
    return labels[key] || key;
};

// 탭 전환
window.app.showProfileTab = function(tab) {
    // 모든 탭 컨텐츠 숨기기
    document.querySelectorAll('.profile-tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // 모든 탭 버튼 비활성화 (기존 및 모바일)
    document.querySelectorAll('.profile-tab, .mobile-tab').forEach(button => {
        button.classList.remove('active');
        if (button.classList.contains('profile-tab')) {
            button.style.color = '#6b7280';
            button.style.borderBottomColor = 'transparent';
        }
    });
    
    // 선택된 탭 컨텐츠 보이기
    const tabContent = document.getElementById(`tab-${tab}`);
    if (tabContent) {
        tabContent.style.display = 'block';
    }
    
    // 선택된 탭 버튼 활성화
    const tabButton = document.querySelector(`[data-tab="${tab}"]`);
    if (tabButton) {
        tabButton.classList.add('active');
    }
};

// 프로필 저장
window.app.saveMemberProfile = function() {
    // 기본 정보 저장
    if (document.getElementById('field-name')) {
        MemberDataManager.updateField('name', document.getElementById('field-name').value);
    }
    if (document.getElementById('field-nameHanja')) {
        MemberDataManager.updateField('nameHanja', document.getElementById('field-nameHanja').value);
    }
    if (document.getElementById('field-birthYear')) {
        MemberDataManager.updateField('birthYear', document.getElementById('field-birthYear').value);
    }
    if (document.getElementById('field-party')) {
        MemberDataManager.updateField('party', document.getElementById('field-party').value);
    }
    if (document.getElementById('field-district')) {
        MemberDataManager.updateField('district', document.getElementById('field-district').value);
    }
    if (document.getElementById('field-districtDetail')) {
        MemberDataManager.updateField('districtDetail', document.getElementById('field-districtDetail').value);
    }
    if (document.getElementById('field-committee')) {
        MemberDataManager.updateField('committee', document.getElementById('field-committee').value);
    }
    if (document.getElementById('field-committeeRole')) {
        MemberDataManager.updateField('committeeRole', document.getElementById('field-committeeRole').value);
    }
    
    // 연락처 정보 저장
    if (document.getElementById('field-phone')) {
        MemberDataManager.updateField('phone', document.getElementById('field-phone').value);
        MemberDataManager.updateField('phonePolicy', document.getElementById('field-phonePolicy').value);
        MemberDataManager.updateField('fax', document.getElementById('field-fax').value);
        MemberDataManager.updateField('email', document.getElementById('field-email').value);
        MemberDataManager.updateField('office', document.getElementById('field-office').value);
        MemberDataManager.updateField('consultingOffice', document.getElementById('field-consultingOffice').value);
    }
    
    app.showToast('의원 정보가 저장되었습니다.', 'success');
    
    // 수정 모드 종료
    window.app.profileEditMode = false;
    app.loadMemberProfilePage();
};

// 경력 추가
window.app.addCareerItem = function() {
    MemberDataManager.addCareer('현', '');
    app.loadMemberProfilePage();
};

// 경력 삭제
window.app.removeCareerItem = function(index) {
    if (confirm('이 경력을 삭제하시겠습니까?')) {
        MemberDataManager.removeCareer(index);
        app.loadMemberProfilePage();
    }
};

// 경력 타입 변경
window.app.updateCareerType = function(index, type) {
    MemberDataManager.defaultMemberData.career[index].type = type;
    MemberDataManager.saveData();
};

// 경력 내용 변경
window.app.updateCareerContent = function(index, content) {
    MemberDataManager.defaultMemberData.career[index].content = content;
    MemberDataManager.saveData();
};

// 데이터 동기화
window.app.syncWithService = function(service) {
    MemberDataManager.syncData(service).then(result => {
        app.showToast(result.message);
        if (result.success) {
            app.loadMemberProfilePage();
        }
    });
};

// 서비스 연결
window.app.connectService = function(service) {
    app.showToast(`${service} 서비스 연동은 준비 중입니다.`);
};

// 사진 업로드
window.app.uploadMemberPhoto = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                MemberDataManager.updateField('photo', event.target.result);
                app.showToast('프로필 사진이 변경되었습니다.');
                app.loadMemberProfilePage();
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};

// 사진 삭제
window.app.removeMemberPhoto = function() {
    if (confirm('프로필 사진을 삭제하시겠습니까?')) {
        MemberDataManager.updateField('photo', null);
        app.showToast('프로필 사진이 삭제되었습니다.');
        app.loadMemberProfilePage();
    }
};

// 데이터 내보내기
window.app.exportMemberData = function() {
    const data = MemberDataManager.exportData('json');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `member_profile_${MemberDataManager.defaultMemberData.name}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    app.showToast('의원 정보를 내보냈습니다.');
};