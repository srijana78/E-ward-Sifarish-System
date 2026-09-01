# My application structure looks like this  

```

E-Ward Sifarish
│
├── Public
│   ├── Home
│   ├── About / Services
│   ├── Certificate Verification
│   └── Login
│
├── Citizen
│   ├── Dashboard
│   ├── New Application
│   ├── My Applications
│   ├── Application Details
│   ├── Notifications
│   ├── Profile
│   └── Certificate
│
├── Front Office
│   ├── Dashboard
│   ├── New/Pending Applications
│   ├── Application Details
│   ├── Document Verification
│   └── Payment Verification
│
├── Ward Secretary
│   ├── Dashboard
│   ├── Verified Applications
│   ├── Application Details
│   └── Recommendation
│
└── Ward Chairperson
    ├── Dashboard
    ├── Pending Approvals
    ├── Application Details
    └── Approve / Reject
```
## Development Roadmap

### Phase 1- Foundation
```
1. Project setup
2. Common layout
3. Navbar
4. Home page
5. Login page
6. Registration page
7. Authentication
8. Role-based routing
```
### Phase 2- Citizen
```
9. Citizen Dashboard
10. New Sifarish Application
11. Application form
12. Document upload
13. Payment voucher upload
14. Application submission
15. My Applications
16. Application Details
17. Status tracking
18. Notifications
```
### PHASE 3 — Front Office
```
19. Front Office Dashboard
20. Application list
21. Application details
22. View documents
23. Verify payment
24. Verify documents
25. Forward application
```
### PHASE 4 — Ward Secretary
```
26. Secretary Dashboard
27. Verified applications
28. Application review
29. Recommendation
30. Forward to Chairperson 

```
### PHASE 5 — Chairperson
```
31. Chairperson Dashboard
32. Pending approvals
33. Final review
34. Approve
35. Reject

```
### PHASE 6 — Certificate
```
36. Generate certificate
37. PDF
38. QR code
39. Public verification page

```
### PHASE 7 — Professional finishing

```
40. Notifications
41. Reports
42. Search/filter
43. Error handling
44. Loading states
45. Security
46. Testing
47. Deployment

```

### dummy structure
```
src/
│
├── assets/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Button.jsx
│   ├── Modal.jsx
│   ├── Loading.jsx
│   └── ProtectedRoute.jsx
│
├── layouts/
│   ├── PublicLayout.jsx
│   ├── CitizenLayout.jsx
│   └── AdminLayout.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   │
│   ├── citizen/
│   │   ├── CitizenDashboard.jsx
│   │   ├── NewApplication.jsx
│   │   ├── MyApplications.jsx
│   │   └── ApplicationDetails.jsx
│   │
│   ├── frontoffice/
│   │   ├── FrontOfficeDashboard.jsx
│   │   └── ApplicationReview.jsx
│   │
│   ├── secretary/
│   │   └── SecretaryDashboard.jsx
│   │
│   └── chairperson/
│       └── ChairpersonDashboard.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
└── main.jsx
```

## Citizen Journey

#### lets follow  Srijana's journey

#### Srijana wants a ward recommendation
#### she opens system 
```
Home
 ↓
Apply for Sifarish

```
##### If she's not logged in:
```
You need to login to continue.
        ↓
      Login
      ```
##### If  she doesn't have an account
```
Register
```
### after registratioin
```
Login
 ↓
Citizen Dashboard
```
``` then
Citizen Dashboard
       ↓
+ New Application
       ↓
Select Sifarish Type
       ↓
Fill Form
       ↓
Upload Documents
       ↓
Upload Payment Voucher
       ↓
Review
       ↓
Submit

```

##### After the submission

```
Application ID: EW-2026-00001

Status:
🟡 Pending Verification
```
#### srijana doesn't  need to visit the ward office just to ask. she can check online



# Now what does Front office see?
#### The front office should not see the citizen dashboard. They login with their staff account.
```
staff@ward.gov.np
```


#### They see:
```
┌───────────────────────────────────────────────┐
│ E-Ward Admin                                  │
├──────────────┬────────────────────────────────┤
│ Dashboard    │                                │
│ Applications │   Applications                 │
│ Verification │                                │
│ Reports      │   Pending: 24                  │
│              │   Verified: 15                 │
│ Logout       │   Rejected: 3                  │
│              │                                │
│              │   Recent Applications          │
│              │                                │
│              │   EW-2026-00001  Pending      │
│              │   EW-2026-00002  Pending      │
└──────────────┴────────────────────────────────┘
```
#### They click pending application
```
EW-2026-00001
```
#### now they see
```
Applicant
Sita Sharma

Recommendation
Residence Recommendation

Documents
📄 Citizenship.pdf
📄 LandDocument.pdf

Payment
📄 PaymentVoucher.jpg

[ View ] [ Verify ]

          [Reject] [Forward]


```

  #### Front Office checks :
  ```
 Citizenship → ✅
Land document → ✅
Payment → ✅

```
```
verify
```
```
Verifies and gets forwarded to the Ward Secretary.
```

## Ward Secretary

#### Secretary logs in . They  don't need to verify everything again. They see:
```
Verified Applications

EW-2026-00001
Applicant: Sita Sharma
Type: Residence Recommendation

Front Office:
✓ Documents verified
✓ Payment verified

[Review Application]
```
#### Secretary reviews it and says:
```
Recommendation:
✓ Recommended

[Forward to Chairperson]
```
#### now Status is :
```
status = "recommended"
```


## Ward Chairperson
```
Pending Final Approval

EW-2026-00001

Applicant: Sita Sharma
Recommendation: Residence

Front Office: ✓
Secretary: ✓

[View Application]

        [Approve]    [Reject]

```
### Chairperson clicks ; APPROVE Then  backend perfoms something important
```
Application
     ↓
Approved
     ↓
Generate Certificate
     ↓
Generate QR
     ↓
Generate PDF
     ↓
Citizen can download
```
## Now the Qr generation
## Actual Roles:
```
                E-WARD SYSTEM
                      │
        ┌─────────────┴─────────────┐
        │                           │
     CITIZEN                    OFFICIALS
        │                           │
        │              ┌────────────┼────────────┐
        │              │            │            │
        │         FRONT OFFICE   SECRETARY   CHAIRPERSON
        │              │            │            │
        └──────────────┴────────────┴────────────┘
                       │
                 APPLICATION
                       │
              APPROVED / REJECTED
                       │
                 PDF + QR CODE
```