from django.shortcuts import render, redirect
from django.views.generic import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout
from django.conf import settings
from django.http import JsonResponse
import json 
from django.contrib.auth.models import User
from sawo import createTemplate, getContext, verifyToken
from core.settings import API_KEY, LOGIN_URL



# For sawolabs authentication
createTemplate("templates/partials")


class Home(View):
    def get(self, request):
        context = {
            'login_url': LOGIN_URL
        }
        return render(request, "home.html", context)


class LoginRedirect(View):
    def get(self, request):
        return redirect(LOGIN_URL)


class Login(View):
    template = "login.html"
    def get(self, request):
        user = self.request.user

        if user.is_authenticated:
            return redirect("/dashboard")

        config = {
            "auth_key": API_KEY,
            "identifier": "email", # Options the identifier can be "email/number"
            "to": "receive" # The endpoint to recieve the payload from sawo
        }
        context = {
            "sawo":config # Passing the config to login template
            }
        return render(request, self.template, context)


class Logout(View):
    def get(self, request):
        logout(request)
        return redirect('/')


class ReceivePayload(View):
    def post(self, request):
        payload = json.loads(request.body)["payload"]
            
        if verifyToken(payload):
            response = {
                "user_id": payload["user_id"],
                "created_on": payload["created_on"],
                "email": payload["identifier"],
                "identifier_type": payload["identifier_type"],
                "verification_token": payload["verification_token"],
                "customFieldInputValues": payload["customFieldInputValues"]
            }

            email = payload["identifier"]
            user_id = payload["user_id"]

            try:
                user = User.objects.get(username = email)
                login(request,user)
                return redirect("/dashboard")

            except User.DoesNotExist:
                user = User.objects.create_user(username=email,password = user_id)
                login(request,user)
                return redirect('/dashboard')

        else:
            # You may futher use the django's message framework to redirect with a error msg.
            response ={
                "error": "Verification failed."
            }
            return JsonResponse(response)


class Dashboard(View):
    @method_decorator(login_required)
    def get(self, request):
        context = {
            "name": request.user
        }
        return render(self.request, 'dashboard.html', context)