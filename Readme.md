# E-Ward Sifarish System

A digital platform that lets citizens submit recommendation and certificate applications (*sifarish*) to their local ward office online, and routes each application through a structured, multi-stage approval workflow — replacing the traditional in-person, paper-based process.

Built on the MERN stack with role-based access control, cloud document storage, bilingual UI, and QR-verifiable PDF certificates.

---

## Table of Contents

- [Problem It Solves](#problem-it-solves)
- [Workflow](#workflow)
- [Roles & Permissions](#roles--permissions)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [API Reference](#api-reference)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Creating the First Admin](#creating-the-first-admin)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Problem It Solves

Getting a recommendation letter or certificate from a ward office traditionally requires citizens to visit in person, submit physical documents, and follow up manually across multiple desks. Once a file is handed over, the applicant has no visibility into which desk is holding it, and the printed letter that comes out at the end cannot be independently verified by the institution receiving it.

This system digitises that entire journey — from submission to final certificate issuance — with status tracking at every stage and a verifiable certificate at the end.

---

## Workflow

```
Citizen submits application
        ↓
Front Office verifies documents & payment
        ↓
Secretary reviews and recommends
        ↓
Chairperson gives final approval
        ↓
Certificate generated (QR-verifiable)
```

Each application carries two workflow fields:

- **`status`** — what the citizen sees: `draft`, `submitted`, `pending`, `under_review`, `verified`, `recommended`, `approved`, `rejected`
- **`currentStage`** — which desk owns it right now: `frontoffice`, `secretary`, `chairperson`, `completed`

Staff queues are filtered by `currentStage`, and every action controller checks the stage before acting — so steps cannot be skipped, repeated, or performed by the wrong role.

Any stage can reject instead of advancing. On rejection the status becomes `rejected`, `rejectedBy` records which role rejected it, the remark is stored, and the citizen is notified with the reason.

---

## Roles & Permissions

| Role | Responsibility | Actions |
|---|---|---|
| **Citizen** | Submits applications with personal details and required documents; tracks status | Submit · View own |
| **Front Office** | First point of contact — verifies submitted documents and payment are complete and valid | Verify · Reject |
| **Secretary** | Reviews verified applications in more depth and makes a recommendation | Recommend · Reject |
| **Chairperson** | Final decision-maker; approval triggers certificate generation | Approve · Reject |
| **Admin** | Manages staff accounts and system settings | Full access |

**Authorisation is enforced twice.** `ProtectedRoute` guards routes on the client for user experience; `requireRole()` middleware blocks the request on the server, so the API remains safe even if the UI is bypassed.

Citizens self-register with a phone number and citizenship number. Staff accounts cannot self-register — only an admin can create them, and deactivating an account revokes access without deleting its history.

---

## Tech Stack

**Frontend**
React 19 · Vite 8 · React Router 7 · Tailwind CSS 4 · Axios · Framer Motion · i18next · lucide-react · qrcode.react

**Backend**
Node.js · Express 5 · Mongoose 9 · jsonwebtoken · bcryptjs · Multer 2 · PDFKit · qrcode · dotenv

**Infrastructure**
MongoDB Atlas · Cloudinary (document and certificate storage) · Vercel (frontend) · Render (backend)

---

## Key Features

- **Role-based dashboards** — five distinct sidebars, layouts and queues; each role sees only its own work
- **Stage-locked workflow** — the controller validates `currentStage` before every state transition
- **Notification system** — targeted alerts to a specific citizen (`recipientUser`) and queue alerts to a whole staff role (`recipientRole`), with read tracking and a mark-all-read endpoint
- **QR-verifiable certificates** — PDFKit composes an A4 certificate on approval, embedding a QR code that points at a public verification endpoint
- **Cloud document storage** — uploads stream to Cloudinary rather than local disk, keeping the API stateless and deployable
- **Bilingual interface** — full i18next coverage across every screen in English and नेपाली
- **Admin staff management** — create, view, edit, activate and deactivate staff accounts
- **Application statistics** — aggregated counts by status and approval totals for admin reporting

---

## Project Structure

```
E-ward-Sifarish-System/
├── backend/
│   ├── config/
│   │   └── cloudinary.js            # Cloudinary SDK configuration
│   ├── controllers/
│   │   ├── adminController.js       # Staff CRUD, activate/deactivate
│   │   ├── applicationController.js # Submission + all three stage actions
│   │   ├── authController.js        # Register, login, JWT issuance
│   │   ├── notificaionController.js # List, mark read, mark all read
│   │   └── settingsController.js    # Ward/municipality settings
│   ├── middleware/
│   │   ├── authMiddleware.js        # Bearer token verification
│   │   ├── roleMiddleware.js        # requireRole(...roles)
│   │   └── uploadMiddleware.js      # Multer: PDF/JPG/PNG, 5 MB cap
│   ├── models/
│   │   ├── Application.js
│   │   ├── Notification.js
│   │   ├── SystemSettings.js
│   │   └── User.js
│   ├── routes/
│   ├── utils/
│   │   └── certificateGenerator.js  # PDFKit + QR certificate builder
│   ├── createAdmin.js               # One-off admin bootstrap script
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/              # Header, Footer, Hero, per-role sidebars
        ├── context/
        │   ├── AuthContext.jsx      # Session + role state
        │   └── ApplicationContext.jsx # Multi-step wizard state
        ├── layouts/                 # One layout per role
        ├── locales/
        │   ├── en.json
        │   └── ne.json
        ├── pages/
        │   ├── citizen/             # Apply wizard, my applications
        │   ├── frontoffice/         # Pending, verified queues
        │   ├── secretary/           # Applications, recommended
        │   ├── chairperson/         # Applications, approved, rejected
        │   └── admin/               # Staff management
        ├── services/api.js          # Axios instance + interceptors
        └── App.jsx                  # Route tree with ProtectedRoute guards
```

---

## Data Model

A single `Application` document holds the full case file, so every stage reads and writes one source of truth.

| Group | Fields |
|---|---|
| **Service** | `service`, `applicationNumber` (auto-generated as `APP-<timestamp>`) |
| **Applicant details** | `fullName`, `citizenshipNumber`, `dateOfBirth`, `phone`, `email` |
| **Address** | `province`, `district`, `municipality`, `wardNumber`, `tole` |
| **Documents** | array of `{ documentType, fileName, fileUrl, fileType, fileSize }` |
| **Payment** | `required`, `amount`, `voucherUrl`, `voucherType`, `voucherSize`, `status` |
| **Workflow** | `status`, `currentStage`, `verifiedBy`, `verifiedAt`, `rejectedBy` |
| **Remarks** | `frontOfficeRemarks`, `secretaryRemarks`, `chairpersonRemarks` |
| **Certificate** | `filePath`, `qrData`, `generatedAt` |

Applicant details are snapshotted onto the application rather than referenced, so a later change to the user profile does not rewrite the record behind an already-issued certificate.

---

## API Reference

All protected routes expect an `Authorization: Bearer <token>` header.

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/register` | Public | Citizen registration (name, phone, citizenshipNo, password) |
| `POST` | `/login` | Public | Citizen and staff login; returns JWT |

### Applications — `/api/applications`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/verify/:id` | **Public** | QR verification target; confirms an approved certificate |
| `POST` | `/` | Citizen | Submit an application with documents and voucher (multipart) |
| `GET` | `/my-applications` | Citizen | List the caller's own applications |
| `GET` | `/` | Staff | Queue filtered to the caller's stage |
| `PATCH` | `/:id/frontoffice` | Front Office | `{ decision: "verify" \| "reject", remarks }` |
| `PATCH` | `/:id/secretary` | Secretary | `{ decision: "recommend" \| "reject", remarks }` |
| `PATCH` | `/:id/chairperson` | Chairperson | `{ decision: "approve" \| "reject", remarks }` — approval generates the certificate |
| `GET` | `/frontoffice/verified` | Front Office, Admin | Applications this desk has verified |
| `GET` | `/secretary/recommended` | Secretary, Admin | Applications this desk has recommended |
| `GET` | `/reports/statistics` | Admin | Counts by status and approval totals |
| `GET` | `/:id` | Authenticated | Single application (ownership and role checked) |

### Admin — `/api/admin`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/create-staff` | Create a staff account with a role |
| `GET` | `/staff` | List all staff |
| `GET` | `/staff/:id` | Single staff member |
| `PUT` | `/staff/:id` | Update a staff member |
| `PATCH` | `/staff/:id/deactivate` | Revoke access |
| `PATCH` | `/staff/:id/activate` | Restore access |

### Notifications — `/api/notifications`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Notifications for the caller (by user and by role) |
| `PATCH` | `/:id/read` | Mark one as read |
| `PATCH` | `/read-all` | Mark all as read |

### Settings — `/api/settings`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Ward and municipality details |
| `PUT` | `/` | Admin | Update ward and municipality details |

---

## Local Setup

**Prerequisites:** Node.js 18+, npm, and a MongoDB instance (local or Atlas).

**1. Clone the repository**

```bash
git clone <repo-url>
cd E-ward-Sifarish-System
```

**2. Install dependencies**

```bash
cd backend && npm install
cd ../frontend && npm install
```

**3. Add environment files** (see [Environment Variables](#environment-variables) below)

**4. Run both services**

```bash
# terminal 1
cd backend && npm run dev     # http://localhost:5000

# terminal 2
cd frontend && npm run dev    # http://localhost:5173
```

---

## Environment Variables

**`backend/.env`**

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
APP_BASE_URL=http://localhost:5000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

`APP_BASE_URL` is what the certificate QR code encodes, so it must point at the **publicly reachable** backend URL in production — otherwise scanned certificates will not verify.

**`frontend/.env`**

```
VITE_API_URL=http://localhost:5000
```

---

## Creating the First Admin

Staff accounts are created by an admin, so the very first admin has to be seeded directly:

```bash
cd backend
node createAdmin.js
```

Log in with those credentials, then create front office, secretary and chairperson accounts from the admin panel.

---

## Deployment

| Piece | Platform | Notes |
|---|---|---|
| Frontend | Vercel | `vercel.json` handles SPA rewrites; set `VITE_API_URL` to the Render URL |
| Backend | Render | Start command `npm start`; add every backend env var |
| Database | MongoDB Atlas | Whitelist the Render egress IPs |
| Files | Cloudinary | Documents, vouchers and certificates |

Set `APP_BASE_URL` to the deployed backend URL before issuing any real certificates.

---

## Roadmap

- **Online payment gateway** — replace voucher uploads with eSewa or Khalti so payment confirms automatically instead of being checked visually
- **SMS and email alerts** — push existing notifications outside the portal
- **Digital signatures** — cryptographically sign certificates so verification does not depend solely on the server being reachable
- **Analytics dashboard** — turn the statistics endpoint into charts: processing time per stage, rejection reasons, service demand
- **Multi-ward deployment** — generalise `SystemSettings` so one deployment can serve several wards of a municipality