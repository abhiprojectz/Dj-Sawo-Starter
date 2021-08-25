from django.urls import path, include
from . import views

app_name = "djsawo_app"


urlpatterns = [
      path("", include("django.contrib.auth.urls")),
      path("", views.Home.as_view(), name="home"),
      path("logout", views.Logout.as_view(), name = 'logout'),
      path("dashboard", views.Dashboard.as_view(), name= 'dashboard'),
      path('logout', views.Logout.as_view(), name='logout'),
      path('login', views.Login.as_view(), name='login'),
      path('accounts/login/', views.LoginRedirect.as_view(), name='login_redirect'),
      path('receive', views.ReceivePayload.as_view(), name='receive'),
]