// 실시간 알림 시스템
// 푸시 알림, 인앱 알림, 실시간 업데이트 관리

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.subscribers = new Map();
        this.pushSubscription = null;
        this.notificationQueue = [];
        this.isInitialized = false;
        
        // 알림 설정
        this.settings = {
            pushEnabled: true,
            soundEnabled: true,
            vibrationEnabled: true,
            inAppEnabled: true,
            categories: {
                meeting: { enabled: true, priority: 'high' },
                bill: { enabled: true, priority: 'medium' },
                complaint: { enabled: true, priority: 'medium' },
                schedule: { enabled: true, priority: 'low' },
                system: { enabled: true, priority: 'high' }
            }
        };
        
        this.init();
    }

    async init() {
        try {
            await this.loadSettings();
            await this.setupPushNotifications();
            this.setupInAppNotifications();
            this.setupEventListeners();
            this.startMockDataGeneration(); // 실제 환경에서는 실제 데이터 소스 연결
            this.isInitialized = true;
            console.log('알림 시스템 초기화 완료');
        } catch (error) {
            console.error('알림 시스템 초기화 실패:', error);
        }
    }

    // 설정 로드
    async loadSettings() {
        const saved = localStorage.getItem('notificationSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }

    // 설정 저장
    saveSettings() {
        localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
    }

    // 푸시 알림 설정
    async setupPushNotifications() {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            console.log('푸시 알림이 지원되지 않습니다.');
            return;
        }

        try {
            const registration = await navigator.serviceWorker.ready;
            
            // 푸시 구독 확인
            this.pushSubscription = await registration.pushManager.getSubscription();
            
            if (!this.pushSubscription && this.settings.pushEnabled) {
                await this.requestPushPermission();
            }
        } catch (error) {
            console.error('푸시 알림 설정 실패:', error);
        }
    }

    // 푸시 알림 권한 요청
    async requestPushPermission() {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
            try {
                const registration = await navigator.serviceWorker.ready;
                
                // VAPID 키 (실제 운영에서는 서버에서 생성된 키 사용)
                const vapidKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HdNQNKCGCMj8fHnYUl4HzpEW_9nHSgLh4CrfBM3o4F2aBe8E1H_lnOh-CI';
                
                this.pushSubscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array(vapidKey)
                });
                
                // 서버에 구독 정보 전송 (실제 환경)
                await this.sendSubscriptionToServer(this.pushSubscription);
                
                console.log('푸시 알림 구독 완료');
            } catch (error) {
                console.error('푸시 알림 구독 실패:', error);
            }
        } else {
            console.log('푸시 알림 권한 거부됨');
            this.settings.pushEnabled = false;
            this.saveSettings();
        }
    }

    // VAPID 키 변환
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
        
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    // 서버에 구독 정보 전송
    async sendSubscriptionToServer(subscription) {
        // 실제 환경에서는 서버 API 호출
        try {
            const response = await fetch('/api/push-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.app?.authToken}`
                },
                body: JSON.stringify({
                    subscription: subscription,
                    memberId: window.app?.memberData?.memberId
                })
            });
            
            if (!response.ok) {
                throw new Error('구독 정보 전송 실패');
            }
        } catch (error) {
            console.error('구독 정보 전송 실패:', error);
            // 오프라인 또는 개발 환경에서는 로컬 저장
            localStorage.setItem('pushSubscription', JSON.stringify(subscription));
        }
    }

    // 인앱 알림 설정
    setupInAppNotifications() {
        // 알림 컨테이너 생성
        if (!document.getElementById('notificationContainer')) {
            const container = document.createElement('div');
            container.id = 'notificationContainer';
            container.className = 'fixed top-16 right-4 z-50 space-y-2 max-w-sm';
            document.body.appendChild(container);
        }

        // 알림 카운터 업데이트
        this.updateNotificationBadge();
    }

    // 이벤트 리스너 설정
    setupEventListeners() {
        // 포커스 이벤트 (앱이 활성화될 때 알림 처리)
        window.addEventListener('focus', () => {
            this.handleAppFocus();
        });

        // 온라인/오프라인 상태 변경
        window.addEventListener('online', () => {
            this.syncOfflineNotifications();
        });

        // 알림 클릭 이벤트
        document.addEventListener('click', (e) => {
            if (e.target.closest('.notification-item')) {
                this.handleNotificationClick(e.target.closest('.notification-item'));
            }
        });
    }

    // 알림 생성
    createNotification(data) {
        const notification = {
            id: this.generateId(),
            timestamp: new Date(),
            read: false,
            ...data
        };

        // 중복 알림 방지
        const existing = this.notifications.find(n => 
            n.type === notification.type && 
            n.title === notification.title && 
            (Date.now() - new Date(n.timestamp).getTime()) < 60000 // 1분 내 중복
        );

        if (existing) {
            console.log('중복 알림 방지:', notification.title);
            return null;
        }

        this.notifications.unshift(notification);
        
        // 최대 100개 알림 유지
        if (this.notifications.length > 100) {
            this.notifications = this.notifications.slice(0, 100);
        }

        this.saveNotifications();
        this.processNotification(notification);
        
        return notification;
    }

    // 알림 처리
    async processNotification(notification) {
        const category = this.settings.categories[notification.category] || 
                        this.settings.categories.system;

        if (!category.enabled) {
            console.log('비활성화된 카테고리 알림:', notification.category);
            return;
        }

        // 인앱 알림 표시
        if (this.settings.inAppEnabled && document.hasFocus()) {
            this.showInAppNotification(notification);
        }

        // 푸시 알림 전송 (백그라운드 또는 포커스 없을 때)
        if (this.settings.pushEnabled && (!document.hasFocus() || notification.forceShow)) {
            await this.sendPushNotification(notification);
        }

        // 소리/진동
        this.playNotificationEffects(notification);

        // 알림 카운터 업데이트
        this.updateNotificationBadge();

        // 구독자에게 알림
        this.notifySubscribers('newNotification', notification);
    }

    // 인앱 알림 표시
    showInAppNotification(notification) {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const element = document.createElement('div');
        element.className = `notification-item bg-white border border-gray-200 rounded-lg shadow-lg p-4 transform transition-all duration-300 translate-x-full opacity-0`;
        element.dataset.notificationId = notification.id;

        const priorityColor = this.getPriorityColor(notification.priority);
        
        element.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-full ${priorityColor} flex items-center justify-center text-white">
                        <i class="${this.getNotificationIcon(notification.type)}"></i>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                        <h4 class="text-sm font-semibold text-gray-900 truncate">${notification.title}</h4>
                        <button onclick="notificationSystem.dismissInAppNotification('${notification.id}')" 
                                class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">${notification.body}</p>
                    <p class="text-xs text-gray-400 mt-2">${this.formatTime(notification.timestamp)}</p>
                </div>
            </div>
        `;

        container.appendChild(element);

        // 애니메이션 효과
        setTimeout(() => {
            element.classList.remove('translate-x-full', 'opacity-0');
        }, 10);

        // 자동 제거 (중요도에 따라)
        const duration = notification.priority === 'high' ? 8000 : 5000;
        setTimeout(() => {
            this.dismissInAppNotification(notification.id);
        }, duration);
    }

    // 인앱 알림 제거
    dismissInAppNotification(notificationId) {
        const element = document.querySelector(`[data-notification-id="${notificationId}"]`);
        if (element) {
            element.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => element.remove(), 300);
        }
    }

    // 푸시 알림 전송
    async sendPushNotification(notification) {
        if (!this.pushSubscription) return;

        try {
            // 실제 환경에서는 서버를 통해 푸시 전송
            const response = await fetch('/api/send-push', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.app?.authToken}`
                },
                body: JSON.stringify({
                    subscription: this.pushSubscription,
                    notification: {
                        title: `경기도의회 - ${notification.title}`,
                        body: notification.body,
                        icon: '/images/icon-192x192.png',
                        badge: '/images/icon-72x72.png',
                        tag: notification.id,
                        data: {
                            url: notification.url || '/',
                            notificationId: notification.id
                        }
                    }
                })
            });

            if (!response.ok) {
                throw new Error('푸시 알림 전송 실패');
            }
        } catch (error) {
            console.error('푸시 알림 전송 실패:', error);
            
            // 개발 환경 또는 오프라인: 브라우저 알림 사용
            if (Notification.permission === 'granted') {
                new Notification(`경기도의회 - ${notification.title}`, {
                    body: notification.body,
                    icon: '/images/icon-192x192.png',
                    tag: notification.id,
                    data: notification
                });
            }
        }
    }

    // 알림 효과 (소리/진동)
    playNotificationEffects(notification) {
        // 소리
        if (this.settings.soundEnabled) {
            this.playNotificationSound(notification.priority);
        }

        // 진동
        if (this.settings.vibrationEnabled && 'vibrate' in navigator) {
            const pattern = notification.priority === 'high' ? [200, 100, 200] : [100];
            navigator.vibrate(pattern);
        }
    }

    // 알림 소리
    playNotificationSound(priority) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // 우선순위에 따른 음높이
            const frequency = priority === 'high' ? 800 : priority === 'medium' ? 600 : 400;
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.warn('알림 소리 재생 실패:', error);
        }
    }

    // 알림 목록 가져오기
    getNotifications(filter = {}) {
        let filtered = [...this.notifications];

        if (filter.unreadOnly) {
            filtered = filtered.filter(n => !n.read);
        }

        if (filter.category) {
            filtered = filtered.filter(n => n.category === filter.category);
        }

        if (filter.limit) {
            filtered = filtered.slice(0, filter.limit);
        }

        return filtered;
    }

    // 알림 읽음 처리
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateNotificationBadge();
            this.notifySubscribers('notificationRead', notification);
        }
    }

    // 모든 알림 읽음 처리
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.saveNotifications();
        this.updateNotificationBadge();
        this.notifySubscribers('allNotificationsRead');
    }

    // 알림 삭제
    deleteNotification(notificationId) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        this.saveNotifications();
        this.updateNotificationBadge();
        this.notifySubscribers('notificationDeleted', notificationId);
    }

    // 알림 배지 업데이트
    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.querySelector('.notification-badge');
        
        if (badge) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount.toString();
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }

        // PWA 앱 배지 (지원되는 경우)
        if ('setAppBadge' in navigator) {
            navigator.setAppBadge(unreadCount);
        }
    }

    // 구독자 관리
    subscribe(event, callback) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    }

    unsubscribe(event, callback) {
        if (this.subscribers.has(event)) {
            const callbacks = this.subscribers.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    notifySubscribers(event, data) {
        if (this.subscribers.has(event)) {
            this.subscribers.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('구독자 콜백 오류:', error);
                }
            });
        }
    }

    // 데이터 저장/로드
    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    loadNotifications() {
        const saved = localStorage.getItem('notifications');
        if (saved) {
            this.notifications = JSON.parse(saved);
        }
    }

    // 유틸리티 함수들
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getPriorityColor(priority) {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-orange-500';
            case 'low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'meeting': return 'fas fa-calendar';
            case 'bill': return 'fas fa-file-alt';
            case 'complaint': return 'fas fa-envelope';
            case 'schedule': return 'fas fa-clock';
            case 'system': return 'fas fa-info-circle';
            default: return 'fas fa-bell';
        }
    }

    formatTime(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;

        if (diff < 60000) return '방금 전';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
        
        return time.toLocaleDateString('ko-KR', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // 앱 포커스 처리
    handleAppFocus() {
        // 앱이 활성화되면 인앱 알림 정리
        const container = document.getElementById('notificationContainer');
        if (container) {
            container.innerHTML = '';
        }
    }

    // 오프라인 알림 동기화
    async syncOfflineNotifications() {
        try {
            // 서버에서 놓친 알림 가져오기
            const response = await fetch('/api/notifications/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.app?.authToken}`
                },
                body: JSON.stringify({
                    lastSync: localStorage.getItem('lastNotificationSync')
                })
            });

            if (response.ok) {
                const data = await response.json();
                data.notifications.forEach(notification => {
                    this.createNotification(notification);
                });
                localStorage.setItem('lastNotificationSync', new Date().toISOString());
            }
        } catch (error) {
            console.error('알림 동기화 실패:', error);
        }
    }

    // 알림 클릭 처리
    handleNotificationClick(element) {
        const notificationId = element.dataset.notificationId;
        const notification = this.notifications.find(n => n.id === notificationId);
        
        if (notification) {
            this.markAsRead(notificationId);
            
            if (notification.url && window.app?.navigateTo) {
                window.app.navigateTo(notification.url);
            }
            
            this.dismissInAppNotification(notificationId);
        }
    }

    // 모의 데이터 생성 (개발/테스트용)
    startMockDataGeneration() {
        if (!window.location.hostname.includes('localhost') && 
            !window.location.hostname.includes('127.0.0.1')) {
            return; // 프로덕션에서는 실행하지 않음
        }

        const mockNotifications = [
            {
                type: 'meeting',
                category: 'meeting',
                title: '기획재정위원회 회의',
                body: '10:00 본회의장에서 기획재정위원회 회의가 시작됩니다.',
                priority: 'high',
                url: 'attendance'
            },
            {
                type: 'bill',
                category: 'bill',
                title: '새로운 의안 발의',
                body: '교육 예산 증액에 관한 조례 개정안이 발의되었습니다.',
                priority: 'medium',
                url: 'bill-proposal'
            },
            {
                type: 'complaint',
                category: 'complaint',
                title: '새로운 민원 접수',
                body: '도로 보수에 관한 민원이 접수되었습니다.',
                priority: 'medium',
                url: 'civil-complaint'
            },
            {
                type: 'schedule',
                category: 'schedule',
                title: '일정 알림',
                body: '내일 지역구 현장 방문 일정이 있습니다.',
                priority: 'low',
                url: 'home'
            }
        ];

        // 개발 환경에서 주기적으로 모의 알림 생성
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% 확률
                const mock = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
                this.createNotification({
                    ...mock,
                    body: `${mock.body} (${new Date().toLocaleTimeString()})`
                });
            }
        }, 30000); // 30초마다
    }
}

// 전역 인스턴스 생성
window.notificationSystem = new NotificationSystem();