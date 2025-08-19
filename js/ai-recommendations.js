// AI 기반 의정활동 추천 시스템
// 의원의 활동 패턴을 분석하여 개인화된 추천 제공

class AIRecommendationSystem {
    constructor() {
        this.memberData = null;
        this.activityHistory = [];
        this.recommendations = [];
        this.learningModel = null;
        this.isInitialized = false;
        
        // 추천 카테고리 정의
        this.categories = {
            bills: {
                name: '의안 발의',
                weight: 0.3,
                factors: ['policy_area', 'urgency', 'public_interest', 'expertise']
            },
            meetings: {
                name: '회의 참석',
                weight: 0.25,
                factors: ['committee_relevance', 'attendance_pattern', 'topic_interest']
            },
            complaints: {
                name: '민원 처리',
                weight: 0.2,
                factors: ['region', 'category', 'complexity', 'priority']
            },
            education: {
                name: '교육 이수',
                weight: 0.15,
                factors: ['skill_gaps', 'career_development', 'trending_topics']
            },
            networking: {
                name: '네트워킹',
                weight: 0.1,
                factors: ['collaboration_history', 'shared_interests', 'strategic_value']
            }
        };
        
        // 정책 분야 정의
        this.policyAreas = {
            education: { name: '교육', keywords: ['교육', '학교', '대학', '학습'] },
            welfare: { name: '복지', keywords: ['복지', '사회보장', '노인', '아동'] },
            environment: { name: '환경', keywords: ['환경', '기후', '녹색', '오염'] },
            economy: { name: '경제', keywords: ['경제', '산업', '일자리', '투자'] },
            safety: { name: '안전', keywords: ['안전', '재해', '방재', '치안'] },
            transport: { name: '교통', keywords: ['교통', '도로', '대중교통', '주차'] },
            culture: { name: '문화', keywords: ['문화', '예술', '체육', '관광'] },
            health: { name: '보건', keywords: ['보건', '의료', '건강', '병원'] }
        };
        
        this.init();
    }

    async init() {
        try {
            // 회원 데이터 로드
            this.memberData = window.app?.memberData || this.getDefaultMemberData();
            
            // 활동 히스토리 로드
            await this.loadActivityHistory();
            
            // AI 모델 초기화
            this.initializeLearningModel();
            
            // UI 설정
            this.setupUI();
            
            // 초기 추천 생성
            await this.generateRecommendations();
            
            this.isInitialized = true;
            console.log('AI 추천 시스템 초기화 완료');
        } catch (error) {
            console.error('AI 추천 시스템 초기화 실패:', error);
        }
    }

    getDefaultMemberData() {
        return {
            memberId: '2024-0815',
            name: '김의원',
            committees: ['교육위원회'],
            interests: ['교육', '복지'],
            region: '경기도',
            experience_years: 2
        };
    }

    async loadActivityHistory() {
        // 로컬 스토리지에서 활동 히스토리 로드
        const saved = localStorage.getItem('activityHistory');
        if (saved) {
            this.activityHistory = JSON.parse(saved);
        } else {
            // 초기 모의 데이터
            this.activityHistory = this.generateMockActivityHistory();
            this.saveActivityHistory();
        }
    }

