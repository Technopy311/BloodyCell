from django.contrib import admin

# Register your models here.

from .models import RankingEntry

class RankingAdmin(admin.ModelAdmin):
    fields = ["student", "grade", "score"]

admin.site.register(RankingEntry, RankingAdmin)