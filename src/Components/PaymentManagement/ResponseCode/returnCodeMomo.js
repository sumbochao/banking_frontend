const ReturnCodeMomo = {
  '0': 'Thành công',
  '3': 'Thông tin tài khoản không tồn tại',
  '7': 'Không có quyền truy cập',
  '17': 'Số tiền không đủ để giao dịch',
  '45': 'Lỗi hệ thống. Request timeout',
  '46': 'Số tiền vượt quá phạm vi',
  '68': 'Không được hỗ trợ (refund)',
  '103': 'Hủy giao dịch treo tiền',
  '151': 'Số tiền thanh toán phải nằm trong khoảng 1,000 đến 20,000,000',
  '153': 'Giải mã hash thất bại',
  '161': 'Vướng hạn mức thanh toán. Yêu cầu cài đặt lại hạn mức trên app MoMo',
  '162': 'Mã thanh toán (Payment Code) đã được sử dụng',
  '204': 'Số tiền sai định dạng',
  '208': 'Thông tin đối tác không tồn tại hoặc chưa kích hoạt',
  '210': 'Hệ thống đang bảo trì',
  '400': 'Giao dịch không tồn tại (khi gọi hoàn tất giao dịch)',
  '403': 'Không có quyền truy cập (khi kết nối với MoMo)',
  '404': 'Request không được hỗ trợ',
  '1001': 'Tài khoản không đủ tiền đề giao dịch',
  '1002': 'Giao dịch đã được khôi phục',
  '1004': 'Tài khoản đã hết hạn mức giao dịch trong ngày',
  '1006': 'Hệ thống xảy ra lỗi',
  '1012': 'Tài khoản đã bị khóa',
  '1013': 'Xác thực hết hạn',
  '1014': 'Mật khẩu hoặc mã thanh toán không chính xác',
  '2119': 'Không lấy được thông tin khuyến mãi',
  '2125': 'Không thể hoàn tiền giao dịch',
  '2126': 'Dữ liệu đối tác chưa được cấu hình',
  '2128': 'Request ID đã tồn tại',
  '2129': 'Chữ ký (signature) không khớp',
  '2131': 'Đơn hàng chưa được khởi tạo hoặc đã quá hạn',
  '2132': 'Đơn hàng bị từ chối do Mã giao dịch đã tồn tại',
  '2133': 'Hệ thống không thể xử lý yêu cầu thanh toán',
  '2135': 'Giao dịch thất bại từ phía đối tác',
  '2400': 'Dữ liệu truyền vào bị sai định dạng',
  '9000': 'Giao dịch đang được xử lý',
  '9043':
    'Tài khoản người dùng cần phải liên kết ngân hàng (theo quy định của ngân hàng nhà nước)'
};
export default ReturnCodeMomo;
