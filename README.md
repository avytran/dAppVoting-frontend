# 💻 VoteChain Frontend - React Application

Giao diện người dùng được xây dựng bằng React.js, tích hợp Ethers.js để tương tác trực tiếp với Smart Contract đã deploy.

## 🛠 Cài đặt

1. Di chuyển vào thư mục frontend:
   ```bash
   cd front-end
   npm install
   ```

2. Cấu hình biến môi trường (.env)

Tạo file `.env` tại thư mục gốc của frontend dựa trên `.env.example` và cấu hình như sau:

```env
# Địa chỉ contract nhận được sau khi chạy lệnh deploy ở backend
VITE_VOTING_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3

# Địa chỉ ví của Account #0 (Admin) để truy cập quyền quản trị
VITE_ADMIN_ADDRESS=0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
```

3. Khởi chạy ứng dụng

```bash
npm run dev
```

Ứng dụng thường sẽ chạy tại: `http://localhost:5173`

## 💡 Lưu ý khi sử dụng

- Kết nối ví: Đảm bảo MetaMask của bạn đang chọn mạng Hardhat Local (đã cấu hình ở backend).
- Quyền Admin: Chỉ khi bạn đăng nhập bằng ví có địa chỉ trùng với `VITE_ADMIN_ADDRESS`, hệ thống mới hiển thị các tính năng:
  - Thêm ứng viên
  - Xóa ứng viên
  - Thiết lập thời gian bầu cử
- Đồng bộ hóa: Nếu bạn deploy lại contract mới, bạn PHẢI cập nhật lại `VITE_VOTING_CONTRACT_ADDRESS` trong file `.env` và khởi động lại server React.

## 📂 Các thư mục chính

- `src/abis`: Chứa file `Voting.json` (định nghĩa ABI và các hàm của contract).
- `src/utils/web3.js`: Chứa logic kết nối với Ethers.js.
- `src/pages`: Chứa giao diện `Dashboard` (Cử tri) và `AdminPortal` (Quản trị).
