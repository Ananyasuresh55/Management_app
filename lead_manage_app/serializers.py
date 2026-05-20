from rest_framework import serializers
from .models import Lead

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model=Lead
        fields='__all__'
    def validate_full_name(self,value):
        if len(value.strip())<3:
            raise serializers.ValidationError(
            "Name must contain atleast 3 characters!")
        return value
    def validate_phone(self,value):
        if len(value)!=10:
            raise serializers.ValidationError(
                "Phone Number nust be exactly 10 digits!")
        if not value.isdigit():
            raise serializers.ValidationError(
                "Phone Number must contain only numbers!")
        return value
    def validate_system_size(self,value):
        if value<1 or value>100:
            raise serializers.ValidationError(
                "System size must be between 1 and 100 kW")  
        return value 
    def validate_location(self,value):
        if len(value.strip())==0:
            raise serializers.ValidationError(
                "Location cannot be empty!")  
        return value