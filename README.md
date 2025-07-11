# 📚 SmartEdu - Nền tảng học tập trực tuyến thông minh

Nền tảng học tập trực tuyến với AI Assistant, quản lý khóa học, yêu thích và lịch sử xem.

## ✨ Tính năng chính

- 🏠 **Trang chủ**: Hiển thị khóa học nổi bật, danh mục, thống kê
- 📚 **Danh sách khóa học**: Tìm kiếm, lọc, phân trang
- ❤️ **Yêu thích**: Quản lý khóa học yêu thích với bulk actions
- 📈 **Lịch sử xem**: Theo dõi khóa học đã xem
- 🤖 **AI Assistant**: Chatbot gợi ý khóa học phù hợp
- 🌙 **Dark mode**: Hỗ trợ theme sáng/tối
- 📱 **Responsive**: Tối ưu cho mọi thiết bị

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **UI Library**: Radix UI + Tailwind CSS 4
- **Routing**: React Router v7
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Linting**: ESLint + Prettier

## 📋 Yêu cầu hệ thống

- **Node.js**: v18.0.0 hoặc cao hơn
- **npm**: v8.0.0 hoặc cao hơn
- **Git**: Để clone repository

## 🚀 Hướng dẫn cài đặt và chạy

### 1. Clone repository

```bash
git clone https://github.com/Tandu2003/smart-edu.git
cd smart-edu
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:5173

### 4. Build cho production

```bash
npm run build
```

Files được build sẽ được tạo trong thư mục `dist/`

### 5. Preview build production

```bash
npm run preview
```

## 📝 Scripts có sẵn

| Script                 | Mô tả                                  |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Chạy development server với hot reload |
| `npm run build`        | Build ứng dụng cho production          |
| `npm run preview`      | Preview build production locally       |
| `npm run lint`         | Chạy ESLint để check code              |
| `npm run format`       | Format code với Prettier               |
| `npm run format:check` | Check format code                      |

## 📁 Cấu trúc dự án

```
smart-edu/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, data mocks
│   │   └── data/          # Mock data (courses, AI responses)
│   ├── components/        # React components
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   ├── layout/        # Layout components
│   │   ├── home/          # Home page components
│   │   ├── course/        # Course-related components
│   │   ├── favorites/     # Favorites components
│   │   └── chatbot/       # AI Chatbot components
│   ├── contexts/          # React Context providers
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   │   ├── course.ts      # Course-related types
│   │   ├── context.ts     # Context interfaces
│   │   ├── components.ts  # Component props types
│   │   └── general.ts     # General types
│   ├── lib/               # Utility functions
│   └── main.tsx           # App entry point
├── package.json
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## 🎨 Cấu hình Theme

Dự án hỗ trợ dark mode với `next-themes`. Theme được quản lý tự động theo:

- System preference
- User selection
- Local storage persistence

## 📱 Responsive Design

Ứng dụng được tối ưu cho các kích thước màn hình:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Development Tips

### Hot Reload

Development server hỗ trợ hot reload cho:

- React components
- CSS/Tailwind changes
- TypeScript changes

### Type Safety

Dự án sử dụng TypeScript strict mode với:

- Tất cả components được type
- Props interfaces riêng biệt
- Context types đầy đủ

### Code Quality

- ESLint với React rules
- Prettier cho code formatting
- Husky pre-commit hooks (nếu setup)

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify

```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Traditional Hosting

```bash
npm run build
# Upload dist/ folder content to web server
```

## 🐛 Troubleshooting

### Port đã được sử dụng

```bash
# Thay đổi port trong vite.config.ts hoặc
npm run dev -- --port 3000
```

### Node modules issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Check types
npx tsc --noEmit
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License.

## 👥 Liên hệ

- **GitHub**: [Tandu2003](https://github.com/Tandu2003)
- **Project Repository**: [smart-edu](https://github.com/Tandu2003/smart-edu)

---

**Happy coding! 🎉**
