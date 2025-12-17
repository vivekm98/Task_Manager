from rest_framework.permissions import BasePermission

class IsOwnerOrAdmin(BasePermission):
    """
    Admin: full access
    User: only own tasks
    """
    def has_object_permission(self, request, view, obj):
        if request.user.groups.filter(name="admin").exists():
            return True
        return obj.owner == request.user