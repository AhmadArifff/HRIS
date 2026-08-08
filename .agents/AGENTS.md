# Workspace Rules & Guidelines for HRIS Project

## Team Collaboration & Git Workflow Policy
- **Mandatory Git Pull Before Push**: Karena proyek ini dikembangkan secara kolaboratif bersama tim, sebelum melakukan aksi `git push` ke *remote repository* (`origin`), AI Assistant **WAJIB SELALU** menjalankan `git pull` atau `git pull origin <branch>` (misalnya `git pull origin dev`) terlebih dahulu untuk mengambil dan mengintegrasikan *commit* terbaru dari anggota tim.
- **Commit Message Convention**: Menggunakan format Conventional Commits (`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`).
- **PRD Synchronization**: Setiap pembaruan arsitektur, modul UI, atau alur aplikasi wajib disinkronkan ke dokumen `PRD.md`.
