# Lead Management System
A full-stack Lead Management System  for a solar installation company is built using Django REST API as Backend and React as Frontend. The system will help sales teams track
customer inquiries from initial contact through conversion.This project helps manage customer leads efficiently by tracking their status, source, and details.

## Features
- Add new leads with customer details
- View all leads in a dashboard
- Update lead status (New, Scheduled, Completed, etc.)
- Track lead source (Website, Referral, Ads, etc.)
- Separate frontend (React) and backend (Django REST API)
- Clean and simple UI

## Tech Stack
Backend:
- Django
- Django REST Framework
- SQLite
Frontend:
- React (Vite)
- JSX
- Axios

## Project Structure
![Project Structure](https://github.com/user-attachments/assets/b469bef0-757f-4ede-aa34-ffbe8976ddf9)

## Setup Instructions
###Clone the repository:
```bash
git clone https://github.com/your-username/Lead_management_app.git
cd Lead_management_app
###Backend Setup(Django):
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Backend runs at:
http://127.0.0.1:8000/
###Frontend Setup(React):
cd frontend
npm install
npm run dev
Frontend runs at:
http://localhost:5173/

## API ENDPOINTS
- leads/ → Get all leads
- add-lead/ → Add new leads
- lead/<int:id>/ → view single lead
- update-lead/<int:id>/ → Update lead
- delete-lead/<int:id>/ → Delete lead
- update-status/<int:id>/ → Update Status

## 📸 Screenshots
![Screenshot](https://github.com/user-attachments/assets/2f456f34-edf4-4cce-8766-ab9e4bf93a8a)
![Screenshot](https://github.com/user-attachments/assets/2dfc7d36-8bc9-4455-811e-c00993a02288)
![Screenshot](https://github.com/user-attachments/assets/105a2a3a-dbbf-4f04-9d93-42be7da356a8)

