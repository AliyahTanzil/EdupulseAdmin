---
noteId: "fbed5c00061611f1b3c2c92de4ba4cd1"
tags: []

---

# EdupulseAdmin Project

This document tracks the features and architecture of the EdupulseAdmin project.

## Overview

EdupulseAdmin is a comprehensive solution for managing educational institutions. It consists of a backend API and a web-based user interface for administration tasks.

## Project Structure

The project is a monorepo containing the following applications:

-   `apps/backend-api`: The backend server providing data and services.
-   `apps/web-ui`: The frontend web application for user interaction.

## Features

This section will be updated as new features are added.

### 1. Admin Dashboard

-   **File:** `apps/web-ui/src/pages/dashboard/AdminDashboard.tsx`
-   **Description:** Provides a central hub for administrators with quick access to key management modules.
-   **Components:**
    -   `DashboardCard`: A reusable card component for dashboard links.
    -   `StatsBar`: A horizontal bar displaying key statistics.
-   **Features:**
    -   Student Management
    -   Biometric Attendance
    -   Report Cards
    -   Timetable
    -   Staff Records
