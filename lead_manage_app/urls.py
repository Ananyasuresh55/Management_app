
from django.urls import path
from . import views
urlpatterns = [
        path('leads/',views.get_leads),
        path('add-lead/',views.add_lead),
        path('lead/<int:id>/',views.get_single_lead),
        path('update-lead/<int:id>/',views.update_lead),
        path('delete-lead/<int:id>/',views.delete_lead),
        path('update-status/<int:id>/',views.update_status),
    
]
