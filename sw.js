// Service Worker for 경기도의회 의원 의정활동 관리시스템
// PWA 오프라인 기능 및 캐싱 관리

const CACHE_NAME = 'ggc-member-v1.2.0';
const STATIC_CACHE = 'ggc-static-v1.2.0';
const DYNAMIC_CACHE = 'ggc-dynamic-v1.2.0';

// 캐시할 정적 자원들
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/js/app-core.js',
  '/js/app-modals.js',
  '/js/app-calendar.js',
  '/js/app-location-enhanced.js',
  '/js/app-pages.js',
  '/js/app-civil.js',
  '/js/contacts-data.js',
  '/js/app-contacts-new.js',
  '/js/app-main-location.js',
  '/js/app-location-stats-display.js',
  '/js/app-location-stats-updater.js',
  '/js/app-location-data-fix.js',
  '/js/app-location-force-reload.js',
  '/js/app-location-init.js',
  '/js/app-location-complete-fix.js',
  '/js/app-location-certificate.js',
  '/lib/utils.js'
  // CDN 자원들은 CORS 정책으로 인해 직접 캐싱하지 않음
  // 브라우저가 자동으로 캐싱 처리
];

// 오프라인 페이지 HTML
const OFFLINE_HTML = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>오프라인 - 경기도의회</title>
    <style>
        body { 
            font-family: 'Noto Sans KR', sans-serif; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            height: 100vh; 
            margin: 0; 
            background: linear-gradient(135deg, #003d7a, #0056b3);
            color: white;
            text-align: center;
            padding: 20px;
        }
        .offline-icon { font-size: 4rem; margin-bottom: 1rem; }
        .offline-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
        .offline-message { opacity: 0.8; margin-bottom: 2rem; }
        .retry-btn { 
            background: rgba(255,255,255,0.2); 
            border: 2px solid white; 
            color: white; 
            padding: 12px 24px; 
            border-radius: 8px; 
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        .retry-btn:hover { background: rgba(255,255,255,0.3); }
    </style>
</head>
<body>
    <div class="offline-icon">📡</div>
    <h1 class="offline-title">오프라인 상태</h1>
    <p class="offline-message">인터넷 연결을 확인해주세요.<br>캐시된 데이터로 일부 기능을 사용할 수 있습니다.</p>
    <button class="retry-btn" onclick="window.location.reload()">다시 시도</button>
    
    <script>
        // 온라인 상태 감지
        window.addEventListener('online', function() {
            window.location.reload();
        });
    </script>
</body>
</html>
`;

// 서비스 워커 설치
self.addEventListener('install', event => {
  console.log('[SW] 서비스 워커 설치 중...');
  
  event.waitUntil(
    Promise.all([
      // 정적 자원 캐시
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] 정적 자원 캐싱 중...');
        return cache.addAll(STATIC_ASSETS);
      }),
      // 오프라인 페이지 캐시
      caches.open(CACHE_NAME).then(cache => {
        return cache.put('/offline.html', new Response(OFFLINE_HTML, {
          headers: { 'Content-Type': 'text/html' }
        }));
      })
    ]).then(() => {
      console.log('[SW] 캐싱 완료');
      self.skipWaiting();
    })
  );
});

// 서비스 워커 활성화
self.addEventListener('activate', event => {
  console.log('[SW] 서비스 워커 활성화');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] 이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] 캐시 정리 완료');
      return self.clients.claim();
    })
  );
});

// 네트워크 요청 가로채기 (캐시 우선 전략)
self.addEventListener('fetch', event => {
  // Chrome Extension 및 비-HTTP(S) 요청 필터링
  if (!event.request.url.startsWith('http://') && !event.request.url.startsWith('https://')) {
    return;
  }
  
  // Chrome Extension 요청 무시
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }
  
  // 네비게이션 요청 처리
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request.clone())
        .then(response => {
          // 응답이 성공적이고 HTTP(S)인 경우에만 캐싱
          if (response.status === 200 &&
              (event.request.url.startsWith('http://') || event.request.url.startsWith('https://'))) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(event.request, responseClone).catch(err => {
                console.log('[SW] 네비게이션 캐싱 실패:', err);
              });
            });
          }
          return response;
        })
        .catch(() => {
          // 네트워크 실패시 캐시에서 찾기
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // 캐시에도 없으면 오프라인 페이지 제공
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // API 요청 처리 (네트워크 우선)
  if (event.request.url.includes('/api/') || event.request.url.includes('api.')) {
    event.respondWith(
      fetch(event.request.clone())
        .then(response => {
          // API 응답 캐싱 (POST는 제외, HTTP(S)만)
          if (response.status === 200 && 
              event.request.method === 'GET' &&
              (event.request.url.startsWith('http://') || event.request.url.startsWith('https://'))) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(event.request, responseClone).catch(err => {
                console.log('[SW] API 캐싱 실패:', err);
              });
            });
          }
          return response;
        })
        .catch(() => {
          // API 실패시 캐시에서 찾기 (GET만)
          if (event.request.method === 'GET') {
            return caches.match(event.request);
          }
          // POST 등은 네트워크 오류 반환
          return new Response(
            JSON.stringify({ 
              error: '오프라인 상태에서는 이 작업을 수행할 수 없습니다.',
              offline: true 
            }),
            { 
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
    return;
  }

  // 일반 자원 요청 (캐시 우선)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // 캐시에 없으면 네트워크에서 가져오기
        return fetch(event.request.clone())
          .then(response => {
            // 응답이 유효하고 HTTP(S) 프로토콜인 경우에만 캐싱
            if (response.status === 200 && 
                event.request.method === 'GET' &&
                (event.request.url.startsWith('http://') || event.request.url.startsWith('https://'))) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE).then(cache => {
                // chrome-extension 등 특수 스키마는 캐싱하지 않음
                if (!event.request.url.includes('chrome-extension')) {
                  cache.put(event.request, responseClone).catch(err => {
                    console.log('[SW] 캐싱 실패:', err);
                  });
                }
              });
            }
            return response;
          })
          .catch(() => {
            // 이미지나 폰트 등 실패시 기본 응답
            if (event.request.destination === 'image') {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" text-anchor="middle" fill="#9ca3af" font-family="Arial" font-size="14">이미지 로드 실패</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' }}
              );
            }
            throw new Error('네트워크 요청 실패');
          });
      })
  );
});

// 백그라운드 동기화 (향후 구현 예정)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('[SW] 백그라운드 동기화 실행');
    event.waitUntil(doBackgroundSync());
  }
});

// 푸시 알림 처리
self.addEventListener('push', event => {
  console.log('[SW] 푸시 알림 수신:', event.data?.text());
  
  const options = {
    body: event.data?.text() || '새로운 의정활동 알림이 있습니다.',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    tag: 'ggc-notification',
    data: {
      url: '/?notification=true'
    },
    actions: [
      {
        action: 'view',
        title: '확인',
        icon: '/images/logo.png'
      },
      {
        action: 'dismiss',
        title: '닫기'
      }
    ],
    requireInteraction: true,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification('경기도의회 알림', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  }
});

// 백그라운드 동기화 함수 (향후 구현)
async function doBackgroundSync() {
  try {
    // 오프라인 중 저장된 데이터 동기화
    const pendingRequests = await getPendingRequests();
    
    for (const request of pendingRequests) {
      try {
        await fetch(request.url, request.options);
        await removePendingRequest(request.id);
      } catch (error) {
        console.log('[SW] 동기화 실패:', error);
      }
    }
  } catch (error) {
    console.log('[SW] 백그라운드 동기화 오류:', error);
  }
}

// 보류 중인 요청 관리 함수들 (향후 구현)
async function getPendingRequests() {
  // IndexedDB에서 보류 중인 요청들 가져오기
  return [];
}

async function removePendingRequest(id) {
  // IndexedDB에서 완료된 요청 제거
  return true;
}

// 캐시 크기 관리
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxItems) {
    // 가장 오래된 항목들 삭제
    const keysToDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

// 주기적 캐시 정리
setInterval(() => {
  limitCacheSize(DYNAMIC_CACHE, 100);
}, 60000); // 1분마다 실행