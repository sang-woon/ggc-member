// 통합 연락처 시스템 함수들
Object.assign(window.app, {
    // 메인 화면 연락처 버튼에서 호출하는 함수 (새 버전)
    showQuickContacts: function() {
        if (!window.contactsData) {
            this.showNotification('연락처 데이터를 불러올 수 없습니다.', 'error');
            return;
        }

        const vipContacts = window.contactsData.getVIPContacts();
        const allDepartments = window.contactsData.contactsDB;

        // VIP 연락처 카드 생성
        const vipContactsHtml = vipContacts.map(contact => {
            const firstChar = contact.name.charAt(0);
            return `
                <div class="contact-card-vip" onclick="app.showContactDetail('${contact.id}')">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 ${contact.avatar} rounded-full flex items-center justify-center text-white font-bold text-lg">
                            ${firstChar}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-gray-900 truncate">${contact.name}</div>
                            <div class="text-xs text-gray-600">${contact.department}</div>
                            <div class="text-xs text-green-600">
                                <i class="fas fa-phone mr-1"></i>${contact.phone}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // 부서별 연락처 생성
        const departmentsHtml = Object.keys(allDepartments).map(deptKey => {
            const dept = allDepartments[deptKey];
            const memberCount = dept.members.length;
            
            const membersHtml = dept.members.map(member => {
                const firstChar = member.name.charAt(0);
                const responsibilities = member.responsibilities.slice(0, 2).join(', ');
                return `
                    <div class="contact-item" onclick="app.showContactDetail('${member.id}')">
                        <div class="contact-avatar ${member.avatar}">${firstChar}</div>
                        <div class="contact-info">
                            <div class="contact-name">${member.name}</div>
                            <div class="contact-detail">${responsibilities}</div>
                            <div class="contact-phone">${member.phone}</div>
                        </div>
                        <div class="contact-actions">
                            <button onclick="event.stopPropagation(); app.callContact('${member.phone}')" class="contact-btn-call">
                                <i class="fas fa-phone"></i>
                            </button>
                            <button onclick="event.stopPropagation(); app.messageContact('${member.phone}')" class="contact-btn-message">
                                <i class="fas fa-comment"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            const colorClass = dept.color === 'purple' ? 'text-purple-600' : 
                             dept.color === 'blue' ? 'text-blue-600' : 
                             dept.color === 'gray' ? 'text-gray-600' : 'text-gray-600';
            
            const badgeClass = dept.color === 'purple' ? 'bg-purple-100 text-purple-700' : 
                              dept.color === 'blue' ? 'bg-blue-100 text-blue-700' : 
                              dept.color === 'gray' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-700';

            return `
                <div class="contact-department">
                    <div class="contact-dept-header" onclick="app.toggleDepartment('${deptKey}')">
                        <div class="flex items-center">
                            <i class="fas fa-chevron-right transition-transform dept-arrow" id="arrow-${deptKey}"></i>
                            <i class="${dept.icon} ${colorClass} ml-2 mr-3"></i>
                            <span class="font-medium">${dept.title} (${memberCount}명)</span>
                        </div>
                        <span class="text-xs ${badgeClass} px-2 py-1 rounded">${dept.badge}</span>
                    </div>
                    <div class="contact-dept-content" id="dept-${deptKey}" style="display: none;">
                        ${membersHtml}
                    </div>
                </div>
            `;
        }).join('');

        const contactsContent = `
            <div class="space-y-4">
                <!-- 검색 영역 -->
                <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                    <div class="flex items-center gap-3">
                        <div class="flex-1 relative">
                            <input type="text" id="contactSearch" 
                                placeholder="이름, 부서, 직급으로 검색..." 
                                class="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                onkeyup="app.filterContacts(this.value)">
                            <i class="fas fa-search absolute left-3 top-4 text-purple-400"></i>
                        </div>
                        <button onclick="app.showFavoriteContacts()" 
                            class="px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">
                            <i class="fas fa-star mr-1"></i>즐겨찾기
                        </button>
                    </div>
                </div>

                <!-- 자주 연락하는 분들 -->
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <h4 class="font-semibold text-green-900 mb-3 flex items-center">
                        <i class="fas fa-star text-yellow-500 mr-2"></i>자주 연락하는 분들
                    </h4>
                    <div class="grid grid-cols-2 gap-3">
                        ${vipContactsHtml || '<div class="col-span-2 text-center text-gray-500 text-sm">즐겨찾기로 등록된 연락처가 없습니다.</div>'}
                    </div>
                </div>

                <!-- 부서별 연락처 -->
                <div id="contactsList">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-900 flex items-center">
                            <i class="fas fa-building text-blue-500 mr-2"></i>부서별 연락처
                        </h4>
                        ${departmentsHtml}
                    </div>
                </div>
            </div>
        `;
        
        this.showModal('contacts', {
            title: '연락처 관리',
            content: contactsContent,
            confirmText: '확인',
            modalClass: 'modal-scrollable contacts-modal'
        });
    },

    // 검색 기능
    filterContacts: function(query) {
        if (!window.contactsData) return;
        
        const searchResults = window.contactsData.searchContacts(query);
        
        if (!query) {
            // 검색어가 없으면 모든 부서 표시
            Object.keys(window.contactsData.contactsDB).forEach(deptKey => {
                const deptElement = document.querySelector(`.contact-department:has(#dept-${deptKey})`);
                if (deptElement) {
                    deptElement.style.display = 'block';
                }
            });
            return;
        }

        // 검색 결과에 따라 부서별로 필터링
        const resultsByDept = {};
        searchResults.forEach(contact => {
            if (!resultsByDept[contact.departmentKey]) {
                resultsByDept[contact.departmentKey] = [];
            }
            resultsByDept[contact.departmentKey].push(contact);
        });

        // 모든 부서 숨기기
        Object.keys(window.contactsData.contactsDB).forEach(deptKey => {
            const deptElement = document.querySelector(`.contact-department:has(#dept-${deptKey})`);
            if (deptElement) {
                if (resultsByDept[deptKey] && resultsByDept[deptKey].length > 0) {
                    deptElement.style.display = 'block';
                    // 해당 부서 자동 열기
                    const deptContent = document.getElementById(`dept-${deptKey}`);
                    const arrow = document.getElementById(`arrow-${deptKey}`);
                    if (deptContent && arrow) {
                        deptContent.style.display = 'block';
                        arrow.style.transform = 'rotate(90deg)';
                    }
                } else {
                    deptElement.style.display = 'none';
                }
            }
        });
    },

    // 즐겨찾기 연락처 보기
    showFavoriteContacts: function() {
        if (!window.contactsData) {
            this.showNotification('연락처 데이터를 불러올 수 없습니다.', 'error');
            return;
        }

        const favoriteContacts = window.contactsData.getFavoriteContacts();
        
        if (favoriteContacts.length === 0) {
            this.showNotification('즐겨찾기로 등록된 연락처가 없습니다.', 'info');
            return;
        }

        const favoritesHtml = favoriteContacts.map(contact => {
            const firstChar = contact.name.charAt(0);
            return `
                <div class="contact-item" onclick="app.showContactDetail('${contact.id}')">
                    <div class="contact-avatar ${contact.avatar}">${firstChar}</div>
                    <div class="contact-info">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-detail">${contact.position} · ${contact.department}</div>
                        <div class="contact-phone">${contact.phone}</div>
                    </div>
                    <div class="contact-actions">
                        <button onclick="event.stopPropagation(); app.callContact('${contact.phone}')" class="contact-btn-call">
                            <i class="fas fa-phone"></i>
                        </button>
                        <button onclick="event.stopPropagation(); app.messageContact('${contact.phone}')" class="contact-btn-message">
                            <i class="fas fa-comment"></i>
                        </button>
                        <button onclick="event.stopPropagation(); window.contactsData.removeFavorite('${contact.id}'); app.showFavoriteContacts();" class="contact-btn-favorite">
                            <i class="fas fa-star text-yellow-500"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.showModal('favorites', {
            title: `즐겨찾기 연락처 (${favoriteContacts.length}명)`,
            content: `
                <div class="space-y-3">
                    ${favoritesHtml}
                </div>
            `,
            confirmText: '확인',
            modalClass: 'modal-scrollable'
        });
    },

    // 교육위원회 연락처 전용 모달
    showEducationCommitteeContacts: function() {
        if (!window.contactsData) {
            this.showNotification('연락처 데이터를 불러올 수 없습니다.', 'error');
            return;
        }

        const educationDept = window.contactsData.getDepartmentContacts('education');
        if (!educationDept) {
            this.showNotification('교육위원회 연락처를 찾을 수 없습니다.', 'error');
            return;
        }

        const membersHtml = educationDept.members.map(member => {
            const firstChar = member.name.charAt(0);
            const responsibilities = member.responsibilities.slice(0, 3).join(', ');
            return `
                <div class="contact-item" onclick="app.showContactDetail('${member.id}')">
                    <div class="contact-avatar ${member.avatar}">${firstChar}</div>
                    <div class="contact-info">
                        <div class="contact-name">${member.name}</div>
                        <div class="contact-detail">${member.position} · ${responsibilities}</div>
                        <div class="contact-phone">${member.phone}</div>
                        <div class="contact-office text-xs text-gray-500">${member.office}</div>
                    </div>
                    <div class="contact-actions">
                        <button onclick="event.stopPropagation(); app.callContact('${member.phone}')" class="contact-btn-call">
                            <i class="fas fa-phone"></i>
                        </button>
                        <button onclick="event.stopPropagation(); app.messageContact('${member.phone}')" class="contact-btn-message">
                            <i class="fas fa-comment"></i>
                        </button>
                        <button onclick="event.stopPropagation(); app.toggleFavorite('${member.id}', this)" class="contact-btn-favorite">
                            <i class="fas fa-star ${window.contactsData.isFavorite(member.id) ? 'text-yellow-500' : 'text-gray-400'}"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.showModal('education-contacts', {
            title: `${educationDept.title} 연락처 (${educationDept.members.length}명)`,
            content: `
                <div class="space-y-3">
                    <div class="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div class="text-sm text-blue-800 font-medium">
                            <i class="${educationDept.icon} mr-2"></i>
                            ${educationDept.title} 전체 연락처
                        </div>
                        <div class="text-xs text-blue-600 mt-1">
                            총 ${educationDept.members.length}명 · ${educationDept.badge}
                        </div>
                    </div>
                    ${membersHtml}
                </div>
            `,
            confirmText: '확인',
            modalClass: 'modal-scrollable'
        });
    },

    // 의회사무처 연락처 전용 모달  
    showStaffDirectoryContacts: function() {
        if (!window.contactsData) {
            this.showNotification('연락처 데이터를 불러올 수 없습니다.', 'error');
            return;
        }

        const adminDept = window.contactsData.getDepartmentContacts('admin');
        if (!adminDept) {
            this.showNotification('의회사무처 연락처를 찾을 수 없습니다.', 'error');
            return;
        }

        const membersHtml = adminDept.members.map(member => {
            const firstChar = member.name.charAt(0);
            const responsibilities = member.responsibilities.slice(0, 3).join(', ');
            return `
                <div class="contact-item" onclick="app.showContactDetail('${member.id}')">
                    <div class="contact-avatar ${member.avatar}">${firstChar}</div>
                    <div class="contact-info">
                        <div class="contact-name">${member.name}</div>
                        <div class="contact-detail">${member.position} · ${responsibilities}</div>
                        <div class="contact-phone">${member.phone}</div>
                        <div class="contact-office text-xs text-gray-500">${member.office}</div>
                    </div>
                    <div class="contact-actions">
                        <button onclick="event.stopPropagation(); app.callContact('${member.phone}')" class="contact-btn-call">
                            <i class="fas fa-phone"></i>
                        </button>
                        <button onclick="event.stopPropagation(); app.messageContact('${member.phone}')" class="contact-btn-message">
                            <i class="fas fa-comment"></i>
                        </button>
                        <button onclick="event.stopPropagation(); app.toggleFavorite('${member.id}', this)" class="contact-btn-favorite">
                            <i class="fas fa-star ${window.contactsData.isFavorite(member.id) ? 'text-yellow-500' : 'text-gray-400'}"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.showModal('staff-contacts', {
            title: `${adminDept.title} 연락처 (${adminDept.members.length}명)`,
            content: `
                <div class="space-y-3">
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div class="text-sm text-gray-800 font-medium">
                            <i class="${adminDept.icon} mr-2"></i>
                            ${adminDept.title} 전체 연락처
                        </div>
                        <div class="text-xs text-gray-600 mt-1">
                            총 ${adminDept.members.length}명 · ${adminDept.badge}
                        </div>
                    </div>
                    ${membersHtml}
                </div>
            `,
            confirmText: '확인', 
            modalClass: 'modal-scrollable'
        });
    },

    // 즐겨찾기 토글 기능
    toggleFavorite: function(contactId, buttonElement) {
        if (!window.contactsData) return;
        
        const isFavorite = window.contactsData.isFavorite(contactId);
        const starIcon = buttonElement.querySelector('i');
        
        if (isFavorite) {
            window.contactsData.removeFavorite(contactId);
            starIcon.className = 'fas fa-star text-gray-400';
            this.showNotification('즐겨찾기에서 제거되었습니다.', 'info');
        } else {
            window.contactsData.addFavorite(contactId);
            starIcon.className = 'fas fa-star text-yellow-500';
            this.showNotification('즐겨찾기에 추가되었습니다.', 'success');
        }
    },

    // 연락처 상세보기 (통합 데이터 사용)
    showContactDetail: function(contactId) {
        if (!window.contactsData) {
            this.showNotification('연락처 데이터를 불러올 수 없습니다.', 'error');
            return;
        }

        const contact = window.contactsData.getContactById(contactId);
        if (!contact) {
            this.showNotification('연락처를 찾을 수 없습니다.', 'error');
            return;
        }

        const isFavorite = window.contactsData.isFavorite(contactId);
        const firstChar = contact.name.charAt(0);

        const detailContent = `
            <div class="space-y-4">
                <!-- 프로필 헤더 -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 ${contact.avatar} rounded-full flex items-center justify-center text-white font-bold text-xl">
                            ${firstChar}
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center space-x-2">
                                <h4 class="text-lg font-bold text-gray-900">${contact.name}</h4>
                                <button onclick="app.toggleFavorite('${contactId}', this)" class="p-1">
                                    <i class="fas fa-star ${isFavorite ? 'text-yellow-500' : 'text-gray-400'} text-lg"></i>
                                </button>
                            </div>
                            <div class="text-blue-800 font-medium">${contact.position}</div>
                            <div class="text-blue-600 text-sm">${contact.departmentTitle}</div>
                        </div>
                    </div>
                </div>

                <!-- 연락처 정보 -->
                <div class="space-y-3">
                    <div class="contact-detail-item">
                        <i class="fas fa-phone text-green-600"></i>
                        <div>
                            <div class="font-medium">전화번호</div>
                            <div class="text-gray-600">${contact.phone}</div>
                        </div>
                        <button onclick="app.callContact('${contact.phone}')" class="text-green-600 hover:bg-green-50">
                            <i class="fas fa-phone-alt"></i>
                        </button>
                    </div>

                    <div class="contact-detail-item">
                        <i class="fas fa-hashtag text-blue-600"></i>
                        <div>
                            <div class="font-medium">내선번호</div>
                            <div class="text-gray-600">${contact.extension}</div>
                        </div>
                        <button onclick="app.callContact('${contact.extension}')" class="text-blue-600 hover:bg-blue-50">
                            <i class="fas fa-phone"></i>
                        </button>
                    </div>

                    <div class="contact-detail-item">
                        <i class="fas fa-envelope text-purple-600"></i>
                        <div>
                            <div class="font-medium">이메일</div>
                            <div class="text-gray-600">${contact.email}</div>
                        </div>
                        <button onclick="app.messageContact('${contact.email}')" class="text-purple-600 hover:bg-purple-50">
                            <i class="fas fa-envelope"></i>
                        </button>
                    </div>

                    <div class="contact-detail-item">
                        <i class="fas fa-map-marker-alt text-red-600"></i>
                        <div>
                            <div class="font-medium">사무실</div>
                            <div class="text-gray-600">${contact.office}</div>
                        </div>
                    </div>

                    <div class="contact-detail-item">
                        <i class="fas fa-clock text-orange-600"></i>
                        <div>
                            <div class="font-medium">근무시간</div>
                            <div class="text-gray-600">${contact.workHours}</div>
                        </div>
                    </div>
                </div>

                <!-- 담당 업무 -->
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h5 class="font-semibold mb-3 text-gray-900">담당 업무</h5>
                    <div class="flex flex-wrap gap-2">
                        ${contact.responsibilities.map(resp => 
                            `<span class="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border">${resp}</span>`
                        ).join('')}
                    </div>
                </div>

                <!-- 최근 연락 -->
                <div class="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div class="text-sm text-blue-800 font-medium">최근 연락</div>
                    <div class="text-blue-600 text-xs">${contact.recentContact}</div>
                </div>
            </div>
        `;

        this.showModal('contact-detail', {
            title: `연락처 상세 정보`,
            content: detailContent,
            confirmText: '확인',
            modalClass: 'modal-scrollable',
            buttons: [
                {
                    text: '전화걸기',
                    class: 'bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 mr-2',
                    onclick: `app.callContact('${contact.phone}'); app.closeModal();`
                },
                {
                    text: '메시지',
                    class: 'bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 mr-2',
                    onclick: `app.messageContact('${contact.phone}'); app.closeModal();`
                },
                {
                    text: '닫기',
                    class: 'btn-secondary',
                    onclick: 'app.closeModal()'
                }
            ]
        });
    }
});