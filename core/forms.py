from django.forms import ModelForm
from .models import RankingEntry

class RankingForm(ModelForm):

    class Meta:
        model = RankingEntry
        fields = ["student", "grade"]