// Enhanced Real-time Notification System with WebSocket-style Features
Object.assign(window.app, {
    // 고급 실시간 알림 시스템
    advancedNotificationSystem: {
        // 연결 상태
        connectionStatus: {
            connected: false,
            reconnecting: false,
            lastHeartbeat: null,
            reconnectAttempts: 0,
            maxReconnectAttempts: 5
        },

        // 알림 큐 및 히스토리
        notificationQueue: [],
        notificationHistory: [],
        unreadCount: 0,
        maxHistorySize: 50,

        // 알림 설정
        settings: {
            enableSound: true,
            enableVibration: true,
            enableDesktop: true,
            autoMarkRead: false,
            displayDuration: 5000
        },

        // 초기화
        initialize: function() {
            this.setupEventListeners();
            this.requestDesktopPermission();
            this.startConnectionMonitoring();
            this.loadSettings();
            console.log('🔔 Advanced Notification System initialized');
        },

        // 연결 모니터링 시작
        startConnectionMonitoring: function() {
            this.connectionStatus.connected = true;
            this.startHeartbeat();
            this.simulateRealTimeEvents();
        },

        // 하트비트 시작
        startHeartbeat: function() {
            setInterval(() => {
                this.connectionStatus.lastHeartbeat = new Date();
                // 가끔 연결 끊어짐 시뮬레이션
                if (Math.random() < 0.05) { // 5% 확률
                    this.simulateConnectionLoss();
                }
            }, 30000); // 30초마다
        },

        // 실시간 이벤트 시뮬레이션
        simulateRealTimeEvents: function() {
            // 새 민원 알림
            setInterval(() => {
                if (this.connectionStatus.connected && Math.random() < 0.3) {
                    this.addNotification({
                        type: 'complaint_new',
                        priority: 'normal',
                        title: '새로운 민원 접수',
                        message: this.generateComplaintMessage(),
                        icon: 'fa-comment-alt',
                        color: 'blue',
                        actions: [
                            { text: '확인', action: 'viewComplaint' },
                            { text: '무시', action: 'dismiss' }
                        ]
                    });
                }
            }, 45000); // 45초마다 체크

            // 긴급 민원 알림
            setInterval(() => {
                if (this.connectionStatus.connected && Math.random() < 0.1) {
                    this.addNotification({
                        type: 'complaint_urgent',
                        priority: 'high',
                        title: '🚨 긴급 민원 발생',
                        message: '즉시 처리가 필요한 민원이 접수되었습니다.',
                        icon: 'fa-exclamation-triangle',
                        color: 'red',
                        persistent: true,
                        actions: [
                            { text: '즉시 처리', action: 'handleUrgent' },
                            { text: '위임', action: 'delegate' }
                        ]
                    });
                }
            }, 180000); // 3분마다 체크

            // GPS 위치 업데이트 알림
            setInterval(() => {
                if (this.connectionStatus.connected && window.app.locationService?.isTracking && Math.random() < 0.4) {
                    this.addNotification({
                        type: 'location_update',
                        priority: 'low',
                        title: '위치 업데이트',
                        message: '새로운 활동 지역이 감지되었습니다.',
                        icon: 'fa-map-marker-alt',
                        color: 'green',
                        autoClose: true,
                        actions: [
                            { text: '활동 기록', action: 'recordActivity' }
                        ]
                    });
                }
            }, 120000); // 2분마다 체크

            // 시스템 상태 알림
            setInterval(() => {
                if (this.connectionStatus.connected && Math.random() < 0.2) {
                    this.addNotification({
                        type: 'system_status',
                        priority: 'low',
                        title: '시스템 상태',
                        message: this.generateSystemMessage(),
                        icon: 'fa-cog',
                        color: 'gray',
                        autoClose: true
                    });
                }
            }, 300000); // 5분마다 체크
        },

        // 연결 끊어짐 시뮬레이션
        simulateConnectionLoss: function() {
            this.connectionStatus.connected = false;
            this.connectionStatus.reconnecting = true;
            
            this.addNotification({
                type: 'connection_lost',
                priority: 'high',
                title: '⚠️ 연결 끊어짐',
                message: '서버와의 연결이 끊어졌습니다. 재연결을 시도합니다.',
                icon: 'fa-wifi',
                color: 'orange',
                persistent: true
            });

            this.attemptReconnection();
        },

        // 재연결 시도
        attemptReconnection: function() {
            const reconnectDelay = Math.min(1000 * Math.pow(2, this.connectionStatus.reconnectAttempts), 30000);
            
            setTimeout(() => {
                this.connectionStatus.reconnectAttempts++;
                
                if (this.connectionStatus.reconnectAttempts <= this.connectionStatus.maxReconnectAttempts) {
                    // 재연결 성공 시뮬레이션 (80% 확률)
                    if (Math.random() < 0.8) {
                        this.onReconnectionSuccess();
                    } else {
                        this.attemptReconnection();
                    }
                } else {
                    this.onReconnectionFailed();
                }
            }, reconnectDelay);
        },

        // 재연결 성공
        onReconnectionSuccess: function() {
            this.connectionStatus.connected = true;
            this.connectionStatus.reconnecting = false;
            this.connectionStatus.reconnectAttempts = 0;

            this.addNotification({
                type: 'connection_restored',
                priority: 'normal',
                title: '✅ 연결 복구됨',
                message: '서버와의 연결이 복구되었습니다.',
                icon: 'fa-wifi',
                color: 'green',
                autoClose: true
            });
        },

        // 재연결 실패
        onReconnectionFailed: function() {
            this.connectionStatus.reconnecting = false;
            
            this.addNotification({
                type: 'connection_failed',
                priority: 'high',
                title: '❌ 연결 실패',
                message: '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.',
                icon: 'fa-exclamation-circle',
                color: 'red',
                persistent: true,
                actions: [
                    { text: '재시도', action: 'retryConnection' },
                    { text: '오프라인 모드', action: 'goOffline' }
                ]
            });
        },

        // 알림 추가
        addNotification: function(notification) {
            const notificationData = {
                id: Date.now() + Math.random(),
                timestamp: new Date(),
                read: false,
                ...notification
            };

            this.notificationQueue.unshift(notificationData);
            this.notificationHistory.unshift(notificationData);
            this.unreadCount++;

            // 히스토리 크기 제한
            if (this.notificationHistory.length > this.maxHistorySize) {
                this.notificationHistory = this.notificationHistory.slice(0, this.maxHistorySize);
            }

            this.displayNotification(notificationData);
            this.updateNotificationBadge();
            this.triggerNotificationEffects(notificationData);

            // 자동 닫기 설정된 알림 처리
            if (notificationData.autoClose) {
                setTimeout(() => {
                    this.removeNotification(notificationData.id);
                }, this.settings.displayDuration);
            }
        },

        // 알림 표시
        displayNotification: function(notification) {
            const toast = document.createElement('div');
            toast.className = `notification-toast notification-${notification.priority} fixed top-4 right-4 z-50 max-w-sm animate-in slide-in-from-right-full`;
            toast.dataset.notificationId = notification.id;

            const colorClasses = {
                red: 'bg-red-50 border-red-200 text-red-800',
                orange: 'bg-orange-50 border-orange-200 text-orange-800',
                blue: 'bg-blue-50 border-blue-200 text-blue-800',
                green: 'bg-green-50 border-green-200 text-green-800',
                gray: 'bg-gray-50 border-gray-200 text-gray-800'
            };

            toast.innerHTML = `
                <div class="toast border-2 ${colorClasses[notification.color] || colorClasses.blue}">
                    <div class="flex items-start space-x-3 p-4">
                        <div class="flex-shrink-0">
                            <i class="fas ${notification.icon} text-lg ${this.getIconColor(notification.color)}"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-medium">${notification.title}</div>
                            <div class="text-xs mt-1 opacity-90">${notification.message}</div>
                            <div class="text-xs mt-1 opacity-70">${notification.timestamp.toLocaleTimeString('ko-KR')}</div>
                            
                            ${notification.actions ? `
                                <div class="flex gap-2 mt-3">
                                    ${notification.actions.map(action => `
                                        <button onclick="app.advancedNotificationSystem.handleAction('${action.action}', '${notification.id}')" 
                                                class="btn btn-outline btn-sm text-xs">
                                            ${action.text}
                                        </button>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        
                        ${!notification.persistent ? `
                            <button onclick="app.advancedNotificationSystem.removeNotification('${notification.id}')" 
                                    class="flex-shrink-0 text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times text-xs"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;

            document.body.appendChild(toast);

            // 애니메이션 효과
            setTimeout(() => {
                toast.classList.add('animate-in', 'fade-in-0', 'zoom-in-95');
            }, 100);

            // 자동 제거 (지속적이지 않은 알림만)
            if (!notification.persistent) {
                setTimeout(() => {
                    this.removeNotification(notification.id);
                }, this.settings.displayDuration);
            }
        },

        // 아이콘 색상 클래스 반환
        getIconColor: function(color) {
            const iconColors = {
                red: 'text-red-600',
                orange: 'text-orange-600',
                blue: 'text-blue-600',
                green: 'text-green-600',
                gray: 'text-gray-600'
            };
            return iconColors[color] || iconColors.blue;
        },

        // 알림 제거
        removeNotification: function(notificationId) {
            const toast = document.querySelector(`[data-notification-id="${notificationId}"]`);
            if (toast) {
                toast.classList.add('animate-out', 'slide-out-to-right-full');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }

            // 큐에서 제거
            this.notificationQueue = this.notificationQueue.filter(n => n.id !== notificationId);
        },

        // 알림 액션 처리
        handleAction: function(action, notificationId) {
            const notification = this.notificationHistory.find(n => n.id == notificationId);
            
            switch(action) {
                case 'viewComplaint':
                    window.app.loadCivilPage();
                    break;
                case 'handleUrgent':
                    window.app.loadComplaintList('긴급');
                    break;
                case 'delegate':
                    window.app.showNotification('민원이 담당 부서로 위임되었습니다.');
                    break;
                case 'recordActivity':
                    window.app.showNewActivityModal();
                    break;
                case 'retryConnection':
                    this.connectionStatus.reconnectAttempts = 0;
                    this.attemptReconnection();
                    break;
                case 'goOffline':
                    this.enableOfflineMode();
                    break;
                case 'dismiss':
                    break;
            }

            // 알림을 읽음으로 표시
            if (notification) {
                notification.read = true;
                this.unreadCount = Math.max(0, this.unreadCount - 1);
                this.updateNotificationBadge();
            }

            this.removeNotification(notificationId);
        },

        // 알림 효과 트리거
        triggerNotificationEffects: function(notification) {
            // 사운드 재생
            if (this.settings.enableSound && notification.priority === 'high') {
                this.playNotificationSound(notification.type);
            }

            // 진동 (모바일)
            if (this.settings.enableVibration && 'vibrate' in navigator) {
                const vibrationPattern = notification.priority === 'high' ? [100, 50, 100, 50, 100] : [100];
                navigator.vibrate(vibrationPattern);
            }

            // 데스크톱 알림
            if (this.settings.enableDesktop && notification.priority === 'high') {
                this.showDesktopNotification(notification);
            }
        },

        // 사운드 재생
        playNotificationSound: function(type) {
            // Web Audio API를 사용한 사운드 생성
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // 알림 유형에 따른 사운드 패턴
            const soundPatterns = {
                complaint_urgent: { frequency: 800, duration: 200 },
                complaint_new: { frequency: 600, duration: 150 },
                location_update: { frequency: 400, duration: 100 },
                connection_lost: { frequency: 300, duration: 300 }
            };

            const pattern = soundPatterns[type] || soundPatterns.complaint_new;
            
            oscillator.frequency.setValueAtTime(pattern.frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + pattern.duration / 1000);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + pattern.duration / 1000);
        },

        // 데스크톱 알림 표시
        showDesktopNotification: function(notification) {
            if (Notification.permission === 'granted') {
                const desktopNotification = new Notification(notification.title, {
                    body: notification.message,
                    icon: '/images/logo.png',
                    tag: notification.id,
                    requireInteraction: notification.persistent
                });

                desktopNotification.onclick = () => {
                    window.focus();
                    if (notification.actions && notification.actions[0]) {
                        this.handleAction(notification.actions[0].action, notification.id);
                    }
                    desktopNotification.close();
                };

                // 자동 닫기
                if (!notification.persistent) {
                    setTimeout(() => {
                        desktopNotification.close();
                    }, this.settings.displayDuration);
                }
            }
        },

        // 데스크톱 권한 요청
        requestDesktopPermission: function() {
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        },

        // 알림 배지 업데이트
        updateNotificationBadge: function() {
            const badge = document.getElementById('notificationBadge');
            if (badge) {
                if (this.unreadCount > 0) {
                    badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            }
        },

        // 오프라인 모드 활성화
        enableOfflineMode: function() {
            this.connectionStatus.connected = false;
            window.app.showNotification('오프라인 모드로 전환되었습니다. 일부 기능이 제한됩니다.', 'warning');
        },

        // 이벤트 리스너 설정
        setupEventListeners: function() {
            // 페이지 가시성 변경 감지
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible' && this.unreadCount > 0) {
                    // 페이지가 다시 보일 때 읽지 않은 알림 표시
                    this.showUnreadNotificationsSummary();
                }
            });

            // 온라인/오프라인 상태 감지
            window.addEventListener('online', () => {
                if (!this.connectionStatus.connected) {
                    this.onReconnectionSuccess();
                }
            });

            window.addEventListener('offline', () => {
                this.simulateConnectionLoss();
            });
        },

        // 읽지 않은 알림 요약 표시
        showUnreadNotificationsSummary: function() {
            if (this.unreadCount === 0) return;

            const content = `
                <div class="space-y-4">
                    <div class="text-center">
                        <div class="text-lg font-bold">${this.unreadCount}개의 읽지 않은 알림</div>
                        <div class="text-sm text-muted-foreground">부재 중 받은 알림입니다</div>
                    </div>
                    
                    <div class="max-h-64 overflow-y-auto space-y-2">
                        ${this.notificationHistory
                            .filter(n => !n.read)
                            .slice(0, 5)
                            .map(n => `
                                <div class="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                                    <i class="fas ${n.icon} ${this.getIconColor(n.color)}"></i>
                                    <div class="flex-1">
                                        <div class="text-sm font-medium">${n.title}</div>
                                        <div class="text-xs text-muted-foreground">${n.timestamp.toLocaleTimeString('ko-KR')}</div>
                                    </div>
                                </div>
                            `).join('')}
                    </div>
                </div>
            `;

            window.app.showModal('unread-notifications', {
                title: '읽지 않은 알림',
                content: content,
                confirmText: '모두 읽음',
                cancelText: '닫기',
                onConfirm: () => {
                    this.markAllAsRead();
                }
            });
        },

        // 모든 알림을 읽음으로 표시
        markAllAsRead: function() {
            this.notificationHistory.forEach(n => n.read = true);
            this.unreadCount = 0;
            this.updateNotificationBadge();
            window.app.closeModal();
        },

        // 설정 로드
        loadSettings: function() {
            const savedSettings = localStorage.getItem('notificationSettings');
            if (savedSettings) {
                this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            }
        },

        // 설정 저장
        saveSettings: function() {
            localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
        },

        // 메시지 생성 함수들
        generateComplaintMessage: function() {
            const messages = [
                '도로 포트홀 관련 민원이 접수되었습니다.',
                '가로등 고장 신고가 들어왔습니다.',
                '소음 관련 민원이 등록되었습니다.',
                '환경 개선 요청이 접수되었습니다.',
                '교통 신호 관련 민원이 들어왔습니다.'
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        },

        generateSystemMessage: function() {
            const messages = [
                '시스템이 정상 동작 중입니다.',
                '데이터베이스 백업이 완료되었습니다.',
                '보안 업데이트가 적용되었습니다.',
                '서버 성능이 최적화되었습니다.',
                '새로운 기능이 업데이트되었습니다.'
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        }
    },

    // 알림 시스템 초기화 (앱 시작 시 호출)
    initAdvancedNotifications: function() {
        if (!this.advancedNotificationSystem.initialized) {
            this.advancedNotificationSystem.initialize();
            this.advancedNotificationSystem.initialized = true;
        }
    }
});