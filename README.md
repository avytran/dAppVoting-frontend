# 💻 VoteChain Frontend - React Application

VoteChain Frontend là một ứng dụng web phi tập trung (dApp) được xây dựng bằng React.js, cung cấp giao diện người dùng thân thiện và trực quan cho hệ thống bầu cử trên blockchain. Ứng dụng tích hợp thư viện Ethers.js để tương tác trực tiếp với Smart Contract đã được triển khai trên mạng blockchain, đảm bảo tính minh bạch, bảo mật và không thể thay đổi của quá trình bầu cử.

Ứng dụng hỗ trợ hai vai trò chính: cử tri (voter) và quản trị viên (admin). Cử tri có thể kết nối ví MetaMask để tham gia bầu cử, theo dõi kết quả thời gian thực và xem lịch sử hoạt động on-chain. Quản trị viên có quyền thêm/xóa ứng viên và thiết lập thời gian bầu cử. Tất cả giao dịch đều được ghi lại trên blockchain, đảm bảo tính toàn vẹn và có thể kiểm chứng độc lập.

## 📋 Danh sách Chức năng Chi tiết

### Chức năng Cơ bản

- **Kết nối Ví**: Tích hợp MetaMask để xác thực địa chỉ ví của cử tri.
- **Hiển thị ứng viên**: Liệt kê danh sách ứng viên và số phiếu tương ứng lấy từ Blockchain.
- **Bỏ phiếu bảo mật**: Cho phép chọn ứng viên và ký giao dịch qua ví điện tử.
- **Chống Double-vote**: Hệ thống tự động ẩn nút bầu chọn và từ chối giao dịch nếu địa chỉ ví đã bầu.
- **Cập nhật Real-time**: Sử dụng votedEvent để giao diện tự động cập nhật kết quả mà không cần tải lại trang.
- **Kiểm thử tự động**: Viết ít nhất 5 test case (Truffle/Hardhat test) đảm bảo logic contract chính xác.

### Tính năng Mở rộng

Nhóm quyết định thực hiện 4 tính năng nâng cao sau để tối ưu hóa sản phẩm:

- **Quyền Quản trị (Admin/Owner)**: Chỉ ví triển khai hợp đồng mới có quyền thêm hoặc xóa ứng cử viên.
- **Quản lý Thời gian**: Thiết lập startTime và endTime. Hệ thống chỉ mở cổng bầu chọn trong khoảng thời gian này.
- **Biểu đồ trực quan**: Sử dụng Chart.js để hiển thị tỷ lệ phiếu bầu dưới dạng biểu đồ tròn hoặc cột.
- **Lịch sử giao dịch**: Truy xuất dữ liệu từ các event cũ để hiển thị danh sách giao dịch (Transaction Hash, Block number).

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

## Nhóm sinh viên thực hiện
Nhóm E:
1.  Nguyễn Mạc Gia Huy	    MSSV: 31231025016
2.	Nguyễn Nguyên Khuyến 	MSSV: 31231026626
3.	Nguyễn Thị Thiên Nhi	MSSV: 31231023551
4.	Lê Vũ Uyên Phương	    MSSV: 31231025809
5.	Trần Anh Vy			    MSSV: 31231020502

## Giao diện
### Giao diện Dashboard (Cử tri)
<img width="1915" height="950" alt="Screenshot 2026-05-14 210036" src="https://github.com/user-attachments/assets/23d9064e-a8b1-4cb6-94f5-08128122ec21" />

### Giao diện AdminPortal (Quản trị)
<img width="1916" height="957" alt="Screenshot 2026-05-14 210057" src="https://github.com/user-attachments/assets/3ff49155-bc10-42aa-bce6-5a896b8c46a2" />