    generateMockActivityHistory() {
        const history = [];
        const now = new Date();
        
        // 최근 6개월간의 활동 데이터 생성
        for (let i = 0; i < 180; i++) {
            const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
            
            // 랜덤 활동 생성
            if (Math.random() < 0.3) { // 30% 확률로 활동 있음
                const activityTypes = ['bill', 'meeting', 'complaint', 'education'];
                const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
                const areas = Object.keys(this.policyAreas);
                const area = areas[Math.floor(Math.random() * areas.length)];
                
                history.push({
                    date: date.toISOString().split('T')[0],
                    type: type,
                    area: area,
                    success: Math.random() > 0.2, // 80% 성공률
                    engagement: Math.floor(Math.random() * 100),
                    impact: Math.floor(Math.random() * 10) + 1
                });
            }
        }
        
        return history.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    saveActivityHistory() {
        localStorage.setItem('activityHistory', JSON.stringify(this.activityHistory));
    }

    initializeLearningModel() {
        // 간단한 패턴 인식 모델 초기화
        this.learningModel = {
            preferences: this.analyzePreferences(),
            patterns: this.analyzeTimePatterns(),
            success_factors: this.analyzeSuccessFactors(),
            collaboration_network: this.analyzeCollaborationNetwork()
        };
    }

    analyzePreferences() {
        const preferences = {};
        
        // 정책 분야별 선호도 분석
        Object.keys(this.policyAreas).forEach(area => {
            const activities = this.activityHistory.filter(a => a.area === area);
            preferences[area] = {
                frequency: activities.length,
                avg_engagement: activities.reduce((sum, a) => sum + a.engagement, 0) / Math.max(activities.length, 1),
                success_rate: activities.filter(a => a.success).length / Math.max(activities.length, 1)
            };
        });
        
        return preferences;
    }

    analyzeTimePatterns() {
        const patterns = {
            preferred_days: {},
            preferred_times: {},
            seasonal_trends: {}
        };
        
        this.activityHistory.forEach(activity => {
            const date = new Date(activity.date);
            const day = date.getDay();
            const month = date.getMonth();
            
            patterns.preferred_days[day] = (patterns.preferred_days[day] || 0) + 1;
            patterns.seasonal_trends[month] = (patterns.seasonal_trends[month] || 0) + 1;
        });
        
        return patterns;
    }

    analyzeSuccessFactors() {
        const successful = this.activityHistory.filter(a => a.success && a.impact > 5);
        const factors = {};
        
        successful.forEach(activity => {
            factors[activity.area] = factors[activity.area] || {
                count: 0,
                avg_impact: 0,
                common_patterns: []
            };
            
            factors[activity.area].count++;
            factors[activity.area].avg_impact += activity.impact;
        });
        
        // 평균 계산
        Object.keys(factors).forEach(area => {
            factors[area].avg_impact /= factors[area].count;
        });
        
        return factors;
    }

    analyzeCollaborationNetwork() {
        // 협업 네트워크 분석 (모의 데이터)
        return {
            frequent_collaborators: ['박의원', '이의원', '최의원'],
            committee_connections: ['교육위원회', '복지위원회'],
            cross_party_relationships: 0.7
        };
    }

    async generateRecommendations() {
        this.recommendations = [];
        
        // 각 카테고리별 추천 생성
        for (const [category, config] of Object.entries(this.categories)) {
            const categoryRecommendations = await this.generateCategoryRecommendations(category, config);
            this.recommendations.push(...categoryRecommendations);
        }
        
        // 중요도 순으로 정렬
        this.recommendations.sort((a, b) => b.score - a.score);
        
        // 상위 10개 추천만 유지
        this.recommendations = this.recommendations.slice(0, 10);
        
        console.log('AI 추천 생성 완료:', this.recommendations.length, '개');
    }

    async generateCategoryRecommendations(category, config) {
        const recommendations = [];
        
        switch (category) {
            case 'bills':
                recommendations.push(...this.generateBillRecommendations());
                break;
            case 'meetings':
                recommendations.push(...this.generateMeetingRecommendations());
                break;
            case 'complaints':
                recommendations.push(...this.generateComplaintRecommendations());
                break;
            case 'education':
                recommendations.push(...this.generateEducationRecommendations());
                break;
            case 'networking':
                recommendations.push(...this.generateNetworkingRecommendations());
                break;
        }
        
        return recommendations.map(rec => ({
            ...rec,
            category: category,
            weight: config.weight
        }));
    }

    generateBillRecommendations() {
        const preferences = this.learningModel.preferences;
        const recommendations = [];
        
        // 선호도가 높은 분야의 의안 추천
        const topAreas = Object.entries(preferences)
            .sort((a, b) => b[1].avg_engagement - a[1].avg_engagement)
            .slice(0, 3);
        
        topAreas.forEach(([area, pref]) => {
            recommendations.push({
                id: `bill_${area}_${Date.now()}`,
                type: 'bill',
                title: `${this.policyAreas[area].name} 관련 의안 발의 검토`,
                description: `최근 ${this.policyAreas[area].name} 분야에서 주목받는 이슈에 대한 의안 발의를 검토해보세요.`,
                area: area,
                urgency: this.calculateUrgency(area),
                expected_impact: Math.floor(pref.avg_engagement / 10) + 5,
                score: pref.avg_engagement * 0.8 + pref.success_rate * 20,
                action_items: [
                    '관련 법령 검토',
                    '이해관계자 의견 수렴',
                    '예산 영향 분석',
                    '의안 초안 작성'
                ],
                deadline: this.getRecommendedDeadline(14),
                resources: [
                    '법제처 법령정보',
                    '정책연구기관 보고서',
                    '관련 전문가 네트워크'
                ]
            });
        });
        
        return recommendations;
    }

    generateMeetingRecommendations() {
        const recommendations = [];
        const patterns = this.learningModel.patterns;
        
        // 위원회 회의 추천
        if (this.memberData.committees) {
            this.memberData.committees.forEach(committee => {
                recommendations.push({
                    id: `meeting_${committee}_${Date.now()}`,
                    type: 'meeting',
                    title: `${committee} 회의 참석`,
                    description: `정기 위원회 회의 참석으로 의정활동 강화`,
                    committee: committee,
                    relevance: 0.9,
                    score: 85,
                    action_items: [
                        '회의 안건 사전 검토',
                        '질의 내용 준비',
                        '관련 자료 수집'
                    ],
                    deadline: this.getRecommendedDeadline(3),
                    location: '위원회실'
                });
            });
        }
        
        // 특별 회의 추천
        recommendations.push({
            id: `special_meeting_${Date.now()}`,
            type: 'meeting',
            title: '정책 토론회 참석',
            description: '주요 정책 이슈에 대한 전문가 토론회 참석 권장',
            relevance: 0.7,
            score: 75,
            action_items: [
                '토론 주제 숙지',
                '질문 사항 준비',
                '네트워킹 계획 수립'
            ],
            deadline: this.getRecommendedDeadline(7),
            location: '대회의실'
        });
        
        return recommendations;
    }

    generateComplaintRecommendations() {
        const recommendations = [];
        const region = this.memberData.region;
        
        // 지역별 주요 민원 이슈 추천
        const regionalIssues = [
            {
                category: '교통',
                title: '대중교통 개선 민원 처리',
                description: `${region} 지역의 대중교통 불편 사항 해결`,
                priority: 'high',
                expected_cases: 15
            },
            {
                category: '환경',
                title: '환경 오염 관련 민원 대응',
                description: '지역 환경 개선을 위한 민원 적극 처리',
                priority: 'medium',
                expected_cases: 8
            },
            {
                category: '복지',
                title: '복지 사각지대 민원 발굴',
                description: '복지 혜택을 받지 못하는 주민들의 민원 적극 수렴',
                priority: 'high',
                expected_cases: 12
            }
        ];
        
        regionalIssues.forEach((issue, index) => {
            recommendations.push({
                id: `complaint_${issue.category}_${Date.now() + index}`,
                type: 'complaint',
                title: issue.title,
                description: issue.description,
                category: issue.category,
                priority: issue.priority,
                expected_impact: issue.expected_cases,
                score: issue.priority === 'high' ? 80 : 60,
                action_items: [
                    '현장 조사 실시',
                    '관련 부서 협의',
                    '해결 방안 검토',
                    '주민 의견 수렴'
                ],
                deadline: this.getRecommendedDeadline(10)
            });
        });
        
        return recommendations;
    }

    generateEducationRecommendations() {
        const recommendations = [];
        const skillGaps = this.identifySkillGaps();
        
        skillGaps.forEach(gap => {
            recommendations.push({
                id: `education_${gap.area}_${Date.now()}`,
                type: 'education',
                title: `${gap.area} 전문성 강화 교육`,
                description: gap.description,
                skill_area: gap.area,
                difficulty: gap.level,
                duration: gap.duration,
                score: gap.priority,
                action_items: [
                    '교육 과정 선택',
                    '일정 조율',
                    '사전 학습 자료 검토'
                ],
                deadline: this.getRecommendedDeadline(21),
                provider: gap.provider
            });
        });
        
        return recommendations;
    }

    generateNetworkingRecommendations() {
        const recommendations = [];
        const network = this.learningModel.collaboration_network;
        
        // 협업 기회 추천
        recommendations.push({
            id: `networking_collaboration_${Date.now()}`,
            type: 'networking',
            title: '초당적 협력 의안 공동 발의',
            description: '정치적 입장을 초월한 민생 법안 공동 발의 기회',
            collaboration_type: 'cross_party',
            potential_partners: network.frequent_collaborators.slice(0, 2),
            score: 70,
            action_items: [
                '공동 관심 이슈 파악',
                '협력 방안 논의',
                '역할 분담 협의'
            ],
            deadline: this.getRecommendedDeadline(14)
        });
        
        // 전문가 네트워킹 추천
        recommendations.push({
            id: `networking_expert_${Date.now()}`,
            type: 'networking',
            title: '정책 전문가 네트워크 구축',
            description: '해당 분야 전문가들과의 지속적인 네트워킹 강화',
            collaboration_type: 'expert',
            score: 65,
            action_items: [
                '전문가 리스트 작성',
                '정기 모임 계획',
                '정보 교류 체계 구축'
            ],
            deadline: this.getRecommendedDeadline(30)
        });
        
        return recommendations;
    }

    identifySkillGaps() {
        // 스킬 갭 분석 (모의 데이터)
        return [
            {
                area: '디지털 정책',
                description: '디지털 전환 시대에 맞는 정책 입안 능력 강화',
                level: 'intermediate',
                duration: '3주',
                priority: 85,
                provider: '정책연구원'
            },
            {
                area: '예산 분석',
                description: '정부 예산의 효율적 분석 및 심사 능력 향상',
                level: 'advanced',
                duration: '2주',
                priority: 78,
                provider: '국회예산정책처'
            },
            {
                area: '공공소통',
                description: '시민과의 효과적인 소통 방법론 습득',
                level: 'basic',
                duration: '1주',
                priority: 72,
                provider: '소통교육원'
            }
        ];
    }

    calculateUrgency(area) {
        // 최근 이슈 트렌드를 바탕으로 긴급도 계산
        const trendingTopics = {
            'education': 0.8,
            'environment': 0.9,
            'economy': 0.7,
            'safety': 0.85,
            'welfare': 0.75,
            'transport': 0.6,
            'culture': 0.5,
            'health': 0.8
        };
        
        return trendingTopics[area] || 0.5;
    }

    getRecommendedDeadline(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
    }

    setupUI() {
        // 추천 시스템 액세스 버튼을 사이드바에 추가
        this.addRecommendationButton();
    }

    addRecommendationButton() {
        // 햄버거 메뉴에 AI 추천 메뉴 항목 추가 시도
        const menuContainer = document.querySelector('#sidebarContent nav');
        if (menuContainer && !document.getElementById('aiRecommendationMenu')) {
            const menuItem = document.createElement('a');
            menuItem.id = 'aiRecommendationMenu';
            menuItem.href = '#';
            menuItem.className = 'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-100';
            menuItem.innerHTML = `
                <i class="fas fa-robot w-4 h-4"></i>
                <span data-i18n="navigation.aiRecommendations">AI 추천</span>
            `;
            menuItem.onclick = (e) => {
                e.preventDefault();
                this.showRecommendationModal();
                if (window.app?.closeSidebar) {
                    window.app.closeSidebar();
                }
            };
            
            // 설정 메뉴 앞에 삽입
            const settingsMenu = menuContainer.querySelector('a[onclick*="settings"]');
            if (settingsMenu) {
                menuContainer.insertBefore(menuItem, settingsMenu);
            } else {
                menuContainer.appendChild(menuItem);
            }
        }
    }

    showRecommendationModal() {
        const modalHTML = `
            <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onclick="closeRecommendationModal(event)">
                <div class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-6 border-b">
                        <div>
                            <h2 class="text-xl font-semibold">AI 의정활동 추천</h2>
                            <p class="text-sm text-gray-500 mt-1">개인화된 의정활동 추천을 확인하세요</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="refreshRecommendations()" 
                                    class="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                <i class="fas fa-refresh mr-1"></i> 새로고침
                            </button>
                            <button onclick="closeRecommendationModal()" 
                                    class="p-2 hover:bg-gray-100 rounded-lg">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-6 overflow-y-auto max-h-[60vh]">
                        <!-- 추천 통계 -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <div class="text-2xl font-bold text-blue-600">${this.recommendations.length}</div>
                                <div class="text-sm text-blue-800">총 추천 항목</div>
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg">
                                <div class="text-2xl font-bold text-green-600">${this.recommendations.filter(r => r.priority === 'high').length}</div>
                                <div class="text-sm text-green-800">고우선순위</div>
                            </div>
                            <div class="bg-orange-50 p-4 rounded-lg">
                                <div class="text-2xl font-bold text-orange-600">${this.recommendations.filter(r => this.isDeadlineNear(r.deadline)).length}</div>
                                <div class="text-sm text-orange-800">마감 임박</div>
                            </div>
                        </div>
                        
                        <!-- 추천 목록 -->
                        <div class="space-y-4">
                            ${this.renderRecommendations()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modalsContainer').innerHTML = modalHTML;
        
        // 전역 함수 등록
        window.closeRecommendationModal = (event) => {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('modalsContainer').innerHTML = '';
        };
        
        window.refreshRecommendations = async () => {
            await this.generateRecommendations();
            this.showRecommendationModal(); // 모달 다시 표시
        };
        
        window.acceptRecommendation = (recId) => {
            this.acceptRecommendation(recId);
        };
        
        window.dismissRecommendation = (recId) => {
            this.dismissRecommendation(recId);
        };
    }

    renderRecommendations() {
        return this.recommendations.map(rec => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-2 py-1 text-xs font-medium rounded-full ${this.getCategoryColor(rec.category)}">
                                ${this.categories[rec.category]?.name || rec.category}
                            </span>
                            <span class="text-xs text-gray-500">점수: ${Math.round(rec.score)}</span>
                            ${rec.urgency > 0.7 ? '<span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">긴급</span>' : ''}
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-1">${rec.title}</h3>
                        <p class="text-sm text-gray-600 mb-3">${rec.description}</p>
                        
                        ${rec.action_items ? `
                            <div class="mb-3">
                                <div class="text-xs font-medium text-gray-700 mb-1">권장 액션:</div>
                                <ul class="text-xs text-gray-600 space-y-1">
                                    ${rec.action_items.slice(0, 3).map(item => `<li>• ${item}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${rec.deadline ? `
                            <div class="text-xs text-gray-500">
                                <i class="fas fa-calendar-alt mr-1"></i>
                                권장 완료일: ${new Date(rec.deadline).toLocaleDateString('ko-KR')}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="flex gap-2 ml-4">
                        <button onclick="acceptRecommendation('${rec.id}')" 
                                class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            수락
                        </button>
                        <button onclick="dismissRecommendation('${rec.id}')" 
                                class="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                            무시
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCategoryColor(category) {
        const colors = {
            bills: 'bg-blue-100 text-blue-800',
            meetings: 'bg-green-100 text-green-800',
            complaints: 'bg-orange-100 text-orange-800',
            education: 'bg-purple-100 text-purple-800',
            networking: 'bg-pink-100 text-pink-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    }

    isDeadlineNear(deadline) {
        if (!deadline) return false;
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffDays = (deadlineDate - today) / (1000 * 60 * 60 * 24);
        return diffDays <= 7; // 7일 이내
    }

    acceptRecommendation(recId) {
        const recommendation = this.recommendations.find(r => r.id === recId);
        if (!recommendation) return;
        
        // 활동 히스토리에 추가
        this.activityHistory.unshift({
            date: new Date().toISOString().split('T')[0],
            type: recommendation.type,
            area: recommendation.area || recommendation.category,
            success: true,
            engagement: recommendation.score,
            impact: recommendation.expected_impact || 5,
            from_ai: true
        });
        
        // 추천에서 제거
        this.recommendations = this.recommendations.filter(r => r.id !== recId);
        
        // 저장
        this.saveActivityHistory();
        
        // 알림
        if (window.notificationSystem) {
            window.notificationSystem.createNotification({
                type: 'system',
                category: 'system',
                title: 'AI 추천 수락',
                body: `"${recommendation.title}" 추천을 수락하여 일정에 추가되었습니다.`,
                priority: 'medium'
            });
        }
        
        // 모달 새로고침
        this.showRecommendationModal();
    }

    dismissRecommendation(recId) {
        // 추천에서 제거
        this.recommendations = this.recommendations.filter(r => r.id !== recId);
        
        // 모달 새로고침
        this.showRecommendationModal();
    }

    // 학습 데이터 업데이트
    updateLearningData(activityData) {
        this.activityHistory.unshift(activityData);
        this.saveActivityHistory();
        
        // 모델 재학습
        this.learningModel = {
            preferences: this.analyzePreferences(),
            patterns: this.analyzeTimePatterns(),
            success_factors: this.analyzeSuccessFactors(),
            collaboration_network: this.analyzeCollaborationNetwork()
        };
    }

    // 추천 정확도 측정
    getRecommendationAccuracy() {
        const acceptedRecs = this.activityHistory.filter(a => a.from_ai && a.success);
        const totalAIRecs = this.activityHistory.filter(a => a.from_ai);
        
        return totalAIRecs.length > 0 ? acceptedRecs.length / totalAIRecs.length : 0;
    }

    // 개인화 점수 계산
    getPersonalizationScore() {
        const preferences = this.learningModel.preferences;
        const totalActivities = Object.values(preferences).reduce((sum, p) => sum + p.frequency, 0);
        
        if (totalActivities === 0) return 0;
        
        // 선호도 분산 계산 (낮을수록 특정 분야에 집중)
        const frequencies = Object.values(preferences).map(p => p.frequency / totalActivities);
        const variance = frequencies.reduce((sum, f) => sum + Math.pow(f - 1/frequencies.length, 2), 0) / frequencies.length;
        
        return Math.max(0, 1 - variance * 2); // 0-1 스케일로 정규화
    }

    // 다국어 지원을 위한 번역 추가
    addTranslations() {
        if (window.i18n) {
            window.i18n.addTranslations('ko', 'ai', {
                recommendations: 'AI 추천',
                title: 'AI 의정활동 추천',
                description: '개인화된 의정활동 추천을 확인하세요',
                refresh: '새로고침',
                total: '총 추천 항목',
                high_priority: '고우선순위',
                deadline_near: '마감 임박',
                accept: '수락',
                dismiss: '무시',
                recommended_actions: '권장 액션',
                recommended_deadline: '권장 완료일'
            });
            
            window.i18n.addTranslations('en', 'ai', {
                recommendations: 'AI Recommendations',
                title: 'AI Parliamentary Activity Recommendations',
                description: 'Check your personalized parliamentary activity recommendations',
                refresh: 'Refresh',
                total: 'Total Recommendations',
                high_priority: 'High Priority',
                deadline_near: 'Deadline Near',
                accept: 'Accept',
                dismiss: 'Dismiss',
                recommended_actions: 'Recommended Actions',
                recommended_deadline: 'Recommended Deadline'
            });
        }
    }

    // 정리
    destroy() {
        const menuItem = document.getElementById('aiRecommendationMenu');
        if (menuItem) menuItem.remove();
    }
}

// 전역 인스턴스 생성
window.aiRecommendationSystem = new AIRecommendationSystem();