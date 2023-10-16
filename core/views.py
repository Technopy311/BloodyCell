from django.shortcuts import render


def index(request):
    
    return render(request, 'core/index.html')


def leaderboard(request):

    return render(request, 'core/leaderboard.html')

def bloodycell(request):

    return render(request, 'core/bloodycell.html')