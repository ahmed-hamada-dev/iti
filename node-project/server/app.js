const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const errorHandler = require('./middlewares/errorMiddleware');

const authRoutes = require('./features/auth/auth.route');
const courseRoutes = require('./features/course/course.route');
const lessonRoutes = require('./features/lesson/lesson.route');
const chapterRoutes = require('./features/chapter/chapter.route');
const enrollmentRoutes = require('./features/enrollment/enrollment.route');
const commentRoutes = require('./features/comment/comment.route');
const ratingRoutes = require('./features/rating/rating.route');
const progressRoutes = require('./features/progress/progress.route');

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/progress', progressRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use(errorHandler);

module.exports = app;