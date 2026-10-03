# TEDx Mazhar Zorlu Intercom

Etkinlik günü ekip içi iletişim için hazırlanmış, hesap/kayıt istemeyen PWA + WebRTC + PHP push-to-talk interkom.

## Özellikler
- intercom.tedxmazharzorlu.com için tasarlanmıştır.
- İsim + rol ile geçici katılım; yönetici rolü sunucuda yönetici koduyla doğrulanır.
- ANA KANAL silinemez; yöneticiler özel kanal oluşturup silebilir.
- Basılı tutarak konuşma, tek aktif konuşmacı ve 180 saniye sunucu/client sınırı.
- Yönetici aktif konuşmacıyı devralabilir.
- Konuşma isteği kuyruğu.
- Ses WebRTC ile doğrudan cihazlar arasında; PHP polling yalnızca signaling/durum içindir.
- PWA kurulumu, Service Worker ve uygun cihazlarda yerel bildirim.
- Mikrofon boşta sürekli açık tutulmaz; yalnızca PTT sırasında yayın akışı başlatılır.

## Mimari
Hostinger üzerindeki PHP API kanal durumunun tek otoritesidir. flock() ile durum ve signaling JSON dosyalarına eşzamanlı yazmalar kilitlenir. Aktif konuşmacı doğrudan diğer istemcilere WebRTC ile ses gönderir. Shared hosting uyumluluğu için WebSocket yerine kısa polling kullanılır.

20–25 kişilik, tek aktif konuşmacılı etkinlik senaryosu hedeflenmiştir. Bazı mobil NAT koşullarında TURN relay gerekebilir.

## Kurulum
1. Hostinger'da intercom.tedxmazharzorlu.com alt alanını aç ve document root'u bu projeye bağla.
2. PHP 8.x kullan.
3. data klasörünün PHP tarafından yazılabilir olduğundan emin ol.
4. TEDX_INTERCOM_ADMIN_CODE adlı güçlü bir ortam değişkeni tanımla. Hostinger'da ortam değişkeni kullanamıyorsan api.php içindeki yapılandırmayı hosting yöntemine göre değiştir.
5. HTTPS aç.
6. /api.php?op=health adresinde ok=true gör.
7. Chrome/Safari üzerinden aç ve destekleniyorsa ana ekrana PWA olarak kur.

## Platform sınırı
Web uygulaması işletim sisteminin gerçek overlay penceresini, ekran kapalıyken mikrofonun sınırsız sürdürülmesini veya her cihazda kesintisiz arka plan çalışma garantisini veremez. PWA kurulum, bildirim ve Wake Lock yalnızca platformun izin verdiği ölçüde kullanılabilir.

## Test
npm run verify; statik kontrolleri, JS syntax kontrolünü, Node testlerini, PHP state testlerini ve PHP HTTP smoke testini çalıştırır. Gerçek fiziksel mikrofon/hoparlör ve farklı GSM/Wi-Fi NAT koşullarında E2E ses testi bu geliştirme ortamında yapılamadı; etkinlikten önce Android + iPhone ile gerçek cihaz testi yapılmalıdır.

## Güvenlik
Tam kimlik doğrulama sistemi değildir. Yönetici kodunu güçlü ve etkinlik bazlı tut. data klasörü web erişimine kapalıdır. HTTPS zorunludur.

## Dosyalar
index.html, styles.css, app.js, api.php, server/IntercomState.php, sw.js, manifest.webmanifest, data/, tests/.

