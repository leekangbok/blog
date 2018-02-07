from django import forms

from ..models import Bbs


class BbsForm(forms.ModelForm):
    class Meta:
        model = Bbs
        exclude = ['created_date', 'modify_date']
