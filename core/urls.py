from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('leaderboard/', views.RankingList.as_view(), name='leaderboard'),
    path('bloodycell/', views.bloodycell, name='bloodycell'),
    path('sendScore/', views.addRanking, name='sendScore'),
]