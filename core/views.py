from django.shortcuts import render, redirect
from .models import RankingEntry
from .forms import RankingForm

from django.views.generic.list import ListView



def index(request):
    
    return render(request, 'core/index.html')


class RankingList(ListView):
    model = RankingEntry
    queryset = RankingEntry.objects.order_by('-score')[:10]


def bloodycell(request):

    form = RankingForm
    
    return render(request, 'core/bloodycell.html', {"rankingForm": form})


def addRanking(request):
    """
    POST api endpoint to add a ranking entru
    """

    if request.method == "GET":
        return redirect('index')
    
    elif request.method == "POST":
        
        form = RankingForm(request.POST)

        if form.is_valid():
            student =  form.cleaned_data["student"]
            grade = form.cleaned_data["grade"]
            score = request.POST.get("score")

            entry = RankingEntry(student=student, grade=grade, score=score)

            entry.save()

        return redirect('leaderboard')