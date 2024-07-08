# Project Title

Project Hub

## Overview

Project Hub is a project planning and management app designed to streamline your workflow and enhance team collaboration.

### Problem

In today's fast-paced business environment, project managers and teams often face significant challenges in organizing and executing projects efficiently. Common issues include disorganized task management. Therefore, a need exists for a comprehensive, user-friendly platform that bridges these gaps and enhances team collaboration, project visibility, and task management within a unified, intuitive interface.

### User Profile

- Project Managers:
  - Create a project, add team members
  - Create tasks, assign tasks
- Team Members:
  - Create tasks, update task status

### Features

- As a user, I want to be able to create an account.
- As a user, I want to be able to log in and log out of the application
- As a logged in user, I want to be able to create a project.
- As a logged in user (project creator), I want to be able to add team members to a project.
- As a logged in user, I want to be able to create tasks in a project that I am a part of.
- As a logged in user, I want to be able to assign created tasks to myself or other team members.

## Implementation

### Tech Stack

- React
- Nodejs
- MySql
- Express
- Client libraries:
  - react
  - react-router
  - sass
  - tailwindcss
  - axios
- Server libraries:
  - knex
  - express
  - bcrypt
  - jwt

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Home page
- Login page
- Signup page
- Project list page
- Add Project page
- Project page

### Mockups

### Home Page

![](./mockups/landing.png)
![](./mockups/landing2.png)

### Login Page

![](./mockups/login.png)

### Signup Page

![](./mockups/signup.png)

### Project list page

![](./mockups/projectList.png)

### Add Project Page

![](./mockups/addProject.png)

### Project Page

![](./mockups/project.png)
![](./mockups/project2.png)
![](./mockups/project3.png)
![](./mockups/project4.png)

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.
![](./mockups/data.png)

### Endpoints

**POST /auth/login**

- Login user

Parameters:

- Request body:
  - email: User email - required
  - password: User password - required

Response:

