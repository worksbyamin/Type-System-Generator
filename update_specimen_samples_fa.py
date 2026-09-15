import re

with open('src/components/Workspace/SpecimenView.tsx', 'r') as f:
    content = f.read()

content = content.replace("small: 'یادداشت: این یک متن توضیحی کوچک برای تست مقیاس تایپوگرافی و زیرنویس‌ها است.'\n};", "small: 'یادداشت: این یک متن توضیحی کوچک برای تست مقیاس تایپوگرافی و زیرنویس‌ها است.',\n  xsmall: 'سلب مسئولیت: این متن حقوقی بسیار کوچک برای اعلامیه‌های کپی‌رایت و جزئیات جزئی استفاده می‌شود.'\n};")

with open('src/components/Workspace/SpecimenView.tsx', 'w') as f:
    f.write(content)
