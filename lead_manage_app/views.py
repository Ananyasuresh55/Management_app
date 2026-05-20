from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.
from .models import Lead
from .serializers import LeadSerializer

@api_view(['GET'])
def get_leads(request):
    leads=Lead.objects.all().order_by('-created_at')
    serializer=LeadSerializer(leads,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_lead(request):
    serializer=LeadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Lead Added Successfully!!","data":serializer.data})
    return Response(serializer.errors)

@api_view(['GET'])
def get_single_lead(request,id):
    try:
        lead=Lead.objects.get(id=id)
    except Lead.DoesNotExist:
        return Response({"error":"Lead Not Found "})
    serializer=LeadSerializer(lead)
    return Response(serializer.data)

@api_view(['PUT'])
def update_lead(request,id):
    try:
        lead=Lead.objects.get(id=id)
    except Lead.DoesNotExist:
        return Response({"error":"Lead Not Found"})
    serializer=LeadSerializer(lead,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Lead Updated Successfully","data":serializer.data})
    return Response(serializer.errors)

@api_view(['DELETE'])
def delete_lead(request,id):
    try:
        lead=Lead.objects.get(id=id)
    except Lead.DoesNotExist:
        return Response({"error":"Lead Not Found"})
    lead.delete()
    return Response({"message":"Lead Deleted Successfully"})

@api_view(['PATCH'])
def update_status(request,id):
    try:
        lead=Lead.objects.get(id=id)
    except Lead.DoesNotExist:
        return Response({"error":"Lead Not Found"})
    status=request.data.get('status')
    valid_status=['New Lead','Contacted','Site visit scheduled',
                  'Proposal sent','Won','Lost']
    if status not in valid_status:
        return Response({"error":"Invalid Status"})
    lead.status=status
    lead.save()
    serializer=LeadSerializer(lead)
    return Response({"message":"Status Updated Successfully","data":serializer.data})


