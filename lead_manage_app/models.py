from django.db import models

# Create your models here.
class Lead(models.Model):
    STATUS_CHOICES=[
        ('New Lead','New Lead'),('Contacted','Contacted'),
        ('Site visit scheduled','Site visit scheduled'),
        ('Proposal sent','Proposal sent'),('Won','Won'),('Lost','Lost'),
    ]
    PROPERTY_CHOICES = [
        ('Residential','Residential'),('Commercial', 'Commercial'),
        ('Industrial', 'Industrial'),
    ]
    SOURCE_CHOICES = [
        ('Website', 'Website'),('Referral', 'Referral'),('Walk-in', 'Walk-in'),
        ('Social Media', 'Social Media'),
    ]
    full_name=models.CharField(max_length=100)
    phone=models.CharField(max_length=10)
    email=models.EmailField()
    location=models.CharField(max_length=100)
    property_type=models.CharField(max_length=20,choices=PROPERTY_CHOICES)
    system_size=models.IntegerField()
    source=models.CharField(max_length=20,choices=SOURCE_CHOICES)
    status=models.CharField(max_length=30,choices=STATUS_CHOICES,default='New Lead')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.full_name
