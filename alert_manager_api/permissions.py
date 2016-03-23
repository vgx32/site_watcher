from rest_framework import permissions
import pdb


class IsAdminOrTargetUser(permissions.BasePermission):

  def has_permission(self, request, view):
    print("!!!!!!!!!!!!!!!!!!!!!TODO verify only admin user can edit others !!!!!!!!!!") 
    return view.action == 'retrieve' 

  def has_object_permission(self, request, view, obj):
    return obj == request.user