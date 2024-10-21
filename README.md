# WatchLogApp

WatchLogApp is an application developed to track the watching status of TV series and movies. This application is built using .NET Core, React, and SQLite.

## Prerequisites

Ensure that the following technologies are installed on your machine:

### 1. .NET Core SDK
- Download and install **.NET Core SDK** (version 6.0 or higher). This will allow you to run and develop the backend API.
- You can download it from [here](https://dotnet.microsoft.com/download).

### 2. Node.js
- Download and install **Node.js** (version 14.x or higher). This is required for the React frontend and package management.
- You can download Node.js from [here](https://nodejs.org/en/).

### 3. SQLite
- **SQLite** is used as the database for the application. Ensure SQLite is installed on your machine.
- You can download SQLite from [here](https://www.sqlite.org/download.html).
- You may also need a tool to manage your SQLite databases, such as [DB Browser for SQLite](https://sqlitebrowser.org/).

---

## Project Setup Instructions

Follow these steps to set up the **WatchLogApp** project:

### 1. Clone the Repository
To start, clone the project from GitHub:

```bash
git clone https://github.com/beyzacebeci/WatchLogApp.git
```

### 1. Clone the Repository
```bash
npm install
```

### 2. Setup the Frontend
```bash
npm install
npm run dev
```

### 3. Setup the Backend
Restore .NET Core dependencies:
```bash
dotnet restore
```

### Update the SQLite connection string:
```bash
"ConnectionStrings": {
  "DefaultConnection": "Data Source=watchlogapp.db"
}
```

```bash
add-migration init
update database
```





