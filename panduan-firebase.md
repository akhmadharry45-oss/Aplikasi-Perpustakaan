# Panduan menghubungkan Pustaka (GitHub Pages) ke Firebase

Aplikasi: Perpustakaan SD Negeri 1 Barabai Timur. Design by Akhmad Fitra Harry, S.Pd

Setelah langkah ini selesai, data tersimpan online dan petugas masuk dengan email dan kata sandi.
Sebelum bagian PUSTAKA_FIREBASE diisi, file index.html tetap berjalan dengan data di peramban.

1. Buat proyek: buka console.firebase.google.com, klik Add project, beri nama (misalnya perpustakaan-sdn1-barabai-timur). Google Analytics boleh dimatikan.
2. Buat database: menu Build > Firestore Database > Create database. Pilih lokasi asia-southeast2 (Jakarta), mode production.
3. Pasang aturan: di Firestore, buka tab Rules, ganti isinya dengan aturan di bawah, lalu klik Publish.
4. Aktifkan login: menu Build > Authentication > Get started > Sign-in method > Email/Password > Enable.
5. Buat akun petugas: Authentication > Users > Add user. Isi email dan kata sandi untuk tiap petugas.
6. Ambil konfigurasi: klik ikon roda gigi > Project settings > Your apps > ikon web (</>) > daftarkan aplikasi > salin isi firebaseConfig.
7. Tempel ke file: buka index.html, cari PUSTAKA_FIREBASE di bagian atas, isi apiKey, authDomain, projectId, storageBucket, messagingSenderId, dan appId. Simpan, lalu unggah ulang ke GitHub.
8. Buka alamat GitHub Pages, masuk dengan akun petugas. Di menu Admin, isi Email akun login pada petugas agar nama tampil di Riwayat.

## Aturan Firestore (hanya petugas yang sudah masuk boleh membaca dan menulis)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Memindahkan data lama

Di versi lokal: menu Admin > Unduh Cadangan. Setelah versi online jalan: menu Admin > Pulihkan dari File.

## Jika ada masalah

- Status "Akses ditolak" di pojok atas: aturan Firestore belum dipasang atau salah (langkah 3).
- "Email atau kata sandi salah": akun belum dibuat atau Email/Password belum diaktifkan (langkah 4 dan 5).
- Pesan auth/unauthorized-domain: di Authentication > Settings > Authorized domains, tambahkan namaanda.github.io.
- Paket gratis (Spark) biasanya cukup untuk satu sekolah. Pantau pemakaian di tab Usage pada Firestore.
