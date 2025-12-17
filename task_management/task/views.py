from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import UserSerializer
from rest_framework import generics, permissions
from .models import Task
from .serializers import TaskSerializer
from rest_framework import generics, permissions
from rest_framework.pagination import PageNumberPagination
from .permissions import IsOwnerOrAdmin

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class TaskPagination(PageNumberPagination):
    page_size = 50  
    page_size_query_param = "page_size"
    max_page_size = 50

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = TaskPagination

    def get_queryset(self):
        user = self.request.user
        status = self.request.query_params.get("status")

        if user.groups.filter(name="Admin").exists():
            queryset = Task.objects.all()
        else:
            queryset = Task.objects.filter(owner=user)

        if status == "completed":
            queryset = queryset.filter(status=True)
        elif status == "pending":
            queryset = queryset.filter(status=False)

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user

        if user.groups.filter(name="Admin").exists():
            return Task.objects.all()

        return Task.objects.filter(owner=user)