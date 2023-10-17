from django.db import models


class RankingEntry(models.Model):
    """
    An entry for the ranking.
    """

    GRADE_CHOICES = [
        ("1° B", "1° Básico"),
        ("2° B", "2° Básico"),
        ("3° B", "3° Básico"),
        ("4° B", "4° Básico"),
        ("4° B", "5° Básico"),
        ("6° B", "6° Básico"),
        ("7° B", "7° Básico"),
        ("8° B", "8° Básico"),
        ("1° M", "1° Medio"),
        ("2° M", "2° Medio"),
        ("3° M", "3° Medio"),
        ("4° M", "4° Medio"),
        ("Docente", "Docente"),
    ]

    student = models.CharField('Nombre Estudiante:', max_length=20, default='')
    grade = models.CharField(
        verbose_name='Curso:',
        max_length=8,
        choices=GRADE_CHOICES,
        default=None
    )
    score = models.IntegerField('Puntaje', default=0)
    date_time = models.DateTimeField('fecha y hora', auto_now_add=True)