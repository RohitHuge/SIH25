# Modular Dashboard System

A comprehensive React + Tailwind modular dashboard system with role-based navigation and card-based UI design.

## 🏗️ Architecture

### Role-Based Structure
- **Uploader Dashboard**: `/dashboard/uploader/*`
- **Verifier Dashboard**: `/dashboard/verifier/*` (ready for implementation)
- **Admin Dashboard**: `/dashboard/admin/*` (ready for implementation)

### File Structure
```
src/
├── dashboard/
│   ├── shared/
│   │   └── Sidebar.jsx          # Reusable sidebar component
│   ├── uploader/
│   │   ├── UploaderDashboard.jsx # Main uploader dashboard
│   │   └── components/
│   │       ├── UploadData.jsx    # File upload with drag & drop
│   │       ├── GenerateQR.jsx    # QR code generation
│   │       ├── MyUploads.jsx     # Upload history table
│   │       └── ProfileSettings.jsx # User profile management
│   ├── verifier/                 # Ready for implementation
│   └── admin/                    # Ready for implementation
```

## 🎨 Features

### Uploader Dashboard Features
1. **📂 Upload Data**
   - Drag & drop file upload (CSV/PDF)
   - Progress tracking with animated loader
   - File validation and error handling
   - Toast notifications for success/failure

2. **🆕 Generate QR for New Degree**
   - Form with student details
   - QR code preview using `qrcode.react`
   - Download functionality
   - Form validation and error handling

3. **📋 My Uploads**
   - Searchable and filterable table
   - Sort by name, date, or status
   - Status indicators (processed, processing, pending, failed)
   - Retry and delete actions

4. **⚙️ Profile & Settings**
   - User profile management
   - Account statistics
   - Security settings
   - Logout functionality

### UI/UX Features
- **Card-based Design**: All sections use modern card layouts
- **Responsive Sidebar**: Collapsible navigation with smooth animations
- **Microinteractions**: Hover effects and smooth transitions using Framer Motion
- **Toast Notifications**: Success/error feedback using React Hot Toast
- **Loading States**: Animated loaders for all async operations
- **Color Scheme**: Green primary, Mango Yellow accents, White background

## 🚀 Getting Started

### 1. Install Dependencies
```bash
# Install required packages
npm install framer-motion qrcode.react react-hot-toast

# Or run the install script
node install-deps.js
```

### 2. Environment Setup
Make sure your `.env` file is configured with Appwrite credentials:
```env
VITE_APPWRITE_PROJECT_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access the Dashboard
- Login with your credentials
- You'll be redirected to `/dashboard/uploader`
- Navigate through different sections using the sidebar

## 🎯 Usage

### Navigation
- **Sidebar**: Collapsible navigation with role-specific menu items
- **Breadcrumbs**: Current page indicator in header
- **Responsive**: Mobile-friendly with collapsible sidebar

### File Upload
1. Go to "Upload Data" section
2. Drag & drop files or click to select
3. Supported formats: CSV, PDF
4. Watch progress bar and get success notification

### QR Code Generation
1. Go to "Generate QR" section
2. Fill in student details
3. Click "Generate QR Code"
4. Preview and download the QR code

### Upload Management
1. Go to "My Uploads" section
2. Search, filter, and sort your uploads
3. Retry failed uploads or delete records

## 🔧 Customization

### Adding New Roles
1. Create new folder in `src/dashboard/[role]/`
2. Implement dashboard component
3. Add role-specific navigation items in `Sidebar.jsx`
4. Update routing in `App.jsx`

### Styling
- Uses Tailwind CSS with custom color scheme
- Card variants defined in each component
- Consistent spacing and typography
- Responsive design patterns

### Animations
- Framer Motion for smooth transitions
- Hover effects on interactive elements
- Loading states with spinners
- Page transitions between sections

## 📱 Responsive Design

- **Mobile**: Collapsible sidebar, stacked cards
- **Tablet**: Optimized layout with proper spacing
- **Desktop**: Full sidebar, multi-column layouts

## 🛠️ Technical Details

### Dependencies
- **React**: Functional components with hooks
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animations and transitions
- **React Hot Toast**: Notifications
- **QRCode React**: QR code generation
- **React Router**: Navigation and routing

### State Management
- React Context for authentication
- Local state for component-specific data
- Mock data for demonstration purposes

### Error Handling
- Try-catch blocks for async operations
- User-friendly error messages
- Toast notifications for feedback
- Graceful fallbacks for failed operations

## 🔮 Future Enhancements

### Ready for Implementation
- **Verifier Dashboard**: Document verification workflow
- **Admin Dashboard**: User management and system settings
- **Real API Integration**: Replace mock data with actual API calls
- **File Processing**: Backend integration for file processing
- **User Roles**: Dynamic role-based access control

### Potential Features
- Real-time notifications
- Advanced file processing
- Bulk operations
- Export functionality
- Advanced search and filtering
- Audit logs
- System analytics

## 🐛 Troubleshooting

### Common Issues
1. **Dependencies not installed**: Run `node install-deps.js`
2. **Environment variables**: Check `.env` file configuration
3. **Routing issues**: Ensure all routes are properly defined
4. **Styling issues**: Check Tailwind CSS configuration

### Debug Mode
- Check browser console for errors
- Verify network requests in DevTools
- Check component state in React DevTools

## 📄 License

This project is part of the Sih25 application suite.
