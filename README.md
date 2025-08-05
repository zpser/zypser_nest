# Zypser NestJS Application

A modern, scalable backend application built with NestJS framework.

## 🚀 Features

- **NestJS Framework**: Built with TypeScript and follows NestJS best practices
- **Modular Architecture**: Clean, maintainable code structure
- **TypeScript**: Full TypeScript support for better development experience
- **RESTful APIs**: RESTful API design with proper HTTP status codes
- **Database Integration**: Ready for database integration (PostgreSQL, MongoDB, etc.)
- **Authentication**: JWT-based authentication system
- **Validation**: Request validation using class-validator
- **Testing**: Unit and e2e testing setup
- **Documentation**: API documentation with Swagger/OpenAPI

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git**

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zypser_nest
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Database Setup** (if applicable)
   ```bash
   # Set up your database connection
   # Update database configuration in .env file
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run start:dev
# or
yarn start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
# or
yarn build
yarn start:prod
```

### Debug Mode
```bash
npm run start:debug
# or
yarn start:debug
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
# or
yarn test
```

### E2E Tests
```bash
npm run test:e2e
# or
yarn test:e2e
```

### Test Coverage
```bash
npm run test:cov
# or
yarn test:cov
```

## 📚 API Documentation

Once the application is running, you can access the API documentation at:

- **Swagger UI**: `http://localhost:3000/api`
- **OpenAPI JSON**: `http://localhost:3000/api-json`

## 🏗️ Project Structure

```
src/
├── app.controller.ts          # Main application controller
├── app.service.ts            # Main application service
├── app.module.ts             # Root application module
├── main.ts                   # Application entry point
├── modules/                  # Feature modules
│   ├── auth/                # Authentication module
│   ├── users/               # Users module
│   └── ...
├── common/                   # Shared utilities
│   ├── decorators/          # Custom decorators
│   ├── filters/             # Exception filters
│   ├── guards/              # Guards
│   ├── interceptors/        # Interceptors
│   └── pipes/               # Pipes
├── config/                   # Configuration files
└── database/                 # Database related files
    ├── entities/            # Database entities
    ├── migrations/          # Database migrations
    └── seeds/               # Database seeds
```

## 🔧 Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/zypser_db

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1d

# Redis (if using)
REDIS_URL=redis://localhost:6379

# External APIs
API_KEY=your-api-key
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build Docker image
docker build -t zypser-nest .

# Run Docker container
docker run -p 3000:3000 zypser-nest
```

### Environment Variables for Production
Make sure to set appropriate environment variables for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release
- **v1.1.0** - Added authentication features
- **v1.2.0** - Enhanced API documentation

---

**Built with ❤️ using NestJS** 