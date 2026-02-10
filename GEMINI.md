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
    -   `src/App.tsx`: Main application entry point, now using `MainLayout`.
    -   `src/components/layout/MainLayout.tsx`: Provides the overall page structure, including the sidebar and content area.
    -   `src/components/layout/Sidebar.tsx`: Navigation sidebar component.

## Features

This section will be updated as new features are added.

### 1. Admin Dashboard

-   **File:** `apps/web-ui/src/pages/dashboard/AdminDashboard.tsx`
-   **Description:** A high-fidelity, responsive grid dashboard providing access to 20 key modules.
-   **Components:**
    -   `DashboardCard`: A square, interactive card with an icon and label, designed with Tailwind CSS.
-   **Features:**
    -   Responsive grid (5-col desktop, 3-col tablet, 2-col mobile).
    -   20 modules including SIS, Fee Management, Library, and more.
    -   Icons provided by `lucide-react`.
    -   Interactive hover effects on cards.
