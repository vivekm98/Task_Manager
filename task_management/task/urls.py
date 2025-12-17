from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
urlpatterns = [
    path('register/',views.RegisterView.as_view(),name="register"),
    path('login/',TokenObtainPairView.as_view(),name="login"),
    path('refresh/',TokenRefreshView.as_view(),name="refresh"),
    path('tasks/', views.TaskListCreateView.as_view(), name='tasks_list_create'),
    path('tasks/<int:pk>/', views.TaskDetailView.as_view(), name='task_detail'),
]