```
{
  "message": "Login Successfull",
  "user" : {
      "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
      "firstName": "Jane",
      "lastName": "Doe"
    },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

**POST /auth/signup**

- Create user account

Parameters:

- Request body:
  - firstName: User first name - required
  - lastName: User last name - required
  - email: User email - required
  - password: User password - required

Response:

```
{
  "message": "Sign up Successfull",
  "user" : {
      "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
      "firstName": "Jane",
      "lastName": "Doe"
    },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

**GET /users**

- Get user list

Parameters:

- Authorization header: Bearer Token - required
- Query parameters:
  - email: User email
  - name: User firstName or lastName

Response:

```
[
  {
    "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
    "firstName": "Jane",
    "lastName": "Doe"
  }
  ...
]
```

**GET /projects**

- Get logged in user project list

Parameters:

- Authorization header: Bearer Token - required

Response:

```
[
  {
    "id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
    "title": "instock",
    "description": "",
    "manager_id" : "3312c711-65ff-427e-af6d-b767f429c3e5",
    "team" : [
      {
        "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
        "firstName": "Jane",
        "lastName": "Doe",
        "role": "manager"
      },
      {
       "id": "4312c821-65fg-437e-af1d-b466f120c2b8",
        "firstName": "Kate",
        "lastName": "Smith",
        "role: "member"
      }
    ]

  },
  ...

]
```

**POST /projects**

- Create a project

Parameters:

- Authorization header: Bearer Token - required
- Request body:
  - title: project title - required
  - description: project description
  - team members: array of userids

Response:

```
{
  "message": "Project added successfully",
  "project": {
    "id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
    "title": "instock",
    "description": "",
    "manager_id" : "3312c711-65ff-427e-af6d-b767f429c3e5",
    "team" : [
      {
        "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
        "firstName": "Jane",
        "lastName": "Doe",
        "role": "manager"
      },
      {
        "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
        "firstName": "Kate",
        "lastName": "Smith",
        "role": "member"
      }
    ]
  }
}

```

**GET /projects/:id**

- Get single project data

Parameters:

- Authorization header: Bearer Token - required
- project id route parameter - required

Response:

```
{
  "id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
  "title": "instock",
  "description": "",
  "manager_id" : "3312c711-65ff-427e-af6d-b767f429c3e5",
  "team" : [
    {
      "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
      "firstName": "Jane",
      "lastName": "Doe",
      "role": "manager"
    },
    {
      "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
      "firstName": "Kate",
      "lastName": "Smith",
      "role": "member"
    }
  ],
  "tasks": [
    {
      "id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
      "title" : "Create Header",
      "description": "",
      "user": {
        "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
        "firstName": "John",
        "lastName": "Doe"
      },
      "project_id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
      "status": "to do"
    },
    ...
  ]
}
```

**PUT /projects/:id**

- Update a project

Parameters:

- Authorization header: Bearer Token - required
- project id route parameter - required
- Request body:
  - title: project title - required
  - description: project description
  - team members: array of userids

Response:

```
{
  "message": "Project updated successfully",
  "project": {
    "id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
    "title": "instock",
    "description": "",
    "manager_id" : "3312c711-65ff-427e-af6d-b767f429c3e5",
    "team" : [
      {
        "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
        "firstName": "Jane",
        "lastName": "Doe",
        "role": "manager"
      },
      {
        "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
        "firstName": "Kate",
        "lastName": "Smith",
        "role": "member"
      }
    ]
  }
}
```

**GET /projects/:id/tasks**

- Get project tasks

Parameters:

- Authorization header: Bearer Token - required
- project id route parameter - required

Response:

```
[
  {
    "id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
    "title" : "Create Header",
    "description": "",
    "user": {
      "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
      "firstName": "John",
      "lastName": "Doe"
    },
    "project_id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
    "status": "to do"
  },
  ...
]

```

**POST /projects/:id/tasks**

- Add a task

Parameters:

- Authorization header: Bearer Token - required
- project id route parameter - required
- Request body:
  - title: task title - required
  - description: task description
  - user_id: id of user assigned
  - status: task status

Response:

```
[
  {
    "id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
    "title" : "Create Header",
    "description": "",
    "user": {
      "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
      "firstName": "John",
      "lastName": "Doe"
    },
    "project_id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
    "status": "to do"
  },
  ...
]

```

**PUT /projects/:projectId/tasks/:taskId**

- Update a task

Parameters:

- Authorization header: Bearer Token - required
- project id route parameter - required
- task id route parameter - required
- Request body:
  - title: task title - required
  - description: task description
  - user_id: id of user assigned
  - status: task status

Response:

```
{
  message: "Task updated successfully",
  task: {
    "id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
    "title" : "Create Header",
    "description": "",
    "user": {
      "id": "3312c711-65ff-427e-af6d-b767f429c3e5",
      "firstName": "John",
      "lastName": "Doe"
    },
    "project_id": "b4200cac-e736-4c16-8b77-a98ec3af6515",
    "status": "in progress"
  }
}

```

**DELETE /projects/:projectId/tasks/:id**

- Delete a task

Parameters:

- Authorization header: Bearer Token - required
- project id route parameter - required
- task id route parameter - required

Response:

```
no content

```

### Auth

- Server (JWT)
  - Token will be sent as part of response for /signup and /login routes
  - A middleware will handle token retrieval from the authorization header during requests
- Client
  - Token will be stored in localStorage and removed when a user logs out
  - Token will be sent as authorization header for all requests except /signup and /login
  - Utilize local and global state management to display logged in/out UI

## Roadmap

- Create Client
  - React project with routes, components and pages

- Create server
  - Express project with routing

- Create Migrations

- Create seeds

- Feature: Auth

  - Create POST /auth/login
  - Create POST /auth/signup
  - Implement JWT auth
  - Implement login on client
  - Implement signup on client
  - Implement logout on client

- Feature: Project List

  - Create GET /projects
  - Implement Project list on client

- Feature: Create Project

  - Create POST /projects
  - Create GET /users
  - Implement Create Project on client

- Feature: Update Project

  - Create PUT /projects/:id
  - Implement Update Project on client

- Feature: Task List

  - Create GET /projects/:id/tasks
  - Implement Display Tasks on client

- Feature: Create Tasks

  - Create POST /projects/:id/tasks
  - Implement Create Task on client

- Feature: Update Task

  - Create PUT /projects/:projectId/tasks/:taskId
  - Implement Update Task on client

- Feature: Delete Task

  - Create PUT /projects/:projectId/tasks/:taskId
  - Implement Delete Task on client

- Manual Testing and Bug Fixes

## Nice-to-haves

- Set priorities, deadlines for projects and tasks
- Real time notification on project and task updates
- Real time communication (messaging) between team members
- Discussion threads on projects and tasks
- Unit and Integration Tests
- Utilize typescript in both Client and Server
