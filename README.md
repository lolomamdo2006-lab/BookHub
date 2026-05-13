1. ادخلوا جوه فولدر الباك آند:

Bash
cd api
2. اعملوا بيئة افتراضية جديدة (خاصة بجهازكم):

Bash
python -m venv venv
3. فعلوا البيئة الافتراضية:

لو ويندوز (Windows):

Bash
.\venv\Scripts\activate
لو ماك أو لينكس (Mac/Linux):

Bash
source venv/bin/activate
4. نزلوا المكتبات المطلوبة (اللي مريم جهزتها):

Bash
pip install -r requirements.txt
5. تحديث قاعدة البيانات عندكم:

Bash
python manage.py migrate
6. شغلوا السيرفر:

Bash
python manage.py runserver
