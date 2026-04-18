const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Course Platform API',
      version: '1.0.0',
      description: 'API documentation for the Online Course Platform',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', example: 'password123' },
            role: { type: 'string', enum: ['Instructor', 'Student'], example: 'Student' }
          }
        },
        Course: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Introduction to React' },
            description: { type: 'string', example: 'Learn React from scratch' },
            category: { type: 'string', example: 'Programming' }
          }
        },
        Lesson: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Getting Started' },
            content: { type: 'string', example: 'Lesson content goes here' },
            videoUrl: { type: 'string', example: 'https://youtube.com/watch?v=...' },
            courseId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            order: { type: 'integer', example: 1 }
          }
        },
        Enrollment: {
          type: 'object',
          properties: {
            courseId: { type: 'string', example: '507f1f77bcf86cd799439011' }
          }
        },
        Comment: {
          type: 'object',
          properties: {
            lessonId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            content: { type: 'string', example: 'Great lesson!' }
          }
        },
        Rating: {
          type: 'object',
          properties: {
            courseId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 }
          }
        },
        Progress: {
          type: 'object',
          properties: {
            lessonId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            completed: { type: 'boolean', example: true }
          }
        }
      }
    },
    paths: {
      '/auth/register': {
        post: {
          tags: ['Authentication'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          responses: {
            201: {
              description: 'User registered successfully',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    data: {
                      _id: '507f1f77bcf86cd799439011',
                      name: 'John Doe',
                      email: 'john@example.com',
                      role: 'Student',
                      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                    }
                  }
                }
              }
            },
            400: { description: 'Bad request - User already exists' }
          }
        }
      },
      '/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'Login user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'john@example.com' },
                    password: { type: 'string', example: 'password123' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    data: {
                      _id: '507f1f77bcf86cd799439011',
                      name: 'John Doe',
                      email: 'john@example.com',
                      role: 'Student',
                      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                    }
                  }
                }
              }
            },
            401: { description: 'Invalid credentials' }
          }
        }
      },
      '/courses': {
        get: {
          tags: ['Courses'],
          summary: 'Get all courses',
          parameters: [
            { name: 'id', in: 'query', schema: { type: 'string' }, description: 'Filter by course ID' },
            { name: 'instructorId', in: 'query', schema: { type: 'string' }, description: 'Filter by instructor ID' },
            { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Filter by category' },
            { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search in title and description' }
          ],
          responses: {
            200: {
              description: 'List of courses',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    count: 2,
                    data: [
                      { _id: '507f1f77bcf86cd799439011', title: 'React Course', description: 'Learn React', category: 'Programming', instructorId: { _id: '...', name: 'John' } }
                    ]
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Courses'],
          summary: 'Create a new course (Instructor only)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Course' }
              }
            }
          },
          responses: {
            201: { description: 'Course created successfully' },
            403: { description: 'Not authorized - Instructor role required' }
          }
        }
      },
      '/courses?id={id}': {
        put: {
          tags: ['Courses'],
          summary: 'Update a course (Instructor only)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'query', required: true, schema: { type: 'string' }, description: 'Course ID' }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Course' }
              }
            }
          },
          responses: {
            200: { description: 'Course updated successfully' },
            403: { description: 'Not authorized' },
            404: { description: 'Course not found' }
          }
        },
        delete: {
          tags: ['Courses'],
          summary: 'Delete a course (Instructor only)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'query', required: true, schema: { type: 'string' }, description: 'Course ID' }
          ],
          responses: {
            200: { description: 'Course deleted successfully' },
            403: { description: 'Not authorized' },
            404: { description: 'Course not found' }
          }
        }
      },
      '/lessons': {
        get: {
          tags: ['Lessons'],
          summary: 'Get all lessons or by course',
          parameters: [
            { name: 'courseId', in: 'query', schema: { type: 'string' }, description: 'Filter by course ID' }
          ],
          responses: {
            200: {
              description: 'List of lessons',
              content: {
                'application/json': {
                  example: { success: true, count: 5, data: [] }
                }
              }
            }
          }
        },
        post: {
          tags: ['Lessons'],
          summary: 'Create a new lesson (Instructor only)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Lesson' }
              }
            }
          },
          responses: {
            201: { description: 'Lesson created successfully' },
            403: { description: 'Not authorized' }
          }
        }
      },
      '/lessons?id={id}': {
        put: {
          tags: ['Lessons'],
          summary: 'Update a lesson (Instructor only)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'query', required: true, schema: { type: 'string' }, description: 'Lesson ID' }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Lesson' }
              }
            }
          },
          responses: {
            200: { description: 'Lesson updated successfully' },
            403: { description: 'Not authorized' },
            404: { description: 'Lesson not found' }
          }
        },
        delete: {
          tags: ['Lessons'],
          summary: 'Delete a lesson (Instructor only)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'query', required: true, schema: { type: 'string' }, description: 'Lesson ID' }
          ],
          responses: {
            200: { description: 'Lesson deleted successfully' },
            403: { description: 'Not authorized' },
            404: { description: 'Lesson not found' }
          }
        }
      },
      '/enrollments': {
        post: {
          tags: ['Enrollments'],
          summary: 'Enroll in a course',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Enrollment' }
              }
            }
          },
          responses: {
            201: { description: 'Enrolled successfully' },
            400: { description: 'Already enrolled or course not found' }
          }
        },
        get: {
          tags: ['Enrollments'],
          summary: 'Get enrollments',
          parameters: [
            { name: 'userId', in: 'query', schema: { type: 'string' }, description: 'Filter by user ID' }
          ],
          responses: {
            200: {
              description: 'List of enrollments',
              content: {
                'application/json': {
                  example: { success: true, count: 3, data: [] }
                }
              }
            }
          }
        }
      },
      '/comments': {
        get: {
          tags: ['Comments'],
          summary: 'Get comments by lesson',
          parameters: [
            { name: 'lessonId', in: 'query', schema: { type: 'string' }, description: 'Filter by lesson ID' }
          ],
          responses: {
            200: {
              description: 'List of comments',
              content: {
                'application/json': {
                  example: { success: true, count: 10, data: [] }
                }
              }
            }
          }
        },
        post: {
          tags: ['Comments'],
          summary: 'Create a comment',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Comment' }
              }
            }
          },
          responses: {
            201: { description: 'Comment created successfully' }
          }
        }
      },
      '/comments?id={id}': {
        delete: {
          tags: ['Comments'],
          summary: 'Delete a comment',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'query', required: true, schema: { type: 'string' }, description: 'Comment ID' }
          ],
          responses: {
            200: { description: 'Comment deleted successfully' },
            403: { description: 'Not authorized' },
            404: { description: 'Comment not found' }
          }
        }
      },
      '/ratings': {
        post: {
          tags: ['Ratings'],
          summary: 'Rate a course',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Rating' }
              }
            }
          },
          responses: {
            201: { description: 'Rating submitted successfully' },
            400: { description: 'Invalid rating value' }
          }
        },
        get: {
          tags: ['Ratings'],
          summary: 'Get ratings for a course',
          parameters: [
            { name: 'courseId', in: 'query', schema: { type: 'string' }, description: 'Filter by course ID' }
          ],
          responses: {
            200: {
              description: 'List of ratings with average',
              content: {
                'application/json': {
                  example: { success: true, count: 5, average: 4.2, data: [] }
                }
              }
            }
          }
        }
      },
      '/progress': {
        post: {
          tags: ['Progress'],
          summary: 'Update lesson progress',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Progress' }
              }
            }
          },
          responses: {
            200: { description: 'Progress updated successfully' }
          }
        },
        get: {
          tags: ['Progress'],
          summary: 'Get user progress',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'userId', in: 'query', schema: { type: 'string' }, description: 'Filter by user ID (optional)' }
          ],
          responses: {
            200: {
              description: 'List of progress entries',
              content: {
                'application/json': {
                  example: { success: true, count: 10, data: [] }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;