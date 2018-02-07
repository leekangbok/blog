from django import forms

from ..models import BbsComment


class BbsCommentForm(forms.ModelForm):
    class Meta:
        model = BbsComment
        exclude = ['article', 'created_date', 'modify_date']